package com.episteme.api.entity.dto;

import com.episteme.api.entity.PostsCategories;
import com.episteme.api.entity.Users;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostDto {
    private long postId;
    private UsersDto usersDto;
    private String title;
    private String slug;
    private String content;
    private String summary;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String status;
    private List<CategoriesDto> categoriesDtoList;
}
