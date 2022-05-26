package com.kltn.motelbe.controller.guest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.motelbe.constant.PageAndSortConstant;
import com.kltn.motelbe.paging.Paging;
import com.kltn.motelbe.payload.response.PostDetailResp;
import com.kltn.motelbe.payload.response.PostResponse;
import com.kltn.motelbe.service.AccommodationService;
import com.kltn.motelbe.service.PostService;

@RestController
@RequestMapping("/api/auth/posts")
public class GuestPostController {
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private AccommodationService accommodationService;

	@GetMapping(value = "/menu-post")
	public ResponseEntity<Paging<PostResponse>> getPosts(
			@RequestParam(value = "pageNo", defaultValue = PageAndSortConstant.PAGE_NO, required = false) int pageNo, 
			@RequestParam(value = "pageSize", defaultValue = PageAndSortConstant.PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = PageAndSortConstant.SORT, required = false) String field){
		Paging<PostResponse> posts= new Paging<>(); 
		if (field.equals("approvedDate")) {
			posts= postService.getPosts(pageNo, pageSize, field);
		}else {
			posts= accommodationService.getPosts(pageNo, pageSize, field);
		}
		return new ResponseEntity<Paging<PostResponse>>(posts, HttpStatus.OK);
	}
	
	@GetMapping(value = "/menu-post/posts-of-type")
	public ResponseEntity<Paging<PostResponse>> getPostsOfType(
			@RequestParam(value = "type", required = false) String type,
			@RequestParam(value = "pageNo", defaultValue = PageAndSortConstant.PAGE_NO, required = false) int pageNo, 
			@RequestParam(value = "pageSize", defaultValue = PageAndSortConstant.PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = PageAndSortConstant.SORT, required = false) String field){
		
		Paging<PostResponse> posts= new Paging<>(); 
		if(field.equals("all")) {
			posts=postService.getPosts(pageNo, pageSize, "approvedDate");
		}
		else if (field.equals("approvedDate")) {
			posts= postService.getPostsOfType(type, pageNo, 2, field);
		}else {
			posts= accommodationService.getPostsOfType(type,pageNo, 2, field);
		}
		return new ResponseEntity<Paging<PostResponse>>(posts, HttpStatus.OK);
	}
	
	@GetMapping(value = "/search")
	public ResponseEntity<Paging<PostResponse>> searchPostsByType(
			@RequestParam(value = "type", required = false) String type,
			@RequestParam(value = "address", required = false) String address,
			@RequestParam(value = "price", required = false) String price,
			@RequestParam(value = "acreage", required = false) String acreage,
			@RequestParam(value = "pageNo", defaultValue = PageAndSortConstant.PAGE_NO, required = false) int pageNo, 
			@RequestParam(value = "pageSize", defaultValue = PageAndSortConstant.PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = PageAndSortConstant.SORT, required = false) String field){
		
		Paging<PostResponse> posts= new Paging<>(); 
		
		if (field.equals("approvedDate")) {
			posts= postService.getPostsByCriteria(pageNo, pageSize, field, type, address);
		}else {
			posts= accommodationService.getPostsByCriteria(pageNo, pageSize, field,type, address);
		}
		return new ResponseEntity<Paging<PostResponse>>(posts, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<PostDetailResp> getPostDetail(@PathVariable("id") long id){
		PostDetailResp post= postService.getDetailPost(id);
		return new ResponseEntity<PostDetailResp>(post, HttpStatus.OK);
	}
	
	@GetMapping(value = "/new-post/{id}")
	public ResponseEntity<List<PostResponse>> getNewPost(@PathVariable("id") long id){
		List<PostResponse> posts= postService.getTopKLeastNewPost(8,"approvedDate", id);
		return new ResponseEntity<List<PostResponse>>(posts, HttpStatus.OK);
	}
	
	@GetMapping(value = "/related-post")
	public ResponseEntity<List<PostResponse>> getRelatedPost(
			@RequestParam(value = "type", required = false) long type,
			@RequestParam(value = "address", required = false) String address,
			@RequestParam(value = "id", required = false) long id){
		List<PostResponse> posts= postService.getRelatedPosts(address, type, id, 8, "approvedDate");
		return new ResponseEntity<List<PostResponse>>(posts, HttpStatus.OK);
	}
}
