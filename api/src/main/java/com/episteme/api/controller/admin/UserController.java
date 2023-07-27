package com.episteme.api.controller.admin;

import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.ApiResponse;
import com.episteme.api.response.PostResponse;
import com.episteme.api.response.UserResponse;
import com.episteme.api.services.UsersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/admin/user")
public class UserController {
    @Autowired
    private UsersServiceImpl usersService;
    @GetMapping("/")
    public ApiResponse<UserResponse> getAllPost(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                   @RequestParam(value="pageSize",defaultValue = "10",required = false) Integer pageSize,
                                                   @RequestParam(value = "sortBy", defaultValue = "fullname", required = false) String sortBy,
                                                   @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir
    ){
        UserResponse userResponse = this.usersService.getAllPosts(pageNumber,pageSize,sortBy,sortDir);
        return ApiResponse.success(HttpStatus.OK, "success", userResponse);
    }
    @GetMapping("/search")
    public ApiResponse<List<UsersDto>> search(@RequestParam(value = "kw",defaultValue = "",required = false) String keywords){
        return ApiResponse.success(HttpStatus.OK,"success",usersService.findByKeywords(keywords));
    }
    @PostMapping("/create")
    public ApiResponse<UsersDto> create (@RequestBody UsersDto usersDto){
        return ApiResponse.success(HttpStatus.OK,"success",usersService.save(usersDto));
    }
    @PutMapping("/update/{id}")
    public ApiResponse<UsersDto> update (@RequestBody UsersDto usersDto,@PathVariable String id){
        return ApiResponse.success(HttpStatus.OK,"success",usersService.update(usersDto,id));
    }
    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete (@PathVariable String id){
        usersService.delete(id);
        return  ApiResponse.success(HttpStatus.OK,"success",null);
    }
//    @PutMapping("/update/{id}")
//    public ApiResponse<UsersDto> updateStatus (@RequestBody UsersDto usersDto,@PathVariable String id){
//        return ApiResponse.success(HttpStatus.OK,"success",usersService.update(usersDto,id));
//    }
}
