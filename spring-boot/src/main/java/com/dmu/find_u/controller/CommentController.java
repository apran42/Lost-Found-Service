package com.dmu.find_u.controller;

import com.dmu.find_u.entity.Comment;
import com.dmu.find_u.entity.LostFoundPost;
import com.dmu.find_u.entity.UserInfo;
import com.dmu.find_u.repository.CommentRepository;
import com.dmu.find_u.repository.LostFoundPostRepository;
import com.dmu.find_u.repository.UserInfoRepository;
import com.dmu.find_u.service.CommentService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    private final CommentRepository commentRepository;
    private final LostFoundPostRepository postRepository;
    private final UserInfoRepository userRepository;

    // -----------------------------
    // 댓글 목록 조회 (게시글 상세)
    // -----------------------------
    @GetMapping("/{postId}/comments")
    public ResponseEntity<?> getComments(@PathVariable Long postId) {

        List<Comment> comments = commentService.findByPostId(postId);
        List<Map<String, Object>> list = new ArrayList<>();

        for (Comment c : comments) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", c.getId());
            map.put("postId", c.getPost().getId());
            map.put("userId", c.getUser().getId());
            map.put("content", c.getContent());
            map.put("createdAt", c.getCreatedAt());
            map.put("updatedAt", c.getUpdatedAt() != null ? c.getUpdatedAt() : null);
            map.put("userName",  c.getUser().getName());
            list.add(map);
        }

        return ResponseEntity.ok(list);
    }

    // ----------------------------------------
    // 댓글 작성
    // ----------------------------------------
    @PostMapping("/{postId}")
    public ResponseEntity<?> createComment(
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
            return ResponseEntity.status(404).body("게시글을 찾을 수 없습니다.");
        }

        Comment comment = new Comment();
        comment.setPost(post);      // 엔티티 연결
        comment.setUser(user);      // 로그인한 UserInfo 연결
        comment.setContent((String) request.get("content"));
        comment.setCreatedAt(LocalDateTime.now());

        commentService.save(comment);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "댓글 등록 완료");
        response.put("commentId", comment.getId());

        return ResponseEntity.ok(response);
    }
    // ----------------------------------------
    // 댓글 수정
    // ----------------------------------------
    @PutMapping("/comments/{id}")
    public ResponseEntity<?> updateComment(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request,
            HttpSession session
    ) {
        UserInfo user = (UserInfo) session.getAttribute("login");
        if (user == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        Comment comment = commentService.findById(id);
        if (comment == null) {
            return ResponseEntity.status(404).body("댓글이 존재하지 않습니다.");
        }

        if (!comment.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("본인 댓글만 수정 가능합니다.");
        }

        comment.setContent((String) request.get("content"));
        comment.setUpdatedAt(LocalDateTime.now());

        commentService.save(comment);
        return ResponseEntity.ok("댓글 수정 완료");
    }


    // ----------------------------------------
    // 댓글 삭제
    // ----------------------------------------
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long id,
            HttpSession session
    ) {
        UserInfo user = (UserInfo) session.getAttribute("login");
        if (user == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        Comment comment = commentService.findById(id);
        if (comment == null) {
            return ResponseEntity.status(404).body("댓글이 존재하지 않습니다.");
        }

        if (!comment.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("본인 댓글만 삭제 가능합니다.");
        }

        commentService.delete(id);
        return ResponseEntity.ok("댓글 삭제 완료");
    }
}

