package com.kltn.motelbe.payload.response;

import java.util.Date;

import com.kltn.motelbe.dto.ImageDto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostResponse {
	private long id;
	private ImageDto image;
	private String title;
	private Double price;
	private Date createdDate;
	private String address;
	
	private String brief;
	private String content;
	private double areage;
	private String fullName;
	
	
	public PostResponse(long id, String title, Double price, Date createdDate, String address) {
		super();
		this.id = id;
		this.title = title;
		this.price = price;
		this.createdDate = createdDate;
		this.address = address;
	}


	public PostResponse(long id, ImageDto image, String title, Double price, Date createdDate, String address) {
		super();
		this.id = id;
		this.image = image;
		this.title = title;
		this.price = price;
		this.createdDate = createdDate;
		this.address = address;
	}


	public PostResponse(long id, ImageDto image, String title, Double price, Date createdDate, String address,
			String brief, String content, double areage, String fullName) {
		super();
		this.id = id;
		this.image = image;
		this.title = title;
		this.price = price;
		this.createdDate = createdDate;
		this.address = address;
		this.brief = brief;
		this.content = content;
		this.areage = areage;
		this.fullName=fullName;
	}
	
	
}
