package com.episteme.api.services;

import com.episteme.api.entity.Bookmark;
import com.episteme.api.entity.SocialNetwork;
import com.episteme.api.entity.SocialNetworkPK;
import com.episteme.api.entity.dto.BookmarkDto;
import com.episteme.api.entity.dto.SocialNetworkDto;
import com.episteme.api.exceptions.ResourceNotFoundException;
import com.episteme.api.repository.PostRepository;
import com.episteme.api.repository.SocialNetworkRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SocialNetworkServiceImpl implements SocialNetworkService {
    @Autowired
    SocialNetworkRepository socialNetworkRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public SocialNetworkDto save(SocialNetworkDto socialNetworkDto) {
        SocialNetwork socialNetwork = this.dtoToSocialNetwork(socialNetworkDto);
        SocialNetwork saveSocialNetwork = this.socialNetworkRepository.save(socialNetwork);
        return this.socialNetworkToDto(saveSocialNetwork);
    }

    @Override
    public SocialNetworkDto update(SocialNetworkDto socialNetworkDto, SocialNetworkPK Id) {
        return null;
    }

    @Override
    public void delete(SocialNetworkPK Id) {
        SocialNetwork socialNetwork = this.socialNetworkRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("SocialNetwork", "Id", String.valueOf(Id)));
        this.socialNetworkRepository.delete(socialNetwork);
    }

    @Override
    public List<SocialNetworkDto> findAll() {
        List<SocialNetwork> socialNetworks = this.socialNetworkRepository.findAll();
        List<SocialNetworkDto> socialNetworkDtos = socialNetworks.stream().map(socialNetwork -> this.socialNetworkToDto(socialNetwork)).collect(Collectors.toList());
        return socialNetworkDtos;
    }

    @Override
    public SocialNetworkDto findById(SocialNetworkPK Id) {
        SocialNetwork socialNetwork = this.socialNetworkRepository.findById(Id).orElseThrow(() -> new ResourceNotFoundException("SocialNetwork", "Id", String.valueOf(Id)));
        return this.socialNetworkToDto(socialNetwork);
    }

    public SocialNetwork dtoToSocialNetwork(SocialNetworkDto socialNetworkDto) {
        return this.modelMapper.map(socialNetworkDto, SocialNetwork.class);
    }

    public SocialNetworkDto socialNetworkToDto(SocialNetwork socialNetwork) {
        return modelMapper.map(socialNetwork, SocialNetworkDto.class);
    }

}
