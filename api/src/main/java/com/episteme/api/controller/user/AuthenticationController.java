package com.episteme.api.controller.user;

import com.episteme.api.services.AuthenticationService;
import com.episteme.api.request.AuthenticationRequest;
import com.episteme.api.request.RegisterRequest;
import com.episteme.api.response.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){

        return ResponseEntity.ok(service.authenticate(request));
    }
    @GetMapping("/success")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // Xóa thông tin đăng nhập khỏi SecurityContextHolder (Spring Security)


        // Trả về thông báo thành công hoặc mã lỗi nếu cần
        return ResponseEntity.ok("Logout thành công!");
    }
}
