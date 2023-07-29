package com.episteme.api.repository;

import com.episteme.api.entity.Post;
import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.entity.enums.PostStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("select p from Post p where p.user.userId = ?1")
    List<Post> findAllPostByUserId(String userId);
    @Query("select o  from Post o where  o.title like %?1% or o.summary like %?1% ")
    List<Post> findByKeywords(String keywords);

    @Query("select p from Post p where p.slug = ?1")
    Optional<Post> findBySlug(String slug);
    List<Post> findByStatus(PostStatus postStatus);

    @Modifying
    @Transactional
    @Query(value = "update post p set p.view = p.view + 1 where p.post_id = ?1", nativeQuery = true)
    void autoIncreaseViews(Long postId);
}
