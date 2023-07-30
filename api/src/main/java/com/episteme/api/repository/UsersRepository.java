package com.episteme.api.repository;

import com.episteme.api.entity.Post;
import com.episteme.api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {
    Optional<Users> findByEmailAndPasswordNotNull(String username);

    Optional<Users> findByEmailAndPasswordNull(String username);

    @Query("select o  from Users o where  o.fullname like %?1% or o.email like %?1% ")
    List<Users> findByKeywords(String keywords);


}
