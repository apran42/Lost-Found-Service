package com.dmu.find_u.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private Integer likeCount;
    private String imageUrl;
    private String writerName; // 작성자 이름
}
