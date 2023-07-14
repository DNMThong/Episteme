package com.episteme.api.services;

import com.episteme.api.entity.Users;
import com.episteme.api.repository.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService implements UsersServiceImpl {
    private static final Logger logger = LoggerFactory.getLogger(UsersService.class);

    @Autowired
    private UsersRepository repository;

    @Override
    public boolean save(Users users) {
        try {
            repository.save(users);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(Users users) {
        try {
            repository.save(users);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(String id) {
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
    public List<Users> findAll() {
        return repository.findAll();
    }

    @Override
    public Users findById(String id) {
        Optional<Users> users = repository.findById(id);
        return users.orElse(null);
    }
}
