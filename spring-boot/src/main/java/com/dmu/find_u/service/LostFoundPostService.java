package com.dmu.find_u.service;

import com.dmu.find_u.entity.LostFoundPost;
import com.dmu.find_u.entity.PostLike;
import com.dmu.find_u.entity.UserInfo;
import com.dmu.find_u.repository.LostFoundPostRepository;
import com.dmu.find_u.repository.PostLikeRepository;
import com.dmu.find_u.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        return postRepository.findByUserId(userId)
                .stream()
                .map(this::postToDto)
                .toList();
    }
    // 분실/습득 으로 구분한 게시물(내가 올린 것중)
    public List<Map<String, Object>> getPostsByUserAndType(Long userId, String type) {
        return postRepository.findByUserIdAndType(userId, type)
                .stream()
                .map(this::postToDto)
                .toList();
    }
    private Map<String, Object> postToDto(LostFoundPost post) {
        Map<String, Object> dto = new HashMap<>();
        dto.put("id", post.getId());
        dto.put("date", post.getCreatedAt().toLocalDate().toString());
        dto.put("type", post.getType());
        dto.put("title", post.getTitle());
        dto.put("placeId", post.getPlaceId());
        dto.put("categoryId", post.getCategoryId());
        dto.put("writerId", post.getUserId());
        return dto;
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
    public List<Map<String, Object>> getAllPosts(String type) {

        List<LostFoundPost> posts;
        if (type != null) {
            posts = postRepository.findByType(type.equals("lost") ? "분실": "습득");
        } else {
            posts = postRepository.findAll();
        }
        List<Map<String, Object>> result = new ArrayList<>();

        for (LostFoundPost p : posts) {
            Map<String, Object> map = new HashMap<>();

            UserInfo writer = userInfoRepository.findById(p.getUserId())
                    .orElse(null);

            map.put("id", p.getId());
            map.put("date", p.getCreatedAt().toLocalDate().toString());
            map.put("type", p.getType());
            map.put("title", p.getTitle());
            map.put("place", p.getPlace() != null ? p.getPlace().getName() : null);
            map.put("category", p.getCategory() != null ? p.getCategory().getName() : null);
            map.put("writer", writer != null ? writer.getName() : "알 수 없음");

            result.add(map);
        }

        return result;
    }
}
