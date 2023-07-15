package com.episteme.api.entity.dto;

import com.episteme.api.entity.Bookmark;
import com.episteme.api.entity.Post;
import com.episteme.api.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@NoArgsConstructor
@AllArgsConstructor
@Data

public class BookmarkDto {
    private long bookmarkId;
    private Users user;
    private Post post;
    private LocalDateTime saveTime;


}
