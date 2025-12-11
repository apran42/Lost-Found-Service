package com.dmu.find_u.repository;

import com.dmu.find_u.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdOrderByCreatedAtAsc(Long postId);

    List<Comment> findByPostId(Long id);
}

