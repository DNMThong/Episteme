package com.episteme.api.controller;

import com.episteme.api.entity.dto.CategoriesDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.CategoriesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoriesController {
    @Autowired
    CategoriesServiceImpl categoriesService;

    @GetMapping("/admin/getAllCategory")
    public ApiResponse<List<CategoriesDto>> getAllCategory() {
        List<CategoriesDto> categoriesDto = categoriesService.findAll();
        return ApiResponse.success(HttpStatus.OK, "", categoriesDto);
    }

    @PostMapping("/admin/createCategory")
    public ApiResponse<?> createCategory(@RequestBody CategoriesDto categoriesDto) {
        CategoriesDto categories = categoriesService.save(categoriesDto);
        String messageSuccess = "Thêm danh mục thành công!!";
        return ApiResponse.success(HttpStatus.CREATED ,messageSuccess, categories);
    }

    @PutMapping("/admin/{categoryId}")
    public ApiResponse<?> updateCategory(@RequestBody CategoriesDto categoriesDto,
                                         @PathVariable Integer categoryId ) {
        CategoriesDto categories = categoriesService.update(categoriesDto, categoryId);
        String messageSuccess = "Sửa danh mục thành công!!";
        return ApiResponse.success(HttpStatus.OK ,messageSuccess, categories);
    }

    @DeleteMapping("/admin/{categoryId}")
    public ApiResponse<?> deleteCategory(@PathVariable Integer categoryId) {
        categoriesService.deleteCategoryById(categoryId);
        String messageSuccess = "Xóa danh mục thành công!!";
        return ApiResponse.success(HttpStatus.OK ,messageSuccess, null);
    }

    @GetMapping("/admin/{categoryId}")
    public ApiResponse<CategoriesDto> findByIdCategory(@PathVariable Integer categoryId) {
        CategoriesDto categoriesDto = categoriesService.findById(categoryId);
        String messageSuccess = "Tìm thấy danh mục với ID: " + categoryId;
        return ApiResponse.success(HttpStatus.OK, messageSuccess, categoriesDto);
    }

    @GetMapping("/admin/category/{kw}")
    public ApiResponse<List<CategoriesDto>> findByCategoryName(@PathVariable String kw) {
        List<CategoriesDto> categoriesDto = categoriesService.findByNameCategories(kw);
        return ApiResponse.success(HttpStatus.OK, "", categoriesDto);
    }
}
