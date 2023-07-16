package com.episteme.api.services;

import com.episteme.api.entity.SocialNetwork;
import com.episteme.api.entity.SocialNetworkPK;
import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.SocialNetworkDto;
import com.episteme.api.repository.SocialNetworkRepository;
import com.episteme.api.repository.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface SocialNetworkService extends IService<SocialNetworkDto, SocialNetworkPK> {
}
