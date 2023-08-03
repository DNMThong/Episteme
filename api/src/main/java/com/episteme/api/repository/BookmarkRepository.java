package com.episteme.api.repository;

import com.episteme.api.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    @Query("select bm from Bookmark bm where bm.user.userId = ?1")
    List<Bookmark> findBookmarkByUserId(String userId);

    @Query("select bm from Bookmark bm where bm.post.postId = ?1 and bm.user.userId = ?2 ")
    Optional<Bookmark> findByPostAndUser(Long postId,String userId);
}
