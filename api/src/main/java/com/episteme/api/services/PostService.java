package com.episteme.api.services;

import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.response.PostResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface PostService extends IService<PostDto, Long> {
    PostResponse getAllPosts(Integer pageNumber,Integer pageSize, String sortBy, String sortDir);


    List<PostDto> findAllDraftByUserId(String userId);
}
