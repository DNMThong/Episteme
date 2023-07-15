package com.episteme.api.services;

import com.episteme.api.entity.PostsCategories;
import com.episteme.api.entity.PostsCategoriesPK;
import com.episteme.api.repository.PostsCategoriesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostsCategoriesService implements PostsCategoriesServiceImpl {
    private static final Logger logger = LoggerFactory.getLogger(PostsCategoriesService.class);

    @Autowired
    private PostsCategoriesRepository repository;

    @Override
    public boolean save(PostsCategories postsCategories) {
        try {
            repository.save(postsCategories);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(PostsCategories postsCategories) {
        try {
            repository.save(postsCategories);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(PostsCategoriesPK postsCategoriesPK) {
        try {
            repository.deleteById(postsCategoriesPK);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public List<PostsCategories> findAll() {
        return repository.findAll();
    }

    @Override
    public PostsCategories findById(PostsCategoriesPK id) {
        Optional<PostsCategories> PostsCategories = repository.findById(id);
        return PostsCategories.orElse(null);
    }
}
