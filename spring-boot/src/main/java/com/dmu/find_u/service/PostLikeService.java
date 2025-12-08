package com.dmu.find_u.service;

import com.dmu.find_u.entity.PostLike;
import com.dmu.find_u.repository.LostFoundPostRepository;
import com.dmu.find_u.repository.PostLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostLikeService {

    private final PostLikeRepository postLikeRepository;
    private final LostFoundPostRepository postRepository;

    // 좋아요 추가
    public void addLike(Long postId, Long userId) {
        // 이미 눌렀는지 확인
        if (postLikeRepository.existsByPostIdAndUserId(postId, userId)) return;

        // 좋아요 저장
        PostLike like = new PostLike(postId, userId);
        postLikeRepository.save(like);

        // 좋아요 개수 새로 집계
        int count = postLikeRepository.countByPostId(postId);

        // 게시물 DB 업데이트
        postRepository.updateLikeCount(postId, count);
    }

    // 좋아요 취소
    public void removeLike(Long postId, Long userId) {
        postLikeRepository.deleteByPostIdAndUserId(postId, userId);

        int count = postLikeRepository.countByPostId(postId);
        postRepository.updateLikeCount(postId, count);
    }
}
