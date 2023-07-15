package com.episteme.api.services;

import com.episteme.api.entity.Bookmark;
import com.episteme.api.entity.dto.BookmarkDto;
import com.episteme.api.exceptions.ResourceNotFoundException;
import com.episteme.api.repository.BookmarkRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class BookmarkServiceImpl implements  BookmarkService{
    @Autowired
    BookmarkRepository bookmarkRepository;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public BookmarkDto save(BookmarkDto bookmarkDto) {
        Bookmark bookmark=this.dtoToBookmark(bookmarkDto);
        Bookmark saveBookmark = this.bookmarkRepository.save(bookmark);
        return this.bookmarkToDto(saveBookmark);
    }

    @Override
    public BookmarkDto update(BookmarkDto bookmarkDto, Long bookmarkId) {
        Bookmark bookmark=this.bookmarkRepository.findById(bookmarkId).orElseThrow(()-> new ResourceNotFoundException("Bookmark","Id",String.valueOf(bookmarkId)));
        bookmark.setPost(bookmarkDto.getPost());
        bookmark.setUser(bookmarkDto.getUser());
        bookmark.setSaveTime(bookmarkDto.getSaveTime());
        Bookmark updateBookmark = this.bookmarkRepository.save(bookmark);
        BookmarkDto bookmarkDto1 = this.bookmarkToDto(updateBookmark);
        return bookmarkDto1;
    }

    @Override
    public void delete(Long bookmarkId) {
        Bookmark bookmark=this.bookmarkRepository.findById(bookmarkId).orElseThrow(()-> new ResourceNotFoundException("Bookmark","Id",String.valueOf(bookmarkId)));
        this.bookmarkRepository.delete(bookmark);
    }

    @Override
    public List<BookmarkDto> findAll() {
        List<Bookmark> bookmarks = this.bookmarkRepository.findAll();
        List<BookmarkDto> bookmarkDtos =bookmarks.stream().map(bookmark -> this.bookmarkToDto(bookmark)).collect(Collectors.toList());
        return bookmarkDtos;
    }

    @Override
    public BookmarkDto findById(Long bookmarkId) {
        Bookmark bookmark=this.bookmarkRepository.findById(bookmarkId).orElseThrow(()-> new ResourceNotFoundException("Bookmark","Id",String.valueOf(bookmarkId)));
        return this.bookmarkToDto(bookmark);
    }
    public Bookmark dtoToBookmark(BookmarkDto bookmarkDto){
        return this.modelMapper.map(bookmarkDto,Bookmark.class);
    }
    public BookmarkDto bookmarkToDto(Bookmark bookmark){
        return this.modelMapper.map(bookmark,BookmarkDto.class);
    }
}
