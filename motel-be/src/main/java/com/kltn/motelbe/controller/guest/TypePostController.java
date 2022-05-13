package com.kltn.motelbe.controller.guest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.motelbe.entity.TypePost;
import com.kltn.motelbe.service.TypePostService;

@RestController
@RequestMapping("/api/auth/type-posts")
public class TypePostController {
	
	@Autowired
	private TypePostService typePostService;
	
	@GetMapping
	public List<TypePost> getAll(){
		return typePostService.getAll();
	}
}
