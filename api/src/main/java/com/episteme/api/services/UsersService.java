package com.episteme.api.services;

import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.response.UserResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UsersService extends IService<UsersDto, String> {
    UserResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

    UsersDto updateForAdmin(String id,UsersDto usersDto);

    UsersDto getUserWithToken(String token);
}
