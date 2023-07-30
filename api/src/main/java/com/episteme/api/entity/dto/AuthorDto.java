package com.episteme.api.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthorDto {
    private String fullname;
    private String email;
    private LocalDate birthday;
    private String image;
    private String status;
    private String description;
}
