package com.episteme.api.repository;

import com.episteme.api.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    @Query("select bm from Bookmark bm where bm.user.userId = ?1")
    List<Bookmark> findBookmarkByUserId(String userId);
}
