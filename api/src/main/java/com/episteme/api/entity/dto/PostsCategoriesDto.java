package com.episteme.api.entity.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PostsCategoriesDto {
    private CategoriesDto categoriesDto;
    @JsonIgnore
    private PostDto postDto;
}
