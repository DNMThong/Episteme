package com.episteme.api.controller;

import com.episteme.api.entity.dto.FollowUserResponseDto;
import com.episteme.api.entity.dto.SocialNetworkDto;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.services.SocialNetworkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/follows")
public class SocialNetworkController {
    @Autowired
    SocialNetworkServiceImpl socialNetworkService;
    @PostMapping("")
    public ApiResponse<SocialNetworkDto> save(@RequestBody SocialNetworkDto socialNetworkDto){
        return ApiResponse.success(HttpStatus.OK,"success",socialNetworkService.save(socialNetworkDto));
    }
    @DeleteMapping("")
    public ApiResponse<Void> unfollow(@RequestBody SocialNetworkDto socialNetworkDto) {
        socialNetworkService.unfollow(socialNetworkDto);
        return ApiResponse.success(HttpStatus.OK, "success", null);
    }

}
