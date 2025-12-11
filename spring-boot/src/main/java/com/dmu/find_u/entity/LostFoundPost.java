package com.dmu.find_u.entity;

import com.dmu.find_u.entity.UserInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lost_found_post")
public class LostFoundPost {

    // Getter / Setter
    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, insertable = false, updatable = false)
    private Long userId;

    @Setter
    @Getter
    @Column(nullable = false)
    private String type; // 분실/습득

    @Setter
    @Getter
    @Column(nullable = false)
    private String title;

    @Setter
    @Getter
    @Column(columnDefinition = "TEXT")
    private String content;

    @Setter
    @Getter
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Setter
    @Getter
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Setter
    @Getter
    @Column(nullable = false)
    private String status; // 진행중/완료 등

    @Setter
    @Getter
    @Column(name = "image")
    private String imageUrl;

    @Getter
    @Setter
    @Column(name = "view_count", nullable = false)
    private Integer viewCount;

    @Getter
    @Setter
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "category_id")
    private Category category;

    @Getter
    @Setter
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "place_id")
    private Place place;


    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name = "user_id")

    private UserInfo Writer;

    @Getter
    @Setter
    @Column(name = "like_count", nullable = false)
    private Integer likeCount = 0;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();


    // 기본 생성자
    public LostFoundPost() {}

}