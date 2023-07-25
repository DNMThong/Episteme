package com.episteme.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Data
public class RegisterRequest {
    private String Id;
    private String username;
    private String password;
    private String email;

}
