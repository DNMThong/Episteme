package com.episteme.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", nullable = false)
    private long postId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "title", nullable = true, length = 255)
    private String title;

    @Column(name = "slug", nullable = true, length = 255)
    private String slug;

    @Column(name = "content", nullable = true, length = -1)
    private String content;

    @Column(name = "summary", nullable = true, length = 255)
    private String summary;

    @Column(name = "create_at", nullable = true)
    private LocalDateTime createAt;

    @Column(name = "update_at", nullable = true)
    private LocalDateTime updateAt;

    @Column(name = "status", nullable = true, length = -1)
    private String status;

    @OneToMany(mappedBy = "post")
    private List<PostsCategories> categoriesList;
}
