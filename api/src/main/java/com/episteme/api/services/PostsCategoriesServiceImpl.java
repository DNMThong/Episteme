package com.episteme.api.services;

import com.episteme.api.entity.Bookmark;
import com.episteme.api.entity.Categories;
import com.episteme.api.entity.PostsCategories;
import com.episteme.api.entity.dto.BookmarkDto;
import com.episteme.api.entity.dto.PostsCategoriesDto;
import com.episteme.api.exceptions.ResourceNotFoundException;
import com.episteme.api.repository.BookmarkRepository;
import com.episteme.api.repository.PostsCategoriesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostsCategoriesServiceImpl implements PostsCategoriesService {
    @Autowired
    PostsCategoriesRepository postsCategoriesRepository;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public PostsCategoriesDto save(PostsCategoriesDto postsCategoriesDto) {
        return null;
    }

    @Override
    public PostsCategoriesDto update(PostsCategoriesDto postsCategoriesDto, Categories categories) {
        return null;
    }

    @Override
    public void delete(Categories categories) {
    // k biet viet sao
    }

    @Override
    public List<PostsCategoriesDto> findAll() {
        List<PostsCategories> categories = this.postsCategoriesRepository.findAll();
        List<PostsCategoriesDto> categoriesDtos =categories.stream().map(category -> this.postsCategoriesToDto(category)).collect(Collectors.toList());
        return categoriesDtos;
    }

    @Override
    public PostsCategoriesDto findById(Categories categories) {
     // Khong biet viet
        return null;
    }
    public PostsCategories dtoToPostsCategories(PostsCategoriesDto postsCategoriesDto){
        return this.modelMapper.map(postsCategoriesDto,PostsCategories.class);
    }
    public PostsCategoriesDto postsCategoriesToDto(PostsCategories postsCategories){
        return this.modelMapper.map(postsCategories,PostsCategoriesDto.class);
    }

}
