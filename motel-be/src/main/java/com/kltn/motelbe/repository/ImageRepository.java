package com.kltn.motelbe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kltn.motelbe.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{

}
