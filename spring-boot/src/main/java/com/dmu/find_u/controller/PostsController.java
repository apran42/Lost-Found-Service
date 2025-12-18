package com.dmu.find_u.controller;

import com.dmu.find_u.dto.PostDTO;
import com.dmu.find_u.entity.*;
import com.dmu.find_u.repository.*;
import com.dmu.find_u.service.LostFoundPostService;
import com.dmu.find_u.service.PostLikeService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // React 포트
public class PostsController {

    private final LostFoundPostService postService;
    private final LostFoundPostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final PlaceRepository placeRepository;
    private final CommentRepository commentRepository;
    private final PostLikeService postLikeService;

    // 1) 내가 올린 게시물 전체
    @GetMapping("/my")
    public List<Map<String, Object>> getMyPosts(@RequestParam Long userId) {
        return postService.getPostsByUser(userId);
    }

    // 2) 내가 올린 "습득물" 게시물
    @GetMapping("/my-found")
    public List<Map<String, Object>> getMyFoundPosts(@RequestParam Long userId) {
        return postService.getPostsByUserAndType(userId, "습득");
    }

    // 3) 내가 올린 "분실물" 게시물
    @GetMapping("/my-lost")
    public List<Map<String, Object>> getMyLostPosts(@RequestParam Long userId) {
        return postService.getPostsByUserAndType(userId, "분실");
    }

    // 4) 게시물의 아이디를 기반으로 조회
    @GetMapping("/post/{postId}")
    public ResponseEntity<Map<String, Object>> getPostById(@PathVariable Long postId,
                                           HttpSession session) {
        UserInfo loginUser =  (UserInfo) session.getAttribute("login");
        Map<String, Object> res = postService.getPostById(postId, loginUser);
        LostFoundPost post = postRepository.findById(postId).orElse(null);

        if (post.getImageUrl() != null && !post.getImageUrl().startsWith("http")) {
            res.put("imageUrl", "http://localhost:8080/" + post.getImageUrl());
        } else {
            res.put("imageUrl", post.getImageUrl());
        }

        return ResponseEntity.ok(
                postService.getPostById(postId, loginUser)
        );
    }
    // 게시물 불러오기
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getAllPosts(
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size,
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String place,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) {

        Map<String, Object> response = new HashMap<>();

        Page<Map<String, Object>> postsPage = postService.getAllPosts(
                type, page, size, searchTerm, place, category, startDate, endDate
        );


        response.put("success", true);
        response.put("posts", postsPage.getContent());
        response.put("currentPage", postsPage.getNumber());
        response.put("totalPages", postsPage.getTotalPages());
        response.put("totalElements", postsPage.getTotalElements());

        return ResponseEntity.ok(response);
    }

    // 게시물 삭제
    @DeleteMapping("/deletePost/{postId}")
    public ResponseEntity<?> deletePost(
            @PathVariable Long postId,
            HttpSession session
    ) {
        UserInfo user = (UserInfo) session.getAttribute("login");
        if (user == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        LostFoundPost post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.status(404).body("게시글이 존재하지 않습니다.");
        }

        // 작성자 확인
        if (!post.getWriter().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("본인 글만 삭제 가능합니다.");
        }

        // 댓글 삭제
        List<Comment> comments = commentRepository.findByPostId(post.getId());
        commentRepository.deleteAll(comments);

        // ---- 이미지 삭제 (안전 버전) ----
        String imageUrl = post.getImageUrl();
        if (imageUrl != null && !imageUrl.isBlank()) {
            try {
                Path fileName = Paths.get(imageUrl).getFileName();
                if (fileName != null && !fileName.toString().isBlank()) {
                    Path fullPath = Paths.get("uploaded_images").resolve(fileName);
                    Files.deleteIfExists(fullPath);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // ---- 게시글 삭제 (정확히 1번만) ----
        postRepository.delete(post);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "게시글 삭제 완료");
        response.put("postId", postId);

        return ResponseEntity.ok(response);
    }

    // 게시물 수정
    @PutMapping("/updatePost/{postId}")
    public ResponseEntity<?> updatePost(
            @PathVariable Long postId,
            @RequestBody Map<String, Object> request,
            HttpSession session
    ) {
        UserInfo user = (UserInfo) session.getAttribute("login");
        if (user == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        LostFoundPost post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.status(404).body("게시글이 존재하지 않습니다.");
        }

        if (!post.getWriter().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("본인 글만 수정 가능합니다.");
        }

        // 제목, 내용
        post.setTitle((String) request.get("title"));
        post.setContent((String) request.get("content"));
        // 이미지 추가
        String imageUrl = (String) request.get("imageUrl");  // 상대경로
        post.setImageUrl(imageUrl);

        // category와 place는 객체로 처리
        Long categoryId = Long.valueOf(String.valueOf(request.get("categoryId")));
        Long placeId = Long.valueOf(String.valueOf(request.get("placeId")));

        // 엔티티 조회
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("카테고리 없음"));
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new RuntimeException("장소 없음"));

        post.setCategory(category);
        post.setPlace(place);

        postRepository.save(post);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "게시글 수정 완료");
        response.put("postId", post.getId());
        response.put("imageUrl", post.getImageUrl());

