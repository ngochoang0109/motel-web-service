package com.kltn.motelbe.dto;

import java.util.List;

import javax.swing.plaf.MenuItemUI;

import org.springframework.web.multipart.MultipartFile;

import com.kltn.motelbe.entity.Image;
import com.kltn.motelbe.entity.Video;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccommodationDto {
	
	private double acreage;
	private String address;
	private boolean airConditioner;
	private double electricPrice;
	private boolean internet;
	private boolean parking;
	private double price;
	private double waterPrice;
	private double deposit;
	private String xCoordinate;
	private String yCoordinate;
	
	private MultipartFile[] images;
	private MultipartFile[] videos;
}
