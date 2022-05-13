package com.kltn.motelbe.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.motelbe.constant.PageAndSortConstant;
import com.kltn.motelbe.paging.Paging;
import com.kltn.motelbe.payload.response.PostDetailResp;
import com.kltn.motelbe.payload.response.PostResponse;
import com.kltn.motelbe.service.PostService;

@RestController
@RequestMapping("/api/admin/posts")
public class AdminPostController {
	
	@Autowired
	private PostService postService;

	@GetMapping(value = "/wait-ing")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Paging<PostResponse>> getPostsWaitingOfUser(
			@RequestParam(value = "pageNo", defaultValue = PageAndSortConstant.PAGE_NO, required = false) int pageNo, 
			@RequestParam(value = "pageSize", defaultValue = PageAndSortConstant.PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = PageAndSortConstant.SORT, required = false) String field){
		Paging<PostResponse> posts= postService.getAllPostsWaiting(pageNo, pageSize, field);
		return new ResponseEntity<Paging<PostResponse>>(posts, HttpStatus.OK);
	}
	
	@GetMapping(value = "/wait-ing/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<PostDetailResp> getPostDetail(@PathVariable("id") long id){
		PostDetailResp post= postService.getDetailPost(id);
		return new ResponseEntity<PostDetailResp>(post, HttpStatus.OK);
	}
	
	@GetMapping(value = "/wait-ing/approve/{id}/{status}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateStatusPost(@PathVariable("id") long id, @PathVariable("status") boolean status){
		boolean update= postService.updateStatusPost(id, status);
		return new ResponseEntity<Boolean>(update,HttpStatus.OK);
	}
}
