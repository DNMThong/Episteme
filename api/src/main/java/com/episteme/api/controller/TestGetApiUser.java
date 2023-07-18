package com.episteme.api.controller;

import com.episteme.api.entity.Comment;
import com.episteme.api.entity.dto.*;
import com.episteme.api.repository.CommentRepository;
import com.episteme.api.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TestGetApiUser {
    @Autowired
    private UsersServiceImpl usersService;
    @Autowired
    private BookmarkServiceImpl bookmarkService;
    @Autowired
    private PostServiceImpl postService;
    @Autowired
    private CategoriesServiceImpl categoriesService;
    @Autowired
    private SocialNetworkServiceImpl socialNetworkService;
    @Autowired
    private CommentServiceImpl commentService;

    @GetMapping("/users")
    public ResponseEntity<?> getListUser() {
        List<UsersDto> usersDtoList = usersService.findAll();
        return ResponseEntity.ok(usersDtoList);
    }

    @GetMapping("/{userId}/bookmarks")
    public ResponseEntity<?> getListBookmarkByUser(@PathVariable String userId) {
        List<BookmarkDto> bookmarkDTOList = bookmarkService.findBookmarkByUserId(userId);
        return ResponseEntity.ok(bookmarkDTOList);
    }

    @GetMapping("/posts")
    public ResponseEntity<?> getListPost() {
        List<PostDto> postDtoList = postService.findAll();
        return ResponseEntity.ok(postDtoList);
    }

    @GetMapping("/{userId}/posts")
    public ResponseEntity<?> getPostByUserId(@PathVariable String userId) {
        List<PostDto> postDtoList = postService.findAllPostByUserId(userId);
        return ResponseEntity.ok(postDtoList);
    }

    @GetMapping("/danh-muc/{slug}")
    public ResponseEntity<?> getAllPostByCategoriesId(@PathVariable String slug) {
        List<PostDto> postDtoList = postService.findAllPostByCategoriesSlug(slug);
        return ResponseEntity.ok(postDtoList);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getListCategories() {
        List<CategoriesDto> postDtoList = categoriesService.findAll();
        return ResponseEntity.ok(postDtoList);
    }

    @GetMapping("/{userId}/follower")
    public ResponseEntity<?> getListFollower(@PathVariable String userId) {
        List<UsersDto> socialNetworkDtoList = socialNetworkService.findAllFollowingByUserId(userId);
        return ResponseEntity.ok(socialNetworkDtoList);
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<?> getListFollowing(@PathVariable String userId) {
        List<UsersDto> socialNetworkDtoList = socialNetworkService.findAllFollowerByUserId(userId);
        return ResponseEntity.ok(socialNetworkDtoList);
    }

    @GetMapping("/{postId}/comment")
    public ResponseEntity<?> getListComment(@PathVariable Long postId) {
        List<CommentDto> commentDtoList = commentService.findAllCommentByPostId(postId);
        return ResponseEntity.ok(commentDtoList);
    }
}
