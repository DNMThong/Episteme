package com.episteme.api.services;

import com.episteme.api.entity.SocialNetwork;
import com.episteme.api.entity.SocialNetworkPK;
import com.episteme.api.entity.Users;
import com.episteme.api.entity.dto.SocialNetworkDto;
import com.episteme.api.entity.dto.UsersDto;
import com.episteme.api.exceptions.NotFoundException;
import com.episteme.api.repository.SocialNetworkRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SocialNetworkServiceImpl implements SocialNetworkService {
    @Autowired
    private SocialNetworkRepository socialNetworkRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UsersServiceImpl usersService;

    public SocialNetworkDto save(SocialNetworkDto socialNetworkDto) {
        SocialNetwork socialNetwork = this.dtoToSocialNetwork(socialNetworkDto);
        SocialNetwork saveSocialNetwork = this.socialNetworkRepository.save(socialNetwork);
        return this.socialNetworkToDto(saveSocialNetwork);
    }

    @Override
    public void delete(SocialNetworkPK Id) {
        SocialNetwork socialNetwork = this.socialNetworkRepository.findById(Id).orElseThrow(() -> new NotFoundException("Can't find Social Network"));
        this.socialNetworkRepository.delete(socialNetwork);
    }

    public List<UsersDto> findAllFollowerByUserId(String userId) {
        List<Users> users = socialNetworkRepository.findAllFollowerNetworkByUserId(userId);
        List<UsersDto> usersDtoList = users.stream().map(post -> usersService.usersToDto(post)).collect(Collectors.toList());
        return usersDtoList;
    }

    public List<UsersDto> findAllFollowingByUserId(String userId) {
        List<Users> users = socialNetworkRepository.findAllFollowingNetworkByUserId(userId);
        List<UsersDto> usersDtoList = users.stream().map(post -> usersService.usersToDto(post)).collect(Collectors.toList());
        return usersDtoList;
    }

    public SocialNetwork dtoToSocialNetwork(SocialNetworkDto socialNetworkDto) {
        return this.modelMapper.map(socialNetworkDto, SocialNetwork.class);
    }

    public SocialNetworkDto socialNetworkToDto(SocialNetwork socialNetwork) {
        return modelMapper.map(socialNetwork, SocialNetworkDto.class);
    }

    @Override
    public SocialNetworkDto update(SocialNetworkDto socialNetworkDto, SocialNetworkPK socialNetworkPK) {
        return null;
    }

    @Override
    public List<SocialNetworkDto> findAll() {
        return null;
    }

    @Override
    public SocialNetworkDto findById(SocialNetworkPK socialNetworkPK) {
        return null;
    }
}
