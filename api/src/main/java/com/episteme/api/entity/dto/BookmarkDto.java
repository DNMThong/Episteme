package com.episteme.api.entity.dto;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookmarkDto {
    private long bookmarkId;
    private LocalDateTime saveTime;
    private UsersDto usersDto;
    private PostDto postDto;
}

