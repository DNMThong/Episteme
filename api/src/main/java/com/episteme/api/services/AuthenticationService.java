package com.episteme.api.services;

import com.episteme.api.entity.Role;
import com.episteme.api.entity.Users;
import com.episteme.api.repository.UsersRepository;
import com.episteme.api.request.AuthenticationRequest;
import com.episteme.api.request.RegisterRequest;
import com.episteme.api.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsersRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private  final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        var users= Users.builder()
                .userId(shortUUID())
                .fullname(request.getFullname())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .birthday(request.getBirthday())
                .image(request.getImage())
                .description(request.getDescription())
                .role(Role.USER)
                .build();
        repository.save(users);
        var jwtToken =jwtService.generateToken(users);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),request.getPassword()
                )
        );
        var users = repository.findByEmail(request.getEmail()).orElseThrow();

        String jwtToken =jwtService.generateToken(users);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
    public static String shortUUID() {
        UUID uuid = UUID.randomUUID();
        long l = ByteBuffer.wrap(uuid.toString().getBytes()).getLong();
        return Long.toString(l, Character.MAX_RADIX);
    }
}
