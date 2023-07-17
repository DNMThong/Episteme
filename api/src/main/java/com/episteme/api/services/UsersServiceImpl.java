package com.episteme.api.services;

import com.episteme.api.entity.Bookmark;
import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.BookmarkDto;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.ResourceNotFoundException;
import com.episteme.api.repository.BookmarkRepository;
import com.episteme.api.repository.UsersRepository;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UsersServiceImpl implements UsersService {
    @Autowired
    UsersRepository usersRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public UsersDto save(UsersDto usersDto) {
        Users users = this.dtoToUsers(usersDto);
        Users saveUsers = this.usersRepository.save(users);
        return this.usersToDto(saveUsers);
    }

    @Override
    public UsersDto update(UsersDto usersDto, String Id) {
        return null;
    }

    @Override
    public void delete(String Id) {
        Users users = this.usersRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("Users", "Id", String.valueOf(Id)));
        this.usersRepository.delete(users);

    }

    @Override
    public List<UsersDto> findAll() {
        List<Users> users = this.usersRepository.findAll();
        List<UsersDto> usersDtos = users.stream().map(bookmark -> this.usersToDto(bookmark)).collect(Collectors.toList());
        return usersDtos;
    }

    @Override
    public UsersDto findById(String Id) {
        Users users = this.usersRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("Users", "Id", String.valueOf(Id)));
        return this.usersToDto(users);
    }

    public Users dtoToUsers(UsersDto usersDto) {
        return this.modelMapper.map(usersDto, Users.class);
    }

    public UsersDto usersToDto(Users users) {
        return this.modelMapper.map(users, UsersDto.class);
    }

}
