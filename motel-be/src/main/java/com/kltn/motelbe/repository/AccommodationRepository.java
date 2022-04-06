package com.kltn.motelbe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kltn.motelbe.entity.Accommodation;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long>{

}
