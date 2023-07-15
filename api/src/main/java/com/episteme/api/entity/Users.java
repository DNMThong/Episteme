package com.episteme.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class Users {
    @Id
    @Column(name = "user_id", nullable = false, length = 18)
    private String userId;

    @Column(name = "fullname", nullable = false, length = 255)
    private String fullname;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "password", nullable = false, length = -1)
    private String password;

    @Column(name = "image", nullable = true, length = -1)
    private String image;

    @Column(name = "birthday", nullable = true)
    private LocalDate birthday;

    @Column(name = "description", nullable = true, length = -1)
    private String description;

    @Column(name = "registered_at", nullable = false)
    private LocalDateTime registeredAt;

    @Column(name = "last_login", nullable = false)
    private LocalDateTime lastLogin;

    @Column(name = "token", nullable = true, length = -1)
    private String token;

    @Column(name = "role", nullable = false)
    private boolean role;

    @Column(name = "status", nullable = true, length = -1)
    private String status;

    @OneToMany(mappedBy = "user")
    List<Bookmark> users;

    @OneToMany(mappedBy = "user")
    List<Post> posts;

    @OneToMany(mappedBy = "followerUser")
    List<SocialNetwork> followerList;

    @OneToMany(mappedBy = "followingUser")
    List<SocialNetwork> followingList;

}
