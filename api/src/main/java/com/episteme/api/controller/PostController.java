package com.episteme.api.controller;

import com.episteme.api.entity.Post;
import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.ApiResponse;
import com.episteme.api.entity.dto.CategoriesDto;
import com.episteme.api.entity.dto.PostDto;
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
    public ResponseEntity<?> addPost(@RequestBody PostDto postDto,
                                     @PathVariable Users userId) {
        PostDto savedPost = postService.savePostWithCategories(postDto, userId);
        String successMessage = "Thêm bài đăng thành công!";
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(successMessage, savedPost));

    }

    @PutMapping("/users/{userId}/posts/{postId}")
    public ResponseEntity<?> updatePost(@RequestBody PostDto postDto,
                                        @PathVariable("userId") Users userId,
                                        @PathVariable("postId") Long id) {
        PostDto updatePost = postService.updatePostWithCategories(postDto, userId, id);
        String successMessage = "Cập nhật bài đăng thành công!";
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(successMessage, updatePost));
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable("postId") Long postId
                                        ) {
        postService.delete(postId);
        String successMessage = "Xóa bài đăng thành công!";
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(successMessage, null));
    }
}
