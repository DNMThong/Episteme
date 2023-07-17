package com.episteme.api.controller;

import com.episteme.api.entity.Comment;
import com.episteme.api.entity.dto.*;
import com.episteme.api.repository.CommentRepository;
import com.episteme.api.services.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    private PostsCategoriesServiceImpl postsCategoriesService;
    @Autowired
    private CommentServiceImpl commentService;
    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("/users")
    public ResponseEntity<?> getListUser() {
        List<UsersDto> usersDtoList = usersService.findAll();
        return ResponseEntity.ok(usersDtoList);
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<?> getListBookmark() {
        List<BookmarkDto> bookmarkDTOList = bookmarkService.findAll();
        return ResponseEntity.ok(bookmarkDTOList);
    }

    @GetMapping("/posts")
    public ResponseEntity<?> getListPost() {
        List<PostDto> postDtoList = postService.findAll();
        return ResponseEntity.ok(postDtoList);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getListCategories() {
        List<CategoriesDto> postDtoList = categoriesService.findAll();
        return ResponseEntity.ok(postDtoList);
    }

    @GetMapping("/socialNetwork")
    public ResponseEntity<?> getListSocialNetwork() {
        List<SocialNetworkDto> socialNetworkDtoList = socialNetworkService.findAll();
        return ResponseEntity.ok(socialNetworkDtoList);
    }

    @GetMapping("/comment")
    public ResponseEntity<?> getListComment() {
        List<Comment> commentDtoList = commentRepository.findAll();
        return ResponseEntity.ok(commentDtoList);
    }
}
