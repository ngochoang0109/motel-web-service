package com.kltn.motelbe.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.motelbe.dto.ImageDto;
import com.kltn.motelbe.entity.Accommodation;
import com.kltn.motelbe.entity.Image;
import com.kltn.motelbe.entity.Post;
import com.kltn.motelbe.entity.User;
import com.kltn.motelbe.entity.Video;
import com.kltn.motelbe.exception.ResourceNotFoundException;
import com.kltn.motelbe.payload.request.PostRequest;
import com.kltn.motelbe.payload.response.PostResponse;
import com.kltn.motelbe.repository.PostRepository;
import com.kltn.motelbe.repository.UserRepository;
import com.kltn.motelbe.service.PostService;

@Service
public class PostServiceImpl implements PostService{
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	@Transactional
	public PostResponse savePost(PostRequest postRequest, String username) {
		User user=userRepository
								.findByUsernameOrEmail(username, username)
								.orElseThrow(()->new ResourceNotFoundException("user", "usernameOrEmail", username));
		
		Post post= modelMapper.map(postRequest.getPost(), Post.class);
		Accommodation accommodation= modelMapper.map(postRequest.getAccommodation(), Accommodation.class);
		
		post.setUser(user);
		post.setCreateAt(new Date());
		post.setApproved(false);
		post.setEnabled(false);
		post.setAccommodation(accommodation);
		
		accommodation.setPost(post);
		accommodation.setImages(null);
		accommodation.setVideos(null);
		
		
		
		
		Post newPost=postRepository.save(post);
		
//		ImageDto imageDto= modelMapper.map(newPost.getAccommodation().getImages(), ImageDto.class);
		PostResponse postResponse=modelMapper.map(newPost, PostResponse.class);
		
//		postResponse.setImage(imageDto);
		
		return postResponse;
	}
}
