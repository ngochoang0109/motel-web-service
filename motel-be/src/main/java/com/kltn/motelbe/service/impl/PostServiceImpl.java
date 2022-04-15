package com.kltn.motelbe.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Set;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kltn.motelbe.Paging.Paging;
import com.kltn.motelbe.dto.ImageDto;
import com.kltn.motelbe.entity.Accommodation;
import com.kltn.motelbe.entity.Post;
import com.kltn.motelbe.entity.User;
import com.kltn.motelbe.exception.ResourceNotFoundException;
import com.kltn.motelbe.mapper.ImageMapper;
import com.kltn.motelbe.mapper.PostMapper;
import com.kltn.motelbe.mapper.VideoMapper;
import com.kltn.motelbe.payload.request.PostRequest;
import com.kltn.motelbe.payload.response.PostResponse;
import com.kltn.motelbe.repository.PostRepository;
import com.kltn.motelbe.repository.UserRepository;
import com.kltn.motelbe.service.AwsS3Service;
import com.kltn.motelbe.service.ImageService;
import com.kltn.motelbe.service.PostService;
import com.kltn.motelbe.service.VideoService;
import com.kltn.motelbe.utils.PageAndSortUtils;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AwsS3Service awsS3Service;

	private ImageMapper imageMapper = new ImageMapper();

	private VideoMapper videoMapper = new VideoMapper();

	@Autowired
	private ImageService imageService;

	@Autowired
	private VideoService videoService;
	
	private PostMapper postMapper= new PostMapper();

	@Override
	@Transactional
	public PostResponse savePost(PostRequest postRequest, List<MultipartFile> images, List<MultipartFile> videos,
			String username) {
		User user = userRepository.findByUsernameOrEmail(username, username)
				.orElseThrow(() -> new ResourceNotFoundException("user", "usernameOrEmail", username));

		Post post = modelMapper.map(postRequest.getPost(), Post.class);
		Accommodation accommodation = modelMapper.map(postRequest.getAccommodation(), Accommodation.class);

		post.setUser(user);
		post.setCreateAt(new Date());
		post.setApproved(false);
		post.setEnabled(false);
		post.setReject(false);

		accommodation.setPost(post);
		post.setAccommodation(accommodation);
		Post newPost = postRepository.save(post);
		
		// if image, video is empty
		if(videos!=null) {
			List<String> urlVideos = awsS3Service.uploadMulFile(videos);
			videoService.saveVideos(videoMapper.convertUrlVideosToVideos(urlVideos),newPost.getAccommodation());
		}
		ImageDto img=new ImageDto();
		if(images!=null) {
			// set value for image, video
			List<String> urlImages = awsS3Service.uploadMulFile(images);
			Set<ImageDto> lstImages = imageService.saveImages(imageMapper.convertUrlImagesToImages(urlImages),newPost.getAccommodation());
			
			for (ImageDto imageDto : lstImages) {
				if(imageDto.isFileType()) {
					img=imageDto;
					break;
				}
			}
			return new PostResponse(newPost.getId(), 
					img, newPost.getTitle(), newPost.getAccommodation().getPrice(), 
					newPost.getCreateAt(), newPost.getAccommodation().getAddress());
		}
		return new PostResponse(newPost.getId(), newPost.getTitle(), newPost.getAccommodation().getPrice(), 
				newPost.getCreateAt(), newPost.getAccommodation().getAddress());
	}
	
	@Override
	public Paging<PostResponse> getPostsOfUser(int pageNo, int pageSize, String field, String username) {
		Pageable pageable= PageAndSortUtils.getPageable(pageNo, pageSize, field);
		Page<Post> posts= postRepository.getPostsOfUser(pageable, username);
		Paging<PostResponse> paging= new Paging<>(postMapper.mapPostsToPostResponses(posts.getContent()), posts.getNumber(), posts.getSize(), posts.getTotalElements(), 
													posts.getTotalPages(), posts.isLast(), posts.isFirst());
		return paging;
	}
	
	@Override
	public Paging<PostResponse> getPostsRejectOfUser(int pageNo, int pageSize, String field, String username) {
		Pageable pageable= PageAndSortUtils.getPageable(pageNo, pageSize, field);
		Page<Post> posts= postRepository.getPostsRejectOfUser(pageable, username);
		Paging<PostResponse> paging= new Paging<>(postMapper.mapPostsToPostResponses(posts.getContent()), posts.getNumber(), posts.getSize(), posts.getTotalElements(), 
													posts.getTotalPages(), posts.isLast(), posts.isFirst());
		return paging;
	}
	
	@Override
	public Paging<PostResponse> getPostsWaitingOfUser(int pageNo, int pageSize, String field, String username) {
		Pageable pageable= PageAndSortUtils.getPageable(pageNo, pageSize, field);
		Page<Post> posts= postRepository.getPostsWaitingOfUser(pageable, username);
		Paging<PostResponse> paging= new Paging<>(postMapper.mapPostsToPostResponses(posts.getContent()), posts.getNumber(), posts.getSize(), posts.getTotalElements(), 
													posts.getTotalPages(), posts.isLast(), posts.isFirst());
		return paging;
	}
}
