package com.kltn.motelbe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kltn.motelbe.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	Optional<User> findByEmail(String email);
	
	Optional<User> findByUsername(String username);
	
    Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByIdIn(List<Long> userIds);
    
    Boolean existsByUsername(String email);

    Boolean existsByEmail(String email);
}
