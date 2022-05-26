package com.kltn.motelbe.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kltn.motelbe.entity.Accommodation;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long>{
	
	@Query("SELECT a FROM Accommodation a WHERE "
			+ "a.post.approved=true and "
			+ "a.post.reject=false")
	Page<Accommodation> getPosts(Pageable pageable);
	
	@Query("SELECT a FROM Accommodation a WHERE "
			+ "a.post.approved=true and a.post.reject=false and "
			+ "a.post.typePost.shortName like %:type% and "
			+ "a.address like %:address%")
	Page<Accommodation> getPostsByProperties(Pageable pageable, @Param("type") String type, 
													@Param("address") String address);
	
	@Query("SELECT a FROM Accommodation a WHERE "
			+ "a.post.approved=true and a.post.reject=false and "
			+ "a.post.typePost.shortName=:type")
	Page<Accommodation> getPostsByType(Pageable pageable, @Param("type") String type);
	
	@Query("SELECT a FROM Accommodation a WHERE "
			+ "a.post.approved=true and a.post.reject=false and "
			+ "a.address like %:address%")
	Page<Accommodation> getPostsContainAddress(Pageable pageable, @Param("address") String address);

}
