package com.episteme.api.entity.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDto {
    private Long id;
    private UsersDto user;
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    @JsonManagedReference
    private List<CommentDto> comments;
    @JsonBackReference
    private CommentDto parentComment;
}
