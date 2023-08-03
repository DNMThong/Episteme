package com.episteme.api.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.episteme.api.entity.Bookmark;
import com.episteme.api.entity.Post;
import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.BookmarkDto;
import com.episteme.api.entity.dto.PostDto;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.DuplicateRecordException;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.BookmarkRepository;
import com.episteme.api.repository.PostRepository;

@Service
public class BookmarkServiceImpl implements BookmarkService {
	@Autowired
	private BookmarkRepository bookmarkRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UsersServiceImpl usersService;
	@Autowired
	private PostServiceImpl postService;
	@Autowired
	private PostRepository postRepository;

	@Override
	public BookmarkDto save(BookmarkDto bookmarkDto) {
		Bookmark bookmark = this.dtoToBookmark(bookmarkDto);
		Bookmark saveBookmark = this.bookmarkRepository.save(bookmark);
		return this.bookmarkToDto(saveBookmark);
	}

	public BookmarkDto savePost(BookmarkDto bookmarkDto, long postId, String userId) {
		Bookmark bookmark = this.dtoToBookmark(bookmarkDto);
		Users user = usersService.findByIdUser("123456asd");
		// check exist post
		Post existingPost = postRepository.findById(postId)
				.orElseThrow(() -> new NotFoundException("Can't find post has id: " + postId));
		// check saved post
		Bookmark checkBookmark = bookmarkRepository.findBookmarkByPostId(postId, userId);
		if (checkBookmark != null) {
			throw new DuplicateRecordException("Bạn đã lưu post này");
		} else {
			bookmark.setUser(user);
			bookmark.setPost(existingPost);
			bookmark.setSaveTime(LocalDateTime.now());
		}
		Bookmark saveBookmark = this.bookmarkRepository.save(bookmark);
		return this.bookmarkToDto(saveBookmark);
	}

	@Override
	public void delete(Long bookmarkId) {
		Bookmark bookmark = this.bookmarkRepository.findById(bookmarkId)
				.orElseThrow(() -> new NotFoundException("Can't find bookmark id: " + bookmarkId));
		this.bookmarkRepository.delete(bookmark);
	}

	public List<BookmarkDto> findBookmarkByUserId(String userId) {
		List<Bookmark> bookmarkList = bookmarkRepository.findBookmarkByUserId(userId);
		List<BookmarkDto> bookmarkDtoList = bookmarkList.stream().map(bookmark -> bookmarkToDto(bookmark))
				.collect(Collectors.toList());
		return bookmarkDtoList;
	}

	public Bookmark dtoToBookmark(BookmarkDto bookmarkDto) {
		return this.modelMapper.map(bookmarkDto, Bookmark.class);
	}

	public BookmarkDto bookmarkToDto(Bookmark bookmark) {
		BookmarkDto bookmarkDto = new BookmarkDto();
		bookmarkDto.setId(bookmark.getBookmarkId());
		bookmarkDto.setSaveTime(bookmark.getSaveTime());
		// Nạp và đặt giá trị cho usersDto
		UsersDto usersDto = this.usersService.findById(bookmark.getUser().getUserId()); // Ví dụ: userService là service
																						// để lấy thông tin users
		bookmarkDto.setUser(usersDto);

		// Nạp và đặt giá trị cho postDto
		PostDto postDto = this.postService.findById(bookmark.getPost().getPostId()); // Ví dụ: postService là service để
																						// lấy thông tin post
		bookmarkDto.setPost(postDto);

		return bookmarkDto;
	}

	@Override
	public BookmarkDto update(BookmarkDto bookmarkDto, Long aLong) {
		return null;
	}

	@Override
	public List<BookmarkDto> findAll() {
		return null;
	}

	@Override
	public BookmarkDto findById(Long aLong) {
		return null;
	}
}
