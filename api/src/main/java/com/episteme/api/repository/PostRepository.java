package com.episteme.api.repository;

import com.episteme.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("select p from Post p where p.user.userId = ?1")
    List<Post> findAllPostByUserId(String userId);

    @Query("select p from Post p where p.slug = ?1")
    Optional<Post> findBySlug(String slug);
}
