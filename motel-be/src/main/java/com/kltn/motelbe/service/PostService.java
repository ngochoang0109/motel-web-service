package com.kltn.motelbe.service;

import com.kltn.motelbe.payload.request.PostRequest;
import com.kltn.motelbe.payload.response.PostResponse;

public interface PostService {
	PostResponse savePost(PostRequest postRequest, String username);
}
