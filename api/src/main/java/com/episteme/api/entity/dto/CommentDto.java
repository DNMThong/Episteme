package com.episteme.api.entity.dto;

import com.episteme.api.entity.Comment;
import com.episteme.api.entity.Post;
import com.episteme.api.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CommentDto {
    private Long commentId;
    private Users user;
    private Post post;
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private List<Comment> comments;
    private Comment parentComment;
}
