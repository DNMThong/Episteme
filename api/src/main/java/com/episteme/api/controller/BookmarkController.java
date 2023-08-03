package com.episteme.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.episteme.api.entity.dto.BookmarkDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.BookmarkServiceImpl;
import com.episteme.api.services.PostServiceImpl;

@RestController
@RequestMapping("/api/v1/user")
public class BookmarkController {

	@Autowired
	PostServiceImpl postService;
	@Autowired
	BookmarkServiceImpl bookmarkService;

	@GetMapping("/{userId}/bookmark")
	public ResponseEntity<?> getListPost(@PathVariable String userId) {
		List<BookmarkDto> bookmarkDtoList = bookmarkService.findBookmarkByUserId(userId);
		return ResponseEntity.ok(bookmarkDtoList);
	}

	@PostMapping("/{userId}/bookmark/post/{postId}")
	public ApiResponse<BookmarkDto> create(@PathVariable String userId, @PathVariable Long postId,
			@RequestBody BookmarkDto bookmarkDto) {
		return ApiResponse.success(HttpStatus.OK, "success", bookmarkService.savePost(bookmarkDto, postId, userId));
	}

	@DeleteMapping("/{userId}/bookmark/{bookmarkId}")
	public ApiResponse<Void> delete(@PathVariable Long bookmarkId) {
		bookmarkService.delete(bookmarkId);
		return ApiResponse.success(HttpStatus.OK, "success", null);
	}
}
