package com.episteme.api.controller;

import com.episteme.api.services.AuthenticationService;
import com.episteme.api.request.AuthenticationRequest;
import com.episteme.api.request.RegisterRequest;
import com.episteme.api.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/login-google")
    public ResponseEntity<AuthenticationResponse> loginWithGoogle(
            @RequestBody String token
    ) {
        System.out.println(token);
        try {
            return ResponseEntity.ok(service.loginWithGoogle(token));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
