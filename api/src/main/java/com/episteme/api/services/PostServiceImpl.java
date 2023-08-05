package com.episteme.api.services;

import com.episteme.api.entity.*;
import com.episteme.api.entity.dto.*;
import com.episteme.api.entity.enums.PostStatus;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.PostRepository;
import com.episteme.api.repository.PostsCategoriesRepository;
import com.episteme.api.response.PostResponse;
import com.github.slugify.Slugify;
import jakarta.servlet.http.HttpSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    @Autowired
    private HttpSession session;


    public PostDto savePostWithCategories(PostDto postDto, String userId) {
        Post post = dtoToPost(postDto);
        Users user = usersService.findByIdUser(userId);
        post.setCreateAt(LocalDateTime.now());
        post.setUpdateAt(LocalDateTime.now());
        post.setSlug("slug");
        post.setView(0L);
        post.setUser(user);

        Post savePost = this.postRepository.save(post);
        convertSlugAndSave(post, savePost);

        List<Categories> categories = new ArrayList<>();
        postDto.getCategories().forEach(c -> categories.add(categoriesService.findByIdCategories(c.getId())));
        savePostCategoriesForPost(categories, savePost);
        return this.postDto(savePost);
    }

    public PostDto updatePostWithCategories(PostDto postDto, Long postId) {
        // Kiểm tra nếu bài đăng không tồn tại thì không tiến hành cập nhật
        Post existingPost = postRepository.findById(postId).orElseThrow(() ->
                new NotFoundException("Không tìm thấy bài đăng với ID: " + postId)
        );
        // Cập nhật thông tin bài đăng từ PostDto
        existingPost.setTitle(postDto.getTitle());
        existingPost.setContent(postDto.getContent());
        existingPost.setSummary(postDto.getSummary());
        existingPost.setUpdateAt(LocalDateTime.now());
        existingPost.setStatus(postDto.getStatus());

        Post updatedPost = postRepository.save(existingPost);
        convertSlugAndSave(existingPost, updatedPost);

        List<Categories> categories = new ArrayList<>();
        postDto.getCategories().forEach(c -> categories.add(categoriesService.findByIdCategories(c.getId())));
        postsCategoriesService.deleteAllByPost(updatedPost);
        savePostCategoriesForPost(categories, existingPost);
        return this.postDto(updatedPost);
    }

    public PostDto createDraft(Long postId) {
        Post existingPost = this.postRepository.findById(postId).orElseThrow(() ->
                new NotFoundException("Không tìm thấy bài đăng với ID: " + postId)
        );
        existingPost.setStatus(PostStatus.Draft);
        Post postDraft = this.postRepository.save(existingPost);

        return this.postDto(postDraft);
    }

    public PostDto updateDraftToNormal(PostDto postDto, Long postId) {
        Post existingPost = postRepository.findById(postId).orElseThrow(() ->
                new NotFoundException("Không tìm thấy bài đăng với ID: " + postId)
        );
        existingPost.setTitle(postDto.getTitle());
        existingPost.setContent(postDto.getContent());
        existingPost.setSummary(postDto.getSummary());
        existingPost.setUpdateAt(LocalDateTime.now());
        existingPost.setStatus(PostStatus.Published);

        Post updatedDraftPost = postRepository.save(existingPost);
        convertSlugAndSave(existingPost, updatedDraftPost);

        List<Categories> categories = new ArrayList<>();
        postDto.getCategories().forEach(c -> categories.add(categoriesService.findByIdCategories(c.getId())));
        postsCategoriesService.deleteAllByPost(updatedDraftPost);
        savePostCategoriesForPost(categories, existingPost);
        return this.postDto(updatedDraftPost);
    }

    public List<PostDto> findALlDraftPost() {
        List<Post> posts = this.postRepository.findByStatus(PostStatus.Draft);
        List<PostDto> postDtos = posts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        return postDtos;
    }

    public void deletePost(Long postId, String userId) {
        // Kiểm tra nếu bài đăng không tồn tại thì không tiến hành xóa
        Post existingPost = postRepository.findById(postId).orElseThrow(() -> {
            throw new NotFoundException("Không tìm thấy bài đăng với ID: " + postId);
        });

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
            postDto.setThumbnail(post.getImage());
            postDto.setCreateAt(post.getCreateAt());
            postDto.setUpdateAt(post.getUpdateAt());
            postDto.setStatus(post.getStatus());
            postDto.setView(post.getView());
            postDto.setTotal_comment(post.getCommentList()==null ? 0 : post.getCommentList().size());
            postDto.setTotal_bookmark(post.getBookmarkList()==null ? 0 : post.getBookmarkList().size());
//            UsersDto usersDto = this.usersService.findById(post.getUser().getUserId());
            postDto.setAuthor(modelMapper.map(post.getUser(),AuthorDto.class));
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

    public PostDto findBySlug(String slug) {
        Optional<Post> optional = postRepository.findBySlug(slug);
        Post post = optional.orElseThrow(() -> new NotFoundException("Không tìm thấy post có slug: " + slug));
        return this.postDto(post);
    }

    public void savePostCategoriesForPost(List<Categories> categories, Post post) {
        if (categories == null || post == null) {
            throw new NotFoundException("Không tìm thấy: " + categories + post);
        }
        List<PostsCategories> postsCategories = new ArrayList<>();
        // Tạo danh sách các liên kết giữa post và category
        for (Categories category : categories) {
            PostsCategoriesDto postCategoryDto = new PostsCategoriesDto();
            postCategoryDto.setPost(post);
            postCategoryDto.setCategories(category);
            PostsCategories postCategories = new PostsCategories(new PostsCategoriesPK(post, category), post, category);
            postsCategories.add(postCategories);
        }
        // Lưu tất cả liên kết vào bảng "postcategories" một lần
        postsCategoriesService.saveAllPostCategories(postsCategories);
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

    public static String convertToSlug(String title, Long id) {
        Slugify slugify = new Slugify();
        String slugTitle = slugify.slugify(title);
        String slugId = slugify.slugify(String.valueOf(id));
        return slugTitle + "-" + slugId;
    }

    public void convertSlugAndSave(Post post, Post savePost) {
        String slug = convertToSlug(post.getTitle(), post.getPostId());
        System.out.println(slug);
        savePost.setSlug(slug);
        // Cập nhật bài viết lại để lưu slug mới
        this.postRepository.save(savePost);
    }

    public void autoIncreaseViews(Long postId) {
        List<Long> historyPost = (List<Long>) session.getAttribute("historyPost");
        if (historyPost == null) {
            historyPost = new ArrayList<>();
        }

        boolean postExists = false;
        for (Long id : historyPost) {
            if (id.equals(postId)) {
                postExists = true;
                break;
            }
        }

        if (!postExists) {
            historyPost.add(postId);
            session.setAttribute("historyPost", historyPost);
            postRepository.autoIncreaseViews(postId);
        }
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

        List<PostDto> content = listOfPosts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());

        PostResponse postResponse = new PostResponse();
        postResponse.setContent(content);
        postResponse.setPageNumber(posts.getNumber());
        postResponse.setPageSize(posts.getSize());
        postResponse.setTotalElements(posts.getTotalElements());
        postResponse.setTotalPages(posts.getTotalPages());
        postResponse.setLastPage(posts.isLast());

        return postResponse;
    }

    @Override
    public PostResponse findAllDraftByUserId(String userId, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Post> posts = postRepository.findPostsByStatusDraft(userId, pageable);

        // get content for page object
        List<Post> listOfPosts = posts.getContent();

        List<PostDto> content = listOfPosts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
        PostResponse postResponse = new PostResponse();
        postResponse.setContent(content);
        postResponse.setPageNumber(posts.getNumber());
        postResponse.setPageSize(posts.getSize());
        postResponse.setTotalElements(posts.getTotalElements());
        postResponse.setTotalPages(posts.getTotalPages());
        postResponse.setLastPage(posts.isLast());
        return postResponse;
    }

    public PostResponse findByType(Integer pageNumber, Integer pageSize, String type) {
        if (type.equals("newest")) {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);

            Page<Post> posts = postRepository.findPostByNewest(pageable);

            // get content for page object
            List<Post> listOfPosts = posts.getContent();

            List<PostDto> content = listOfPosts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());
            PostResponse postResponse = new PostResponse();
            postResponse.setContent(content);
            postResponse.setPageNumber(posts.getNumber());
            postResponse.setPageSize(posts.getSize());
            postResponse.setTotalElements(posts.getTotalElements());
            postResponse.setTotalPages(posts.getTotalPages());
            postResponse.setLastPage(posts.isLast());
            return postResponse;
        } else if (type.equals("popular")) {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);

            Page<Post> posts = postRepository.findPostsPopular(pageable);

            // get content for page object
            List<Post> listOfPosts = posts.getContent();

            List<PostDto> content = listOfPosts.stream().map(post -> this.postDto(post)).collect(Collectors.toList());

            PostResponse postResponse = new PostResponse();
            postResponse.setContent(content);
            postResponse.setPageNumber(posts.getNumber());
            postResponse.setPageSize(posts.getSize());
            postResponse.setTotalElements(posts.getTotalElements());
            postResponse.setTotalPages(posts.getTotalPages());
            postResponse.setLastPage(posts.isLast());
            return postResponse;
        } else {
            throw new NotFoundException("Không tìm thấy Posts theo Type");
        }
    }
}