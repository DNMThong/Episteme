package com.episteme.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.episteme.api.entity.dto.CommentDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.CommentServiceImpl;

@RestController
@RequestMapping("/api/v1/posts")
public class CommentController {
	@Autowired
	private CommentServiceImpl commentService;

	// with post
	@GetMapping("/{postId}/comments")
	public ResponseEntity<List<CommentDto>> getListComment(@PathVariable Long postId) {
		List<CommentDto> commentDtoList = commentService.findAllCommentByPostId(postId);
		return ResponseEntity.ok(commentDtoList);
	}


	@PostMapping("/{postId}/comments")
	@PreAuthorize("hasAnyAuthority('USER','ADMIN')")
	public ApiResponse<CommentDto> create(@PathVariable Long postId, @PathVariable Optional<Long> commentId,
			@RequestBody CommentDto commentDto) {
		return ApiResponse.success(HttpStatus.OK, "success",
				commentService.saveNewComment(commentDto, postId, commentId));
	}


	@PostMapping("/{postId}/comments/reply/{commentId}")
	@PreAuthorize("hasAnyAuthority('USER','ADMIN')")
	public ApiResponse<CommentDto> reply(@PathVariable Long postId, @PathVariable Optional<Long> commentId,
			@RequestBody CommentDto commentDto) {
		return ApiResponse.success(HttpStatus.OK, "success",
				commentService.saveNewComment(commentDto, postId, commentId));
	}

	@PutMapping("/{postId}/comments/{commentId}")
	public ApiResponse<CommentDto> update(@RequestBody CommentDto commentDto, @PathVariable Long postId,
			@PathVariable Long commentId) {
		return ApiResponse.success(HttpStatus.OK, "success",
				commentService.UpdateComment(commentDto, postId, commentId));
	}

	@DeleteMapping("/{postId}/comments/{cmtId}")
	public ApiResponse<Void> delete(@PathVariable Long cmtId) {
		commentService.delete(cmtId);
		return ApiResponse.success(HttpStatus.OK, "success", null);
	}
}
