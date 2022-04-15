package com.kltn.motelbe.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kltn.motelbe.Paging.Paging;
import com.kltn.motelbe.payload.request.PostRequest;
import com.kltn.motelbe.payload.response.PostResponse;

public interface PostService {
	PostResponse savePost(PostRequest postRequest,
							List<MultipartFile> images, 
							List<MultipartFile> videos, 
							String username);
	Paging<PostResponse> getPostsOfUser(int pageNo, int pageSize, String field, String username);
	Paging<PostResponse> getPostsRejectOfUser(int pageNo, int pageSize, String field, String username);
	Paging<PostResponse> getPostsWaitingOfUser(int pageNo, int pageSize, String field, String username);
}
