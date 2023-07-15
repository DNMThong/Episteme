package com.episteme.api.services;

import com.episteme.api.entity.Comment;
import com.episteme.api.entity.dto.CommentDto;
import com.episteme.api.repository.CommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface CommentService extends IService<CommentDto, Long> {
}