        return ResponseEntity.ok(response);
    }

    // 게시물 생성
    @PostMapping("/createPost")
    public ResponseEntity<?> createPost(
            @RequestBody Map<String, Object> request,
            HttpSession session
    ) {
        UserInfo user = (UserInfo) session.getAttribute("login");

        if (user == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        LostFoundPost post = new LostFoundPost();
        System.out.println(post.getId());
        post.setTitle((String) request.get("title"));
        post.setContent((String) request.get("content"));
        post.setType((String) request.get("type"));
        post.setStatus("진행중");  // 기본 상태
        post.setWriter(user);
        post.setCreatedAt(LocalDateTime.now());
        post.setViewCount(0);
        post.setLikeCount(0);

        // 이미지 추가
        String imageUrl = (String) request.get("imageUrl");  // 상대경로
        post.setImageUrl(imageUrl);

        // 객체조회
        Long categoryId = Long.valueOf(String.valueOf(request.get("categoryId")));
        Long placeId = Long.valueOf(String.valueOf(request.get("placeId")));


        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("카테고리 없음"));
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new RuntimeException("장소 없음"));

        post.setCategory(category);
        post.setPlace(place);
        postRepository.save(post);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "게시글 등록 완료");
        res.put("postId", post.getId());
        return ResponseEntity.ok(res);
    }

    // 좋아요 상위
    @GetMapping("/popular")
    public ResponseEntity<List<PostDTO>> getPopularPosts() {
        List<LostFoundPost> topPosts = postRepository.findTop4ByOrderByLikeCountDesc();

        List<PostDTO> res = topPosts.stream()
                .map(p -> new PostDTO(
                        p.getId(),
                        p.getTitle(),
                        p.getContent(),
                        p.getLikeCount(),
                        p.getImageUrl(),
                        p.getWriter() != null ? p.getWriter().getName() : null
                )).toList();
        return ResponseEntity.ok(res);
    }

    // 좋아요
    @PostMapping("/{postId}/like")
    public ResponseEntity<Map<String, Object>> toggleLike(
            @PathVariable Long postId,
            HttpSession session
    ) {
        UserInfo user = (UserInfo) session.getAttribute("login");
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "로그인이 필요합니다."));
        }

        LostFoundPost post = postLikeService.toggleLike(postId, user.getId());

        Map<String, Object> res = new HashMap<>();
        res.put("likeCount", post.getLikeCount());
        res.put("liked", postLikeService.isLikedByUser(postId, user.getId()));

        return ResponseEntity.ok(res);
    }

    // 이미지 업로드
    @PostMapping("/uploadImage")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("file") MultipartFile file) {

        String folder = "uploaded_images/";
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filepath = Paths.get(folder + filename);

        try {
            Files.createDirectories(filepath.getParent());
            file.transferTo(filepath);

            String fullUrl = "http://localhost:8080/uploaded_images/" + filename;

            Map<String, Object> res = new HashMap<>();
            res.put("imageUrl", fullUrl);   // 🔥 DB에 절대 URL 저장

            return ResponseEntity.ok(res);

        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("message", "업로드 실패"));
        }
    }
}
