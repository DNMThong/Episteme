package com.episteme.api.services;

import com.episteme.api.entity.enums.Role;
import com.episteme.api.entity.Users;
import com.episteme.api.repository.UsersRepository;
import com.episteme.api.request.AuthenticationRequest;
import com.episteme.api.request.RegisterRequest;
import com.episteme.api.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsersRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private  final AuthenticationManager authenticationManager;

    @Autowired
    UsersServiceImpl usersService;

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
        Users userSaved = repository.save(users);
        var jwtToken =jwtService.generateToken(users);
        return AuthenticationResponse.builder().infoUser(usersService.usersToDto(userSaved)).token(jwtToken).build();
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),request.getPassword()
                )
        );
        var users = repository.findByEmailAndPasswordNotNull(request.getEmail()).orElseThrow();

        String jwtToken =jwtService.generateToken(users);
        return AuthenticationResponse.builder().infoUser(usersService.usersToDto(users)).token(jwtToken).build();
    }

    public AuthenticationResponse loginWithGoogle(OAuth2User oAuth2User) {
        Map<String,Object> map =  oAuth2User.getAttributes();
        var users= Users.builder()
                .userId(shortUUID())
                .fullname(String.valueOf(map.get("name")))
                .password(null)
                .birthday(null)
                .image(String.valueOf(map.get("picture")))
                .description("")
                .role(Role.USER)
                .build();
        Optional<Users> optional = repository.findByEmailAndPasswordNull(users.getEmail());

        var userSaved = optional.isPresent() ? optional.get() : repository.save(users);
        var jwtToken = jwtService.generateToken(users);

        return AuthenticationResponse.builder().infoUser(usersService.usersToDto(userSaved)).token(jwtToken).build();
    }

    public static String shortUUID() {
        UUID uuid = UUID.randomUUID();
        long l = ByteBuffer.wrap(uuid.toString().getBytes()).getLong();
        return Long.toString(l, Character.MAX_RADIX);
    }
}
