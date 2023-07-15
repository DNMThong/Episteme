package com.episteme.api.services;

import com.episteme.api.entity.SocialNetwork;
import com.episteme.api.entity.SocialNetworkPK;
import com.episteme.api.repository.SocialNetworkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SocialNetworkService implements SocialNetworkServiceImpl {
    private static final Logger logger = LoggerFactory.getLogger(SocialNetworkService.class);

    @Autowired
    private SocialNetworkRepository repository;

    @Override
    public boolean save(SocialNetwork socialNetwork) {
        try {
            repository.save(socialNetwork);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean update(SocialNetwork socialNetwork) {
        try {
            repository.save(socialNetwork);
            repository.flush();
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(SocialNetworkPK id) {
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
    public List<SocialNetwork> findAll() {
        return repository.findAll();
    }

    @Override
    public SocialNetwork findById(SocialNetworkPK id) {
        Optional<SocialNetwork> users = repository.findById(id);
        return users.orElse(null);
    }
}
