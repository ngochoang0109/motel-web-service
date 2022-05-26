package com.kltn.motelbe.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kltn.motelbe.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
	@Query("SELECT p FROM Post p WHERE p.user.username=:username and p.approved=true and p.reject=false")
	Page<Post> getPostsOfUser(Pageable pageable, @Param("username") String username);

	@Query("SELECT p FROM Post p WHERE p.user.username=:username and p.reject=true")
	Page<Post> getPostsRejectOfUser(Pageable pageable, @Param("username") String username);

	@Query("SELECT p FROM Post p WHERE p.user.username=:username and p.approved=false and p.reject=false")
	Page<Post> getPostsWaitingOfUser(Pageable pageable, @Param("username") String username);

	@Query("SELECT p FROM Post p WHERE p.approved=true and p.reject=false")
	Page<Post> getPosts(Pageable pageable);

	@Query("SELECT p FROM Post p WHERE "
			+ "p.approved=true and p.reject=false and "
			+ "p.typePost.shortName like %:type% and "
			+ "p.accommodation.address like %:address%")
	Page<Post> getPostsByProperties(Pageable pageable, @Param("type") String type, 
													@Param("address") String address);

	@Query("SELECT p FROM Post p WHERE "
			+ "p.approved=true and p.reject=false and "
			+ "p.typePost.shortName=:type")
	Page<Post> getPostsByType(Pageable pageable, @Param("type") String type);
	
	@Query("SELECT p FROM Post p WHERE "
			+ "p.approved=true and p.reject=false and "
			+ "p.accommodation.address like %:address%")
	Page<Post> getPostsContainAddress(Pageable pageable, @Param("address") String address);
	
	@Query("SELECT p FROM Post p WHERE p.approved=false and p.reject=false")
	Page<Post> getAllPostsWaiting(Pageable pageable);
	
	@Query("SELECT p FROM Post p WHERE "
			+ "p.approved=true and p.reject=false and "
			+ "p.typePost.id =:type and "
			+ "p.accommodation.address like %:address% and "
			+ "p.id!=:id")
	Page<Post> getRelatedPosts(Pageable pageable, @Param("type") long type, 
			@Param("address") String address, @Param("id") long id);
}
