package com.kltn.motelbe.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kltn.motelbe.paging.Paging;
import com.kltn.motelbe.payload.request.PostRequest;
import com.kltn.motelbe.payload.response.PostDetailResp;
import com.kltn.motelbe.payload.response.PostResponse;

public interface PostService {
	
	PostResponse savePost(PostRequest postRequest,
							List<MultipartFile> images, 
							List<MultipartFile> videos, 
							String username);
	
	Paging<PostResponse> getPostsOfUser(int pageNo, int pageSize, String field, String username);
	
	Paging<PostResponse> getPostsRejectOfUser(int pageNo, int pageSize, String field, String username);
	
	Paging<PostResponse> getPostsWaitingOfUser(int pageNo, int pageSize, String field, String username);
	
	Paging<PostResponse> getPosts(int pageNo, int pageSize, String field);
	
	Paging<PostResponse> getPostsByCriteria(int pageNo, int pageSize, String field, String type, String address);
	
	Paging<PostResponse> getAllPostsWaiting(int pageNo, int pageSize, String field);
	
	PostDetailResp getDetailPost(long id);
	
	boolean updateStatusPost( long id,boolean status);
	
}
