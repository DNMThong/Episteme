package com.episteme.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonBackReference
    private Users user;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "summary", nullable = true, length = 255)
    private String summary;

    @Column(name = "content", nullable = false, length = -1)
    private String content;

    @Column(name = "slug", nullable = false, length = 255)
    private String slug;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;

    @Column(name = "update_at", nullable = false)
    private LocalDateTime updateAt;

    @Column(name = "status", nullable = true, length = -1)
    private String status;

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private List<PostsCategories> categoriesList;

    public Post(long postId, Users user, String title, String summary, String content, String slug, LocalDateTime createAt, LocalDateTime updateAt, String status) {
        this.postId = postId;
        this.user = user;
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.slug = slug;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.status = status;
    }
}
