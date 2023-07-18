package com.episteme.api.services;

import com.episteme.api.entity.Post;
import com.episteme.api.entity.dto.*;
import com.episteme.api.exceptions.ResourceNotFoundException;
import com.episteme.api.repository.PostRepository;
import com.episteme.api.repository.PostsCategoriesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private UsersServiceImpl usersService;
    @Autowired
    private PostsCategoriesServiceImpl postsCategoriesService;
    @Autowired
    PostsCategoriesRepository postsCategoriesRepository;

    @Override
    public PostDto save(PostDto postDto) {
        Post post = this.dtoToPost(postDto);
        Post savePost = this.postRepository.save(post);
        return this.postDto(savePost);
    }

    @Override
    public PostDto update(PostDto postDto, Long aLong) {
        return null;
    }

    @Override
    public void delete(Long Id) {
        Post post = this.postRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("Post", "Id", String.valueOf(Id)));
        this.postRepository.delete(post);

    }

    @Override
    public List<PostDto> findAll() {
        List<Post> posts = this.postRepository.findAll();
        List<PostDto> postDtos = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtos;
    }

    @Override
    public PostDto findById(Long Id) {
        Post post = this.postRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("Post", "Id", String.valueOf(Id)));
        return this.postDto(post);
    }

    public Post dtoToPost(PostDto postDto) {
        return this.modelMapper.map(postDto, Post.class);
    }

    public PostDto postDto(Post post) {
        PostDto postDto = this.modelMapper.map(post, PostDto.class);
        UsersDto usersDto = this.usersService.findById(post.getUser().getUserId());
        postDto.setUser(usersDto);

        List<CategoriesDto> categoriesDtoList = this.postsCategoriesService.findAllCategoriesNameByPostId(post.getPostId());
        postDto.setCategories(categoriesDtoList);
        return postDto;
    }

    public List<PostDto> findAllPostByCategoriesSlug(String slug) {
        List<Post> posts = this.postsCategoriesRepository.findPostByCategoriesSlug(slug);
        List<PostDto> postDtoList = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtoList;
    }

    public List<PostDto> findAllPostByUserId(String userId) {
        List<Post> posts = this.postRepository.findAllPostByUserId(userId);
        List<PostDto> postDtoList = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtoList;
    }
}
