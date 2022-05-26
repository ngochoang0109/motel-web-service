package com.kltn.motelbe.service;

import com.kltn.motelbe.paging.Paging;
import com.kltn.motelbe.payload.response.PostResponse;

public interface AccommodationService {
	
	Paging<PostResponse> getPosts(int pageNo, int pageSize, String field);
	
	Paging<PostResponse> getPostsByCriteria(int pageNo, int pageSize, String field, String type, String address);
	
	Paging<PostResponse> getPostsOfType(String shortName, int pageNo, int pageSize, String field);
	
}
