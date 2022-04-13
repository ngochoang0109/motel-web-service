package com.kltn.motelbe.mapper;

import java.security.KeyStore.PrivateKeyEntry;
import java.util.LinkedList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kltn.motelbe.dto.ImageDto;
import com.kltn.motelbe.entity.Accommodation;
import com.kltn.motelbe.entity.Image;
import com.kltn.motelbe.entity.Post;
import com.kltn.motelbe.payload.response.PostResponse;
import com.kltn.motelbe.service.ImageService;

public class PostMapper {
	
	private ImageMapper imageMapper=new ImageMapper();
	
	@Autowired
	private ImageService imageService; 
	
	public PostResponse mapPostToPostResponse(Post post) {
		
		ImageDto imageDto= new ImageDto();
		for (Image image : post.getAccommodation().getImages()) {
			if(image.isFileType()) {
				imageDto=imageMapper.mapImageToImageDto(image);
				break;
			}
		}
		
		PostResponse postResponse= new PostResponse(post.getId(), imageDto, 
											post.getTitle(), post.getAccommodation().getPrice(), 
											post.getCreateAt(), post.getAccommodation().getAddress());
		return postResponse;
	}
	
	public List<PostResponse> mapPostsToPostResponses(List<Post> posts){
		List<PostResponse> postResponses= new LinkedList<>();
		for (Post post : posts) {
			PostResponse postResponse=this.mapPostToPostResponse(post);
			postResponses.add(postResponse);
		}
		return postResponses;
	}
}
