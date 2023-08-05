package com.episteme.api.controller;

import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.*;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.response.PostResponse;
import com.episteme.api.response.UserResponse;
import com.episteme.api.services.BookmarkServiceImpl;
import com.episteme.api.services.PostServiceImpl;
import com.episteme.api.services.SocialNetworkServiceImpl;
import com.episteme.api.services.UsersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UsersServiceImpl usersService;

    @Autowired
    PostServiceImpl postService;

    @Autowired
    BookmarkServiceImpl bookmarkService;

    @Autowired
    SocialNetworkServiceImpl socialNetworkService;

    @GetMapping("")
    public ApiResponse<UserResponse> getUsers(
            @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = "fullname", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        UserResponse userResponse = this.usersService.getAllUsers(pageNumber, pageSize, sortBy, sortDir);
        return ApiResponse.success(HttpStatus.OK, "success", userResponse);
    }

    @GetMapping("/{id}")
    public ApiResponse<AuthorDto> getAuthor(@PathVariable String id) {
        return ApiResponse.success(HttpStatus.OK, "success", usersService.findAuthorById(id));
    }

    @GetMapping("/search")
    public ApiResponse<List<AuthorDto>> search(
            @RequestParam(value = "q", defaultValue = "", required = false) String keywords) {
        return ApiResponse.success(HttpStatus.OK, "success", usersService.findByKeywords(keywords));
    }

    // Danh sách người minh đang theo dõi
    @GetMapping("/{id}/following")
    public ApiResponse<List<UsersDto>> listFollowing(@PathVariable String id) {
        return ApiResponse.success(HttpStatus.OK, "success", socialNetworkService.findAllFollowingByUserId(id));
    }

    // Danh sách người đang theo dõi mình
    @GetMapping("/{id}/followers")
    public ApiResponse<List<UsersDto>> listFollowers(@PathVariable String id) {
        return ApiResponse.success(HttpStatus.OK, "success", socialNetworkService.findAllFollowersByUserId(id));
    }

    // Số ngưới mình theo dõi và số người theo dõi mình
    @GetMapping("/{id}/follows/count")
    public ApiResponse<FollowUserResponseDto> countFollowOfUser(@PathVariable String id) {
        return ApiResponse.success(HttpStatus.OK, "success", socialNetworkService.followOfUser(id));
    }

    @GetMapping("/token/{token}")
    public ApiResponse<UsersDto> getUser(@PathVariable("token") String token) {

        return ApiResponse.success(HttpStatus.OK, "success", usersService.getUserWithToken(token));
    }

    @PostMapping("/{id}/posts")
    public ApiResponse<PostDto> addPost(@RequestBody PostDto postDto, @PathVariable("id") String userId) {
        PostDto savedPost = postService.savePostWithCategories(postDto, userId);
        String successMessage = "Thêm thành công!";
        return ApiResponse.success(HttpStatus.CREATED, successMessage, savedPost);
    }

    @GetMapping("/{userId}/bookmark")
    public ResponseEntity<?> getListPost(@PathVariable String userId) {
        List<BookmarkDto> bookmarkDtoList = bookmarkService.findBookmarkByUserId(userId);
        return ResponseEntity.ok(bookmarkDtoList);
    }

    @GetMapping("/{id}/posts")
    public ApiResponse<List<PostDto>> getPostsByUserId(@PathVariable("id") String userId) {
        List<PostDto> posts = postService.findAllPostByUserId(userId);
        String successMessage = "success";
        return ApiResponse.success(HttpStatus.OK, successMessage, posts);
    }

    @GetMapping("/{id}/drafts")
    public ApiResponse<PostResponse> getDraftsByUserId(@PathVariable("id") String userId,
            @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "5", required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "des", required = false) String sortDir

    ) {
        PostResponse posts = postService.findAllDraftByUserId(userId, pageNumber, pageSize, sortBy, sortDir);
        String successMessage = "success";
        return ApiResponse.success(HttpStatus.OK, successMessage, posts);
    }

}
