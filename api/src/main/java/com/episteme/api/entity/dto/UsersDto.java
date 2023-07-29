package com.episteme.api.entity.dto;

import com.episteme.api.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsersDto {
    private String fullname;
    private String password;
    private String email;
    private LocalDate birthday;
    private String image;
    private String status;
    private String description;
    private Role roles;
}
