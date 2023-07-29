package com.episteme.api.services;

import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.DuplicateRecordException;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.UsersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsersServiceImpl implements UsersService {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UsersDto save(UsersDto usersDto) {
        Users users = this.dtoToUsers(usersDto);
        Users saveUsers = this.usersRepository.save(users);
        return this.usersToDto(saveUsers);
    }

//    public UsersDto saveResp(UsersDto usersDto) {
//        try {
//            Users users = this.dtoToUsers(usersDto);
//            Users saveUsers = this.usersRepository.save(users);
//            return this.usersToDto(saveUsers);
//        } catch (DataIntegrityViolationException ex) {
//            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.CONFLICT, "Duplicate record: " + ex.getMessage());
//            throw new DuplicateRecordException(errorResponse.getMessage());
//        }
//    }

    @Override
    public UsersDto update(UsersDto usersDto, String Id) {
        return null;
    }

    @Override
    public void delete(String id) {
        Users users = this.usersRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find user id: " + id));
        this.usersRepository.delete(users);
    }

//    public ResponseEntity<ErrorResponse> deleteResp(String id) {
//        try {
//            Users users = this.usersRepository.findById(id)
//                    .orElseThrow(() -> new NotFoundException("Can't find user id: " + id));
//            this.usersRepository.delete(users);
//            return new ResponseEntity<>(HttpStatus.OK);
//        } catch (NotFoundException ex) {
//            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
//            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
//        }
//    }

    @Override
    public List<UsersDto> findAll() {
        List<Users> users = this.usersRepository.findAll();
        List<UsersDto> usersDtos = users.stream().map(bookmark -> this.usersToDto(bookmark)).collect(Collectors.toList());
        return usersDtos;
    }

    public ResponseEntity<List<UsersDto>> findAllResp() {
        List<Users> users = this.usersRepository.findAll();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<UsersDto> usersDtos = users.stream()
                .map(user -> this.usersToDto(user))
                .collect(Collectors.toList());
        return new ResponseEntity<>(usersDtos, HttpStatus.OK);
    }

    @Override
    public UsersDto findById(String id) { //nhận UsersDto
        Users users = this.usersRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find user id: " + id));
        return usersToDto(users);
    }
    public Users findByIdUser(String id) { // nhận Users
        return this.usersRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find user id: " + id));
    }
    public Users dtoToUsers(UsersDto usersDto) {
        return this.modelMapper.map(usersDto, Users.class);
    }

    public UsersDto usersToDto(Users users) {
        return this.modelMapper.map(users, UsersDto.class);
    }

}
