package com.episteme.api.controller;

import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {
    @Autowired
    PostServiceImpl postService;

    @GetMapping("/getAllPost")
    public ResponseEntity<?> getAll() {
        List<PostDto> postDtoList = this.postService.findAll();
        return ResponseEntity.ok(postDtoList);
    }

    @PostMapping("/users/{userId}/posts")
    public ApiResponse<PostDto> addPost(@RequestBody PostDto postDto,
                                        @PathVariable String userId) {
        PostDto savedPost = postService.savePostWithCategories(postDto, userId);
        String successMessage = "Thêm bài đăng thành công!";
        return ApiResponse.success(HttpStatus.CREATED,successMessage, savedPost);
    }

    @PutMapping("/posts/{postId}")
    public  ApiResponse<PostDto> updatePost(@RequestBody PostDto postDto,
                                        @PathVariable Long postId) {
        PostDto updatePost = postService.updatePostWithCategories(postDto, postId);
        String successMessage = "Cập nhật bài đăng thành công!";
        return  ApiResponse.success(HttpStatus.CREATED,successMessage, updatePost);
    }

    @DeleteMapping("/posts/{postId}")
    public ApiResponse<PostDto> deletePost(@PathVariable("postId") Long postId) {
        postService.delete(postId);
        String successMessage = "Xóa bài đăng thành công!";
        return  ApiResponse.success(HttpStatus.CREATED,successMessage, null);
    }

    //PostDraft: Bản nháp của bài đăng
    @PutMapping("/draft/{postId}")
    public ApiResponse<?> addDraft(@PathVariable Long postId) {
        PostDto postDto = this.postService.createDraft(postId);
        String successMessage = "Lưu bản nháp bài đăng thành công!";
        return ApiResponse.success(HttpStatus.OK, successMessage, postDto);
    }

    @GetMapping("/draft")
    public ApiResponse<?> getAllDraftPost() {
        List<PostDto> postDto = this.postService.findALlDraftPost();
        return ApiResponse.success(HttpStatus.OK, "", postDto);
    }


}
