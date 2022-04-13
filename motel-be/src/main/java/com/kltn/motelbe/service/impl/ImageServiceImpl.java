package com.kltn.motelbe.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kltn.motelbe.dto.ImageDto;
import com.kltn.motelbe.entity.Accommodation;
import com.kltn.motelbe.entity.Image;
import com.kltn.motelbe.mapper.ImageMapper;
import com.kltn.motelbe.repository.ImageRepository;
import com.kltn.motelbe.service.ImageService;

@Service
public class ImageServiceImpl implements ImageService {
	
	@Autowired
	private ImageRepository imageRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	private ImageMapper imageMapper= new ImageMapper();
	
	@Override
	public Image saveImage(Image image) {
		return imageRepository.save(image);
	}

	@Override
	public Set<ImageDto> saveImages(Set<Image> images, Accommodation accommodation) {
		
		for (Image image : images) {
			image.setAccommodation(accommodation);
		}
		
		List<Image> lstImages=imageRepository.saveAll(images);
		
		Set<ImageDto> resultImages= new HashSet<>();
		
		for (Image image : lstImages) {
			resultImages.add(modelMapper.map(image, ImageDto.class));
		}
		
		return resultImages;
	}
	
	@Override
	public ImageDto getAvtOfAccomodation(Accommodation accommodation) {
		ImageDto imageDto= new ImageDto();
		for (Image image : accommodation.getImages()) {
			if(image.isFileType()) {
				imageDto=imageMapper.mapImageToImageDto(image);
				break;
			}
		}
		return imageDto;
	}
}
