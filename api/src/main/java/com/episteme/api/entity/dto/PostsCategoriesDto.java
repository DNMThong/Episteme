package com.episteme.api.entity.dto;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostsCategoriesDto {
    Categories category;
    Post post;
}
