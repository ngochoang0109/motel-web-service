package com.kltn.motelbe.service;

import java.util.Set;

import com.kltn.motelbe.dto.ImageDto;
import com.kltn.motelbe.entity.Accommodation;
import com.kltn.motelbe.entity.Image;

public interface ImageService {
	Image saveImage(Image image);
	Set<ImageDto> saveImages(Set<Image> images, Accommodation accommodation);
	ImageDto getAvtOfAccomodation(Accommodation accommodation);
}
