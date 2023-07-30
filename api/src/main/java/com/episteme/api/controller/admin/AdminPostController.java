package com.episteme.api.controller.admin;


import com.episteme.api.services.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/posts")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminPostController {
    @Autowired
    PostServiceImpl postService;
}
