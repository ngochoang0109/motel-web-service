package com.kltn.motelbe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kltn.motelbe.entity.TypePost;
import com.kltn.motelbe.exception.ResourceNotFoundException;
import com.kltn.motelbe.repository.TypePostRepository;
import com.kltn.motelbe.service.TypePostService;

@Service
public class TypePostServiceImpl implements TypePostService{
	
	@Autowired
	private TypePostRepository typePostRepository;
	
	@Override
	public List<TypePost> getAll() {
		return typePostRepository.findAll();
	}
	
	@Override
	public TypePost getById(long id) {
		TypePost typePost= this.typePostRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User role has not","type post", id));
		return typePost;
	}
}
