package com.episteme.api.services;

import com.episteme.api.entity.Bookmark;
import com.episteme.api.entity.Post;
import com.episteme.api.entity.dto.BookmarkDto;
import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.exceptions.ResourceNotFoundException;
import com.episteme.api.repository.BookmarkRepository;
import com.episteme.api.repository.PostRepository;
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
    @Override
    public PostDto save(PostDto postDto) {
        Post post=this.dtoToPost(postDto);
        Post savePost = this.postRepository.save(post);
        return this.postDto(savePost);
    }

    @Override
    public PostDto update(PostDto postDto, Long aLong) {
        return null;
    }

    @Override
    public void delete(Long Id) {
        Post post=this.postRepository.findById(Id).orElseThrow(()-> new ResourceNotFoundException("Post","Id",String.valueOf(Id)));
        this.postRepository.delete(post);

    }

    @Override
    public List<PostDto> findAll() {
        List<Post> posts = this.postRepository.findAll();
        List<PostDto> postDtos =posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtos;
    }

    @Override
    public PostDto findById(Long Id) {
        Post post=this.postRepository.findById(Id).orElseThrow(()-> new ResourceNotFoundException("Post","Id",String.valueOf(Id)));
        return this.postDto(post);
    }
    public Post dtoToPost(PostDto postDto){
        return this.modelMapper.map(postDto,Post.class);
    }
    public PostDto postDto(Post post){
        return this.modelMapper.map(post,PostDto.class);
    }

}
