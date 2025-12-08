package com.dmu.find_u.repository;

import com.dmu.find_u.entity.LostFoundPost;
import com.dmu.find_u.entity.PostLike;
import com.dmu.find_u.entity.UserInfo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    boolean existsByPostIdAndUserId(Long postId, Long userId);

    int countByPostId(Long postId);

    void deleteByPostIdAndUserId(Long postId, Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE LostFoundPost p SET p.likeCount = :count WHERE p.id = :postId")
    void updateLikeCount(@Param("postId") Long postId, @Param("count") int count);


    @Query("SELECT COUNT(pl) FROM PostLike pl WHERE pl.post.userId = :userId")
    int countLikesReceived(Long userId);

//    @Query("SELECT * from ")

    int countByPost(LostFoundPost post);

    boolean existsByPostAndUser(LostFoundPost post, UserInfo user);

    void deleteByPostAndUser(LostFoundPost post, UserInfo user);
}

