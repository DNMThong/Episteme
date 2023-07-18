package com.episteme.api.services;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.PostsCategories;
import com.episteme.api.entity.dto.CategoriesDto;
import com.episteme.api.entity.dto.PostsCategoriesDto;
import com.episteme.api.repository.PostsCategoriesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostsCategoriesServiceImpl implements PostsCategoriesService {
    @Autowired
    PostsCategoriesRepository postsCategoriesRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private CategoriesServiceImpl categoriesService;

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
        List<PostsCategoriesDto> categoriesDtos = categories.stream().map(category -> this.postsCategoriesToDto(category)).collect(Collectors.toList());
        return categoriesDtos;
    }

    @Override
    public PostsCategoriesDto findById(Categories categories) {
        // Khong biet viet
        return null;
    }

    public PostsCategories dtoToPostsCategories(PostsCategoriesDto postsCategoriesDto) {
        return this.modelMapper.map(postsCategoriesDto, PostsCategories.class);
    }

    public PostsCategoriesDto postsCategoriesToDto(PostsCategories postsCategories) {
        return this.modelMapper.map(postsCategories, PostsCategoriesDto.class);
    }

    public List<CategoriesDto> findAllCategoriesNameByPostId(Long postId) {
        List<Categories> categoriesList = this.postsCategoriesRepository.findCategoriesByPostId(postId);
        List<CategoriesDto> categoriesDtoList = categoriesList.stream().map(category -> this.categoriesService.categoriesToDto(category)).collect(Collectors.toList());
        return categoriesDtoList;
    }
}
