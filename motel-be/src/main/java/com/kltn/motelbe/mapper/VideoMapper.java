package com.kltn.motelbe.mapper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.kltn.motelbe.dto.VideoDto;
import com.kltn.motelbe.entity.Video;

public class VideoMapper {
	public Set<Video> convertUrlVideosToVideos(List<String> urlVideos) {
		Set<Video> videos= new HashSet<>();
		for (String url : urlVideos) {
			videos.add(new Video(url));
		}
		return videos;
	}
	
	public VideoDto mapVideoToVideoDto(Video video) {
		return new VideoDto(video.getSource());
	}
	
	public Set<VideoDto> mapVideosToVideoDtos(Set<Video> videos) {
		Set<VideoDto> videoDtos= new HashSet<>();
		for (Video video : videos) {
			videoDtos.add(mapVideoToVideoDto(video));
		}
		return videoDtos;
	}
}
