package com.episteme.api.repository;

import com.episteme.api.entity.PostsCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostsCategoriesRepository extends JpaRepository<PostsCategories, > {
}
