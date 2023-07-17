package com.episteme.api.controller;

import com.episteme.api.entity.*;
import com.episteme.api.repository.PostsCategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Controller
public class TestSavePostCategory {
    @Autowired
    private PostsCategoriesRepository repository;

    @GetMapping("/test")
    public String testCreate() {
        Users users = new Users("123456asd", "Trần Thị Hà Vi", "havi@example.com", "password123", "image1.jpg", LocalDate.now(), "Năm tháng ấy trôi qua thật nhanh", LocalDateTime.now(), LocalDateTime.now(), "token", true, "active");
        Post post = new Post(1, users, "IT đã không còn là vua của mọi nghề nữa rồi ...", "Đôi dòng tâm sự dành cho người anh ..", "<div _ngcontent-serverapp-c88", "https://spiderum.com/bai-dang/IT-da-khong-con-la-vua-cua-moi-nghe-nua-roi-dedHFDWy5X1X", LocalDateTime.now(), LocalDateTime.now(), "Published");
        Categories categories = new Categories(1, "title", "slug");

        repository.save(new PostsCategories(new PostsCategoriesPK(post, categories), post, categories));
        return "index";
    }
}
