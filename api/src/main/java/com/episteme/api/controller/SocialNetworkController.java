package com.episteme.api.controller;

import com.episteme.api.entity.dto.FollowUserResponseDto;
import com.episteme.api.entity.dto.SocialNetworkDto;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.repository.SocialNetworkRepository;
import com.episteme.api.response.UserResponse;
import com.episteme.api.services.SocialNetworkServiceImpl;
import com.episteme.api.services.UsersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/social")
public class SocialNetworkController {
    @Autowired
    SocialNetworkServiceImpl socialNetworkService;
    @Autowired
    SocialNetworkRepository socialNetworkRepository;
    @Autowired
    UsersServiceImpl usersService;
    @PostMapping("")
    public ApiResponse<SocialNetworkDto> save(@RequestBody SocialNetworkDto socialNetworkDto){
        return ApiResponse.success(HttpStatus.OK,"success",socialNetworkService.save(socialNetworkDto));
    }
    @GetMapping("")
    public ApiResponse<UserResponse> getAuthorMostFollower(
            @RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
            @RequestParam(value="pageSize",defaultValue = "5",required = false) Integer pageSize
    ){
        return ApiResponse.success(HttpStatus.OK,"success",usersService.getUserMostFollow(pageNumber,pageSize));
    }
}
