package com.episteme.api.services;

import com.episteme.api.entity.Comment;
import com.episteme.api.entity.dto.CommentDto;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.CommentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UsersServiceImpl usersService;

    @Override
    public CommentDto save(CommentDto commentDto) {
        Comment comment = this.dtoToComment(commentDto);
        Comment saveBookmark = this.commentRepository.save(comment);
        return this.commentToDto(saveBookmark);
    }

    @Override
    public CommentDto update(CommentDto comment, Long commentId) {
        return null;
    }

    @Override
    public void delete(Long id) {
        Comment comment = this.commentRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find comment id: " + id));
        this.commentRepository.delete(comment);
    }

    @Override
    public List<CommentDto> findAll() {
        List<Comment> comments = this.commentRepository.findAll();
        List<CommentDto> commentDtos = comments.stream().map(comment -> this.commentToDto(comment)).collect(Collectors.toList());
        return commentDtos;
    }

    public List<CommentDto> findAllCommentByPostId(Long postId) {
        List<Comment> comments = commentRepository.findAllCommentByPostId(postId);
        List<CommentDto> commentDtoList = comments.stream().map(comment -> commentToDto(comment)).collect(Collectors.toList());
        return commentDtoList;
    }

    @Override
    public CommentDto findById(Long id) {
        Comment comment = this.commentRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find comment id: " + id));
        return this.commentToDto(comment);
    }

    public Comment dtoToComment(CommentDto commentDto) {
        return this.modelMapper.map(commentDto, Comment.class);
    }

    public CommentDto commentToDto(Comment comment) {
        CommentDto commentDto = modelMapper.map(comment, CommentDto.class);
        UsersDto usersDto = usersService.findById(comment.getUser().getUserId());
        commentDto.setUser(usersDto);
        return commentDto;
    }

}
