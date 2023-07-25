package com.episteme.api.services;

import com.episteme.api.entity.*;
import com.episteme.api.entity.dto.*;
import com.episteme.api.exceptions.CustomExceptionHandler;
import com.episteme.api.exceptions.DuplicateRecordException;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.PostRepository;
import com.episteme.api.repository.PostsCategoriesRepository;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CategoriesServiceImpl categoriesService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UsersServiceImpl usersService;
    @Autowired
    private PostsCategoriesServiceImpl postsCategoriesService;
    @Autowired
    private PostsCategoriesRepository postsCategoriesRepository;



    public PostDto savePostWithCategories(PostDto postDto, Users userId) {
        if(checkForDuplicateRecordSave(postDto)) {
            throw new DuplicateRecordException("Có vẻ slug của bạn đã bị trùng với slug của một bài đăng nào đó!!");
        }
        Post post = dtoToPost(postDto);
                    post.setCreateAt(LocalDateTime.now());
                    post.setUser(userId);
        Post savePost = this.postRepository.save(post);
        List<Categories> categories = new ArrayList<>();
        postDto.getCategories().forEach(c -> categories.add(categoriesService.findByIdCategories(c.getId())));
        savePostCategoriesForPost(categories, savePost);
        return this.postDto(savePost);
    }

    public PostDto updatePostWithCategories(PostDto postDto, Users userId, Long postId) {
        // Kiểm tra nếu bài đăng không tồn tại thì không tiến hành cập nhật
        Post existingPost = postRepository.findById(postId).orElse(null);
        if (existingPost == null) {
            throw new NotFoundException("Không tìm thấy bài đăng với ID: " + postId);
        }
        if(checkForDuplicateRecordUpdate(postDto, postId)) {
            throw new DuplicateRecordException("Có vẻ slug của bạn đã bị trùng với slug của một bài đăng nào đó!!");
        }
        // Cập nhật thông tin bài đăng từ PostDto
        existingPost.setTitle(postDto.getTitle());
        existingPost.setSlug(postDto.getSlug());
        existingPost.setContent(postDto.getContent());
        existingPost.setSummary(postDto.getSummary());
        existingPost.setCreateAt(postDto.getCreateAt());
        existingPost.setUpdateAt(LocalDateTime.now());
        existingPost.setStatus(postDto.getStatus());
        existingPost.setUser(userId);
        // Lưu bài đăng đã cập nhật vào cơ sở dữ liệu
        Post updatedPost = postRepository.save(existingPost);
        List<Categories> categories = new ArrayList<>();
        postDto.getCategories().forEach(c -> categories.add(categoriesService.findByIdCategories(c.getId())));
        postsCategoriesService.deleteAllByPost(updatedPost);
        savePostCategoriesForPost(categories, existingPost);
        return this.postDto(updatedPost);
    }
    public void deletePost(Long postId, String userId) {
        // Kiểm tra nếu bài đăng không tồn tại thì không tiến hành xóa
        Post existingPost = postRepository.findById(postId).orElse(null);
        if (existingPost == null) {
            throw new NotFoundException("Không tìm thấy bài đăng với ID: " + postId);
        }

        if (!existingPost.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Bạn không có quyền xóa bài đăng này.");
        }
        // Xóa tất cả các liên kết giữa bài đăng và danh mục
        postsCategoriesService.deleteAllByPost(existingPost);

        // Xóa bài đăng
        postRepository.delete(existingPost);
    }

    @Override
    public PostDto save(PostDto postDto) {
        return null;
    }

    @Override
    public PostDto update(PostDto postDto, Long aLong) {
        return null;
    }

    @Override
    public void delete(Long id) {
        Post existingPost = postRepository.findById(id).orElse(null);
        if (existingPost == null) {
            throw new NotFoundException("Không tìm thấy bài đăng với ID: " + id);
        }
        postsCategoriesService.deleteAllByPost(existingPost);
        // Xóa bài đăng
        postRepository.delete(existingPost);
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
    public void savePostCategoriesForPost(List<Categories> categories, Post post) {
        List<PostsCategories> postCategories = new ArrayList<>();
        // Tạo danh sách các liên kết giữa post và category
        for (Categories category : categories) {
            PostsCategoriesDto postCategoryDto = new PostsCategoriesDto();
            postCategoryDto.setPost(post);
            postCategoryDto.setCategories(category);
            PostsCategories postsCategories = new PostsCategories(new PostsCategoriesPK(post, category), post, category);
            postCategories.add(postsCategories);
        }
        // Lưu tất cả liên kết vào bảng "postcategories" một lần
        postsCategoriesService.saveAllPostCategories(postCategories);
    }

    private boolean checkForDuplicateRecordSave(PostDto postDto) {
        String slug = postDto.getSlug();

        Optional<Post> existingPostOptional = postRepository.findBySlug(slug);

        return existingPostOptional.isPresent();
    }
    private boolean checkForDuplicateRecordUpdate(PostDto postDto, Long postId) {
        String slug = postDto.getSlug();

        // Thực hiện truy vấn trong cơ sở dữ liệu để kiểm tra xem slug đã tồn tại hay chưa
        Optional<Post> existingPostOptional = postRepository.findBySlug(slug);

        if (existingPostOptional.isPresent()) {
            Post existingPost = existingPostOptional.get();
            // Nếu slug mới không trùng với slug hiện tại của bài post và cũng không trùng với chính ID của bài post
            // Slug mới bị trùng với một post khác, không cho phép cập nhật
            return existingPost.getPostId() != (postId);
        }

        // Nếu không có slug nào bị trùng hoặc chỉ trùng với chính bài post hiện tại
        return false;
    }
}
