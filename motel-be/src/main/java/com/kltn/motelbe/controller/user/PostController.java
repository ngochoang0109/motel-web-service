package com.kltn.motelbe.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kltn.motelbe.entity.User;
import com.kltn.motelbe.payload.request.PostRequest;
import com.kltn.motelbe.payload.response.PostResponse;
import com.kltn.motelbe.repository.UserRepository;
import com.kltn.motelbe.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostService postService;
	
	
	@PostMapping
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> createPoll(@RequestPart("post") PostRequest postRequest,
										@RequestPart("images") List<MultipartFile> images,
										@RequestPart("videos") List<MultipartFile> videos,
										Authentication authentication){
		PostResponse postResponse= postService.savePost(postRequest, authentication.getName());
		return null;
	}
	
	@GetMapping
	public List<User> getall(){
		return this.userRepository.findAll();
	}
	
}
