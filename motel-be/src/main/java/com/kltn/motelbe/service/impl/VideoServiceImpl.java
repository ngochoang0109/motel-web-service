package com.kltn.motelbe.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kltn.motelbe.entity.Accommodation;
import com.kltn.motelbe.entity.Image;
import com.kltn.motelbe.entity.Video;
import com.kltn.motelbe.repository.VideoRepository;
import com.kltn.motelbe.service.VideoService;

@Service
public class VideoServiceImpl implements VideoService{
	
	@Autowired
	private VideoRepository videoRepository;
	
	@Override
	public Set<Video> saveVideos(Set<Video> videos, Accommodation accommodation) {
		
		for (Video video : videos) {
			video.setAccommodation(accommodation);
		}
		
		List<Video> lstVideos=videoRepository.saveAll(videos);
		
		Set<Video> resultVideos= new HashSet<>();
		
		for (Video video : lstVideos) {
			resultVideos.add(video);
		}
		return resultVideos;
	}
}
