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
    @Id
    @ManyToOne
    @JoinColumn(name = "followers", referencedColumnName = "user_id", insertable = false, updatable = false)
    private Users followerUser;

    @Id
    @ManyToOne
    @JoinColumn(name = "following", referencedColumnName = "user_id", insertable = false, updatable = false)
    private Users followingUser;
}
