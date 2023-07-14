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
    @JoinColumn(name = "category_id",referencedColumnName = "category_id", insertable = false, updatable = false)
    Categories category;

    @Id
    @ManyToOne
    @JoinColumn(name = "post_id",referencedColumnName = "post_id", insertable = false, updatable = false)
    Post post;
}
