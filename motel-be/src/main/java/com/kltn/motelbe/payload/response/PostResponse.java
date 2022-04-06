package com.kltn.motelbe.payload.response;

import java.util.Date;

import com.kltn.motelbe.dto.ImageDto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
	private long id;
	private ImageDto image;
	private String title;
	private Double price;
	private Date createdDate;
	private String address;
}
