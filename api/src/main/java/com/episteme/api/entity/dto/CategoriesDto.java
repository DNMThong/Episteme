package com.episteme.api.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CategoriesDto {
    private int categoryId;
    private String title;
    private String slug;
}
