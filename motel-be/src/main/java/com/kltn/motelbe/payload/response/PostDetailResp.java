package com.kltn.motelbe.payload.response;

import java.util.Set;

import com.kltn.motelbe.dto.AccommodationDto;
import com.kltn.motelbe.dto.ImageDto;
import com.kltn.motelbe.dto.PostDto;
import com.kltn.motelbe.dto.UserDto;
import com.kltn.motelbe.dto.VideoDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDetailResp {
	
	private PostDto postDto;
	private UserDto userDto;
	private AccommodationDto accommodationDto;
	private Set<ImageDto> imageDtos;
	private Set<VideoDto> videoDtos;
	
}
