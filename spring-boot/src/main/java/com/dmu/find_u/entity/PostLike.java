package com.dmu.find_u.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "post_like", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"post_id", "user_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어떤 게시글에 좋아요
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private LostFoundPost post;

    // 어떤 사용자가 좋아요
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserInfo user;

    public PostLike(Long postId, Long userId) {
    }
}
