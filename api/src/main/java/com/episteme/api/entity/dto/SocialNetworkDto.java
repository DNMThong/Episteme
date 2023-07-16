package com.episteme.api.entity.dto;

import com.episteme.api.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SocialNetworkDto {
    private Users followerUser;
    private Users followingUser;
}
