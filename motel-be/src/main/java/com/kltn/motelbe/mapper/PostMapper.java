package com.kltn.motelbe.mapper;

import java.util.LinkedList;
import java.util.List;



import com.kltn.motelbe.dto.ImageDto;
import com.kltn.motelbe.dto.PostDto;
import com.kltn.motelbe.entity.Image;
import com.kltn.motelbe.entity.Post;
import com.kltn.motelbe.payload.response.PostResponse;

public class PostMapper {
	
	private ImageMapper imageMapper=new ImageMapper();
	
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
											post.getCreateAt(), post.getAccommodation().getAddress(),
											post.getBrief(),post.getContent(),
											post.getAccommodation().getAcreage(),
											post.getUser().getFullname(), post.getUser().getPhone(),post.getTypePost().getId());;
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
	
	public PostDto mapPostToPostDto(Post post) {
		PostDto postDto= new PostDto(post.getTitle(), post.getBrief(),post.getContent(), post.getTypePost().getId(), post.getCreateAt(), post.getLastUpdate());
		return postDto;
	}
}
