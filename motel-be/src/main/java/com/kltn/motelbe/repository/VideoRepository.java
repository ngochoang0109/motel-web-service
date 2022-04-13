package com.kltn.motelbe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kltn.motelbe.entity.Video;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long>{

}
