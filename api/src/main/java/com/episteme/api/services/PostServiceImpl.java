package com.episteme.api.services;

import com.episteme.api.entity.Post;
import com.episteme.api.entity.dto.*;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.PostRepository;
import com.episteme.api.repository.PostsCategoriesRepository;
import com.episteme.api.response.PostResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UsersServiceImpl usersService;
    @Autowired
    private PostsCategoriesServiceImpl postsCategoriesService;
    @Autowired
    private PostsCategoriesRepository postsCategoriesRepository;

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
    public void delete(Long id) {
        Post post = this.postRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find post id: " + id));
        this.postRepository.delete(post);
    }

    @Override
    public List<PostDto> findAll() {
        List<Post> posts = this.postRepository.findAll();
        List<PostDto> postDtos = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtos;
    }

    @Override
    public PostDto findById(Long id) {
        Post post = this.postRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find post id: " + id));
        return this.postDto(post);
    }

    @Override
    public PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Post> posts = postRepository.findAll(pageable);

        // get content for page object
        List<Post> listOfPosts = posts.getContent();

        List<PostDto> content= listOfPosts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());

        PostResponse postResponse = new PostResponse();
        postResponse.setContent(content);
        postResponse.setPageNumber(posts.getNumber());
        postResponse.setPageSize(posts.getSize());
        postResponse.setTotalElements(posts.getTotalElements());
        postResponse.setTotalPages(posts.getTotalPages());
        postResponse.setLastPage(posts.isLast());
        return postResponse;
    }


    public List<PostDto> findByKeywords(String keywords) {
        if (keywords!=null){
            List<Post> posts=postRepository.findByKeywords(keywords);
            List<PostDto> content= posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
            return content;
        }
        return null;
    }


    public Post dtoToPost(PostDto postDto) {
        return this.modelMapper.map(postDto, Post.class);
    }

    public PostDto postDto(Post post) {
        try {
            PostDto postDto = new PostDto();
            postDto.setId(post.getPostId());
            postDto.setTitle(post.getTitle());
            postDto.setSlug(post.getSlug());
            postDto.setContent(post.getContent());
            postDto.setSummary(post.getSummary());
            postDto.setCreateAt(post.getCreateAt());
            postDto.setUpdateAt(post.getUpdateAt());
            postDto.setStatus(post.getStatus());
            UsersDto usersDto = this.usersService.findById(post.getUser().getUserId());
            postDto.setUser(usersDto);
            List<CategoriesDto> categoriesDtoList = this.postsCategoriesService.findAllCategoriesNameByPostId(post.getPostId());
            postDto.setCategories(categoriesDtoList);
            return postDto;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
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
