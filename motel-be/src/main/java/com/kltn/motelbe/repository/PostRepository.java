package com.kltn.motelbe.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kltn.motelbe.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
	@Query(
			"SELECT p FROM Post p WHERE p.user.username=:username and p.approved=true"
	)
	Page<Post> getPostsOfUser(Pageable pageable, @Param("username") String username);
}
