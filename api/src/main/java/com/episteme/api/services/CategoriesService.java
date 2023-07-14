package com.episteme.api.services;

import com.episteme.api.entity.Categories;
import com.episteme.api.repository.CategoriesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriesService implements CategoriesServiceImpl {
    private static final Logger logger = LoggerFactory.getLogger(CategoriesService.class);

    @Autowired
    private CategoriesRepository repository;

    @Override
    public boolean save(Categories categories) {
        try {
            repository.save(categories);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(Categories categories) {
        try {
            repository.save(categories);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(Integer id) {
        try {
            repository.deleteById(id);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public List<Categories> findAll() {
        return repository.findAll();
    }

    @Override
    public Categories findById(Integer id) {
        Optional<Categories> categories = repository.findById(id);
        return categories.orElse(null);
    }
}
