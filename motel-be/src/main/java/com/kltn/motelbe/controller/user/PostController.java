package com.kltn.motelbe.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kltn.motelbe.constant.PageAndSortConstant;
import com.kltn.motelbe.paging.Paging;
import com.kltn.motelbe.payload.request.PostRequest;
import com.kltn.motelbe.payload.response.PostDetailResp;
import com.kltn.motelbe.payload.response.PostResponse;
import com.kltn.motelbe.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {
	
	
	@Autowired
	private PostService postService;
	
	
	@PostMapping
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<PostResponse> createPoll(@RequestPart("post") PostRequest postRequest,
										@RequestPart(value = "images",required = false) List<MultipartFile> images,
										@RequestPart(value = "videos",required = false) List<MultipartFile> videos,
										Authentication authentication){
		PostResponse postResponse= postService.savePost(postRequest,images, videos, authentication.getName());
		return new ResponseEntity<PostResponse>(postResponse,HttpStatus.OK);
	}
	
	@GetMapping
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<Paging<PostResponse>> getPostsOfUser(
			@RequestParam(value = "pageNo", defaultValue = PageAndSortConstant.PAGE_NO, required = false) int pageNo, 
			@RequestParam(value = "pageSize", defaultValue = PageAndSortConstant.PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = PageAndSortConstant.SORT, required = false) String field,
			Authentication authentication){
		Paging<PostResponse> posts= postService.getPostsOfUser(pageNo, pageSize, field, authentication.getName());
		return new ResponseEntity<Paging<PostResponse>>(posts, HttpStatus.OK);
	}
	
	@GetMapping(value = "/reject")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<Paging<PostResponse>> getPostsRejectOfUser(
			@RequestParam(value = "pageNo", defaultValue = PageAndSortConstant.PAGE_NO, required = false) int pageNo, 
			@RequestParam(value = "pageSize", defaultValue = PageAndSortConstant.PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = PageAndSortConstant.SORT, required = false) String field,
			Authentication authentication){
		Paging<PostResponse> posts= postService.getPostsRejectOfUser(pageNo, pageSize, field, authentication.getName());
		return new ResponseEntity<Paging<PostResponse>>(posts, HttpStatus.OK);
	}
	
	
	
	@GetMapping(value = "/wait-ing")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<Paging<PostResponse>> getPostsWaitingOfUser(
			@RequestParam(value = "pageNo", defaultValue = PageAndSortConstant.PAGE_NO, required = false) int pageNo, 
			@RequestParam(value = "pageSize", defaultValue = PageAndSortConstant.PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = PageAndSortConstant.SORT, required = false) String field,
			Authentication authentication){
		Paging<PostResponse> posts= postService.getPostsWaitingOfUser(pageNo, pageSize, field, authentication.getName());
		return new ResponseEntity<Paging<PostResponse>>(posts, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/{id}")
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<PostDetailResp> getPostDetail(@PathVariable("id") long id){
		PostDetailResp post= postService.getDetailPost(id);
		return new ResponseEntity<PostDetailResp>(post, HttpStatus.OK);
	}
	
}
