package com.dmu.find_u.repository;

import com.dmu.find_u.entity.LostFoundPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LostFoundPostRepository extends JpaRepository<LostFoundPost, Long>,
        JpaSpecificationExecutor<LostFoundPost> {

    List<LostFoundPost> findByUserId(Long userId);

    List<LostFoundPost> findByUserIdAndType(Long userId, String type);

    @Override
    Optional<LostFoundPost> findById(Long id);

    @Modifying
    @Query("UPDATE LostFoundPost p SET p.likeCount = :likeCount WHERE p.id = :postId")
    void updateLikeCount(@Param("postId") Long postId, @Param("likeCount") int likeCount);

    List<LostFoundPost> findAllByOrderByIdDesc();

    List<LostFoundPost> findByType(String type);


}
