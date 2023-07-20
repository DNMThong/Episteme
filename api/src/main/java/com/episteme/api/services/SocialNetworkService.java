package com.episteme.api.services;

import com.episteme.api.entity.SocialNetworkPK;
import com.episteme.api.entity.dto.SocialNetworkDto;
import org.springframework.stereotype.Component;

@Component
public interface SocialNetworkService extends IService<SocialNetworkDto, SocialNetworkPK> {
}
