package com.episteme.api.entity.dto;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookmarkDto {
    private long id;
    private LocalDateTime saveTime;
    private UsersDto user;
    private PostDto post;
}

