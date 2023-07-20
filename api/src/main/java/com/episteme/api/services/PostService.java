package com.episteme.api.services;

import com.episteme.api.entity.dto.PostDto;
import org.springframework.stereotype.Component;

@Component
public interface PostService extends IService<PostDto, Long> {
}
