package com.kltn.motelbe.mapper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.kltn.motelbe.dto.ImageDto;
import com.kltn.motelbe.entity.Image;

public class ImageMapper {
	public Set<Image> convertUrlImagesToImages(List<String> urlImages) {
		Set<Image> images= new HashSet<>();
		
		images.add(new Image(urlImages.get(urlImages.size()-1),true));
		
		for(int i=0;i<urlImages.size()-1;i++) {
			images.add(new Image(urlImages.get(i),false));
		}
		return images;
	}
	
	public ImageDto mapImageToImageDto(Image image) {
		return new ImageDto(image.getFileName(), image.isFileType());
	}
	
	public Set<ImageDto> mapImagesToImageDtos(Set<Image> images) {
		Set<ImageDto> imageDtos= new HashSet<>();
		for (Image image : images) {
			imageDtos.add(mapImageToImageDto(image));
		}
		return imageDtos;
	}
}
