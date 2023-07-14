package com.episteme.api.services;

import com.episteme.api.entity.Bookmark;
import com.episteme.api.repository.BookmarkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService implements BookmarkServiceImpl {
    private static final Logger logger = LoggerFactory.getLogger(BookmarkService.class);

    @Autowired
    private BookmarkRepository repository;

    @Override
    public boolean save(Bookmark bookmark) {
        try {
            repository.save(bookmark);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(Bookmark bookmark) {
        try {
            repository.save(bookmark);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(Long id) {
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
    public List<Bookmark> findAll() {
        return repository.findAll();
    }

    @Override
    public Bookmark findById(Long id) {
        Optional<Bookmark> bookmark = repository.findById(id);
        return bookmark.orElse(null);
    }
}
