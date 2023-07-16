package com.episteme.api.services;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.dto.BookmarkDto;
import com.episteme.api.entity.dto.CategoriesDto;
import com.episteme.api.repository.CategoriesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public interface CategoriesService extends IService<CategoriesDto, Integer>{
}

