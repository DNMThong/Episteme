package com.episteme.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "posts_categories")
public class PostsCategories {

    @Id
    @ManyToOne
    @JoinColumn(name = "category_id")
    Categories category;

    @Id
    @ManyToOne
    @JoinColumn(name = "post_id")
    Post post;
}
