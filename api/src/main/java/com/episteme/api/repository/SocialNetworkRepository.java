package com.episteme.api.repository;

import com.episteme.api.entity.SocialNetwork;
import com.episteme.api.entity.SocialNetworkPK;
import com.episteme.api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SocialNetworkRepository extends JpaRepository<SocialNetwork, SocialNetworkPK> {
    @Query("select sn.followerUser from SocialNetwork sn where sn.followingUser.userId = ?1")
    List<Users> findAllFollowerNetworkByUserId(String userId);

    @Query("select sn.followingUser from SocialNetwork sn where sn.followerUser.userId = ?1")
    List<Users> findAllFollowingNetworkByUserId(String userId);
}
