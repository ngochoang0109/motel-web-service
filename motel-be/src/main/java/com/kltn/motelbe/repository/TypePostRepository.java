package com.kltn.motelbe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kltn.motelbe.entity.TypePost;

@Repository
public interface TypePostRepository extends JpaRepository<TypePost, Long>{

}