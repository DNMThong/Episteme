package com.episteme.api.entity.dto;

import com.episteme.api.entity.Bookmark;
import com.episteme.api.entity.Post;
import com.episteme.api.entity.SocialNetwork;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
public class UsersDto {
    private String userId;
    private String fullname;
    private String email;
    private LocalDate birthday;
    private LocalDateTime registeredAt;
    private LocalDateTime lastLogin;
    private String image;
    private String description;
    private String token;
    private Boolean role;
    private String status;
    private List<Bookmark> bookmarks;
    private List<Post> posts;
    private List<SocialNetwork> followerList;
    private List<SocialNetwork> followingList;
}
