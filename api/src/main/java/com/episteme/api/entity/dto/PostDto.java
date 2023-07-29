package com.episteme.api.entity.dto;

import com.episteme.api.entity.enums.PostStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostDto {
    private long id;
    private String userId;
    private String title;
    private String slug;
    private String content;
    private String summary;
    private String image;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private PostStatus status;
    private Long view;
    private Integer total_bookmark;
    private Integer total_comment;
    private List<CategoriesDto> categories;
}
