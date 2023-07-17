package com.episteme.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonManagedReference
    List<Bookmark> users;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    List<Post> posts;

    @OneToMany(mappedBy = "followerUser")
    @JsonManagedReference
    List<SocialNetwork> followerList;

    @OneToMany(mappedBy = "followingUser")
    @JsonManagedReference
    List<SocialNetwork> followingList;

    public Users(String userId, String fullname, String email, String password, String image, LocalDate birthday, String description, LocalDateTime registeredAt, LocalDateTime lastLogin, String token, boolean role, String status) {
        this.userId = userId;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.image = image;
        this.birthday = birthday;
        this.description = description;
        this.registeredAt = registeredAt;
        this.lastLogin = lastLogin;
        this.token = token;
        this.role = role;
        this.status = status;
    }
}
