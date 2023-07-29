package com.episteme.api.entity.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostDto {
    private long id;
    private UsersDto user;
    private String title;
    private String slug;
    private String content;
    private String summary;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String status;
    private List<CategoriesDto> categories;
}
