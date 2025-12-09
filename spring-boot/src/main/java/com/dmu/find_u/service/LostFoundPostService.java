package com.dmu.find_u.service;

import com.dmu.find_u.entity.LostFoundPost;
import com.dmu.find_u.entity.PostLike;
import com.dmu.find_u.entity.UserInfo;
import com.dmu.find_u.repository.LostFoundPostRepository;
import com.dmu.find_u.repository.PostLikeRepository;
import com.dmu.find_u.repository.UserInfoRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor // final 필드를 생성자로 주입
public class LostFoundPostService {

    private final UserInfoRepository userInfoRepository;
    private final LostFoundPostRepository postRepository; // final로 선언
    private final PostLikeRepository likeRepository;
    // 내가 올린 게시물
    public List<Map<String, Object>> getPostsByUser(Long userId) {
        List<LostFoundPost> posts = postRepository.findByUserId(userId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (LostFoundPost p : posts) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("title", p.getTitle());
            map.put("content", p.getContent());
            map.put("type", p.getType());
            map.put("date", p.getCreatedAt() != null ? p.getCreatedAt().toLocalDate().toString() : null);
            map.put("writer", p.getWriter() != null ? p.getWriter().getName() : "알 수 없음");
            map.put("image", p.getImageUrl());
            map.put("place", p.getPlace() != null ? p.getPlace().getName() : null);
            map.put("category", p.getCategory() != null ? p.getCategory().getName() : null);
            map.put("likeCount", p.getLikeCount());

            result.add(map);
        }

        return result;
    }

    // 분실/습득으로 구분한 게시물
    public List<Map<String, Object>> getPostsByUserAndType(Long userId, String type) {
        List<LostFoundPost> posts = postRepository.findByUserIdAndType(userId, type);
        List<Map<String, Object>> result = new ArrayList<>();

        for (LostFoundPost p : posts) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("title", p.getTitle());
            map.put("content", p.getContent());
            map.put("type", p.getType());
            map.put("date", p.getCreatedAt() != null ? p.getCreatedAt().toLocalDate().toString() : null);
            map.put("writer", p.getWriter() != null ? p.getWriter().getName() : "알 수 없음");
            map.put("image", p.getImageUrl());
            map.put("place", p.getPlace() != null ? p.getPlace().getName() : null);
            map.put("category", p.getCategory() != null ? p.getCategory().getName() : null);
            map.put("likeCount", p.getLikeCount());

            result.add(map);
        }

        return result;
    }

    // 좋아요 추가
    public boolean likePost(Long postId, UserInfo user) {
        LostFoundPost post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));

        // 이미 좋아요 눌렀으면 false
        if (likeRepository.existsByPostAndUser(post, user)) {
            return false;
        }

        // 좋아요 저장
        PostLike like = PostLike.builder()
                .post(post)
                .user(user)
                .build();
        likeRepository.save(like);

        // 카운트 갱신
        int count = likeRepository.countByPost(post);
        post.setLikeCount(count);
        postRepository.save(post);

        return true;
    }

    // 좋아요 취소
    public boolean unlikePost(Long postId, UserInfo user) {
        LostFoundPost post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));

        if (!likeRepository.existsByPostAndUser(post, user)) {
            return false;
        }

        likeRepository.deleteByPostAndUser(post, user);

        // 다시 카운트
        int count = likeRepository.countByPost(post);
        post.setLikeCount(count);
        postRepository.save(post);

        return true;
    }

    // 게시물 조회
    public Page<Map<String, Object>> getAllPosts(String type, int page, int size,
                                                 String sortBy, String place, String category,
                                                 String startDate, String endDate) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy != null ? sortBy : "createdAt").descending()
        );

        Page<LostFoundPost> posts = postRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (type != null) predicates.add(cb.equal(root.get("type"), type));
            if (place != null) predicates.add(cb.equal(root.get("place").get("name"), place));
            if (category != null) predicates.add(cb.equal(root.get("category").get("name"), category));
            if (startDate != null && endDate != null) {
                predicates.add(cb.between(
                        root.get("createdAt"),
                        LocalDate.parse(startDate).atStartOfDay(),
                        LocalDate.parse(endDate).atTime(23,59,59)
                ));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        }, pageable);

        // Map 변환
        return posts.map(p -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("title", p.getTitle());
            map.put("type", p.getType());
            map.put("date", p.getCreatedAt() != null ? p.getCreatedAt().toLocalDate().toString() : null);
            map.put("writer", p.getWriter() != null ? p.getWriter().getName() : "알 수 없음");
            map.put("image", p.getImageUrl());
            map.put("content", p.getContent());
            map.put("place", p.getPlace() != null ? p.getPlace().getName() : null);
            map.put("category", p.getCategory() != null ? p.getCategory().getName() : null);
            map.put("likeCount", p.getLikeCount());
            return map;
        });
    }



    // 게시물의 아이디를 기반으로 정보를 넘김
    public Map<String, Object> getPostById(Long postId) {
        LostFoundPost p = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물이 존재하지 않습니다."));

        Map<String, Object> map = new HashMap<>();
        UserInfo writer = p.getWriter();
        map.put("id", p.getId());
        map.put("date", p.getCreatedAt() != null ? p.getCreatedAt().toLocalDate().toString() : null);
        map.put("type", p.getType());
        map.put("title", p.getTitle());
        map.put("view", p.getViewCount() != null ? p.getViewCount() : 0);
        map.put("writer", writer != null ? writer.getName() : "알 수 없음");
        map.put("image", p.getImageUrl());
        map.put("view", p.getViewCount() != null ? p.getViewCount() : 0);
        map.put("content", p.getContent());

        return map;
    }
}
