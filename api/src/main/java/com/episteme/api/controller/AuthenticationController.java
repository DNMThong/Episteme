package com.episteme.api.controller;

import com.episteme.api.services.AuthenticationService;
import com.episteme.api.request.AuthenticationRequest;
import com.episteme.api.request.RegisterRequest;
import com.episteme.api.response.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @RequestMapping("/login-google")
    public ResponseEntity<AuthenticationResponse> loginWithGoogle(
            OAuth2AuthenticationToken auth2AuthenticationToken
    ){
        OAuth2User oAuth2User = auth2AuthenticationToken.getPrincipal();
        return ResponseEntity.ok(service.loginWithGoogle(oAuth2User));
    }


}