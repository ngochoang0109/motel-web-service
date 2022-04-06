package com.kltn.motelbe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kltn.motelbe.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
	
}
