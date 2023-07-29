package com.episteme.api.controller;

import com.episteme.api.controller.admin.UserController;
import com.episteme.api.entity.dto.*;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.response.PostResponse;
import com.episteme.api.services.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TestGetApiUser {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

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

    @GetMapping("/users/{id}")
    public ApiResponse<UsersDto> getUserById(@PathVariable String id) {
        UsersDto usersDto = usersService.findById(id);
        return ApiResponse.success(HttpStatus.OK, "success", usersDto);
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

    // Phân trang Post
    @GetMapping("/post")
    public ResponseEntity<PostResponse> getAllPost(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                   @RequestParam(value="pageSize",defaultValue = "10",required = false) Integer pageSize,
                                                   @RequestParam(value = "sortBy", defaultValue = "title", required = false) String sortBy,
                                                   @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir
    ){
        PostResponse postResponse = this.postService.getAllPosts(pageNumber,pageSize,sortBy,sortDir);
        return new ResponseEntity<PostResponse>(postResponse,HttpStatus.OK);
    }

    @GetMapping("/post/search")
    public ResponseEntity<?> search(@RequestParam(value = "kw",defaultValue = "",required = false) String keywords){
        return ResponseEntity.ok(postService.findByKeywords(keywords));
    }
}
