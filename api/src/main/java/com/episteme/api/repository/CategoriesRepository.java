package com.episteme.api.repository;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.PostsCategories;
import com.episteme.api.entity.dto.CategoriesDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Integer> {
    Optional<Categories> findBySlug(String slug);
    @Query("SELECT c FROM Categories c WHERE c.name LIKE %:name% AND c.slug LIKE :slug")
    List<Categories> findWithParams(String name,String slug);

    @Transactional
    void deleteByCategoryId(Integer categoryId);

}
