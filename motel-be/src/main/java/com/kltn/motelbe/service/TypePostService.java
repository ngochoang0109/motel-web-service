package com.kltn.motelbe.service;

import java.util.List;

import com.kltn.motelbe.entity.TypePost;

public interface TypePostService {
	List<TypePost> getAll();
	TypePost getById(long id);
}
