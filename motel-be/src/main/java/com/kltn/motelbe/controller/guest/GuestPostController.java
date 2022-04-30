package com.kltn.motelbe.controller.guest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.motelbe.constant.PageAndSortConstant;
import com.kltn.motelbe.paging.Paging;
import com.kltn.motelbe.payload.response.PostResponse;
import com.kltn.motelbe.service.PostService;

@RestController
@RequestMapping("/api/auth/posts/")
public class GuestPostController {
	
	@Autowired
	private PostService postService;

	@GetMapping(value = "/menu-post")
	public ResponseEntity<Paging<PostResponse>> getPosts(
			@RequestParam(value = "pageNo", defaultValue = PageAndSortConstant.PAGE_NO, required = false) int pageNo, 
			@RequestParam(value = "pageSize", defaultValue = PageAndSortConstant.PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = PageAndSortConstant.SORT, required = false) String field){
		Paging<PostResponse> posts= postService.getPosts(pageNo, pageSize, field);
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
		
		Map<String,String> properties= new HashMap<>();
		if (type!=null) {
			properties.put("type", type);
		}
		if (address!=null) {
			properties.put("address", address);
		}
		
		
		Paging<PostResponse> posts= postService.getPostsByCriteria(pageNo, pageSize, field,type,address);
		return new ResponseEntity<Paging<PostResponse>>(posts, HttpStatus.OK);
	}
}
