package com.dmu.find_u.service;

import com.dmu.find_u.entity.LostFoundPost;
import com.dmu.find_u.entity.PostLike;
import com.dmu.find_u.entity.UserInfo;
import com.dmu.find_u.repository.LostFoundPostRepository;
import com.dmu.find_u.repository.PostLikeRepository;
import com.dmu.find_u.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostLikeService {

    private final PostLikeRepository postLikeRepository;
    private final LostFoundPostRepository postRepository;
    private final UserInfoRepository userRepository;

    @Transactional
    public LostFoundPost toggleLike(Long postId, Long userId) {
        LostFoundPost post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물이 존재하지 않습니다."));
        UserInfo user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저가 존재하지 않습니다."));

        Optional<PostLike> existing = postLikeRepository.findByUserAndPost(user, post);

        if (existing.isPresent()) {
            // 좋아요 취소
            postLikeRepository.delete(existing.get());
            post.setLikeCount((post.getLikeCount() == null ? 0 : post.getLikeCount()) - 1);
        } else {
            // 좋아요 추가
            PostLike like = new PostLike();
            like.setPost(post);
            like.setUser(user);
            postLikeRepository.save(like);
            post.setLikeCount((post.getLikeCount() == null ? 0 : post.getLikeCount()) + 1);
        }

        LostFoundPost savePost =  postRepository.save(post);
        postRepository.flush();
        return savePost;
    }

    public boolean isLikedByUser(Long postId, Long userId) {
        LostFoundPost post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시물이 존재하지 않습니다."));
        UserInfo user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저가 존재하지 않습니다."));

        return postLikeRepository.findByUserAndPost(user, post).isPresent();
    }
}
