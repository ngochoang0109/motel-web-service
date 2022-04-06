package com.kltn.motelbe.payload.request;

import com.kltn.motelbe.dto.AccommodationDto;
import com.kltn.motelbe.dto.PostDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostRequest {
	private PostDto post;
	private AccommodationDto accommodation;
}
