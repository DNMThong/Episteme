package com.episteme.api.services;

import com.episteme.api.entity.Categories;
import com.episteme.api.entity.dto.CategoriesDto;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.CategoriesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriesServiceImpl implements CategoriesService {
    @Autowired
    private CategoriesRepository categoriesRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoriesDto save(CategoriesDto categoriesDto) {
        Categories categories = this.dtoToCategories(categoriesDto);
        Categories saveCategory = this.categoriesRepository.save(categories);
        return this.categoriesToDto(saveCategory);
    }

    @Override
    public CategoriesDto update(CategoriesDto categories, Integer integer) {
        // Tu viet sau chua thong nhat duoc Dto
        return null;
    }

    @Override
    public void delete(Integer id) {
        Categories categories = this.categoriesRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find category id: " + id));
        this.categoriesRepository.delete(categories);
    }

    @Override
    public List<CategoriesDto> findAll() {
        List<Categories> categories = this.categoriesRepository.findAll();
        List<CategoriesDto> categoriesDtos = categories.stream().map(category -> this.categoriesToDto(category)).collect(Collectors.toList());
        return categoriesDtos;
    }

    @Override
    public CategoriesDto findById(Integer id) {
        Categories categories = this.categoriesRepository.findById(id).orElseThrow(() -> new NotFoundException("Can't find category id: " + id));
        return this.categoriesToDto(categories);
    }

    public Categories dtoToCategories(CategoriesDto categoriesDto) {
        return this.modelMapper.map(categoriesDto, Categories.class);
    }

    public CategoriesDto categoriesToDto(Categories category) {
        return this.modelMapper.map(category, CategoriesDto.class);
    }
}
