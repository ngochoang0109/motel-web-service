package com.kltn.motelbe.service;

import java.util.Set;

import com.kltn.motelbe.entity.Accommodation;
import com.kltn.motelbe.entity.Video;

public interface VideoService {
	Set<Video> saveVideos(Set<Video> videos, Accommodation accommodation);
}
