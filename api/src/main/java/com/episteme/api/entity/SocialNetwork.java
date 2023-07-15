package com.episteme.api.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "social_network")
public class SocialNetwork {
    @EmbeddedId
    private SocialNetworkPK id;

    @ManyToOne
    @JoinColumn(name = "followers", insertable = false, updatable = false)
    private Users followerUser;

    @ManyToOne
    @JoinColumn(name = "following", insertable = false, updatable = false)
    private Users followingUser;
}
