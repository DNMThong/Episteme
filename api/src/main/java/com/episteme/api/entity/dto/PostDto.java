package com.episteme.api.entity.dto;

import com.episteme.api.entity.PostsCategories;
import com.episteme.api.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostDto {
    private long postId;
    private Users user;
    private String title;
    private String slug;
    private String content;
    private String summary;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private String status;
    private List<PostsCategories> categoriesList;
}
