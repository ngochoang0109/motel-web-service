package com.kltn.motelbe.mapper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.kltn.motelbe.entity.Video;

public class VideoMapper {
	public Set<Video> convertUrlVideosToVideos(List<String> urlVideos) {
		Set<Video> videos= new HashSet<>();
		for (String url : urlVideos) {
			videos.add(new Video(url));
		}
		return videos;
	}
}
