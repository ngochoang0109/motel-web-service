package com.kltn.motelbe.service.impl;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kltn.motelbe.entity.Accommodation;
import com.kltn.motelbe.entity.Post;
import com.kltn.motelbe.mapper.PostMapper;
import com.kltn.motelbe.paging.Paging;
import com.kltn.motelbe.payload.response.PostResponse;
import com.kltn.motelbe.repository.AccommodationRepository;
import com.kltn.motelbe.service.AccommodationService;
import com.kltn.motelbe.utils.PageAndSortUtils;

@Service
public class AccommodationImpl implements AccommodationService {

	@Autowired
	private AccommodationRepository accommodationRepository;

	private PostMapper postMapper = new PostMapper();

	@Override
	public Paging<PostResponse> getPosts(int pageNo, int pageSize, String field) {

		Pageable pageable = PageAndSortUtils.getPageableWithOrder(pageNo, pageSize, field, true);
		Page<Accommodation> accPage = accommodationRepository.getPosts(pageable);

		List<Post> posts = new LinkedList<>();

		for (Accommodation accommodation : accPage.getContent()) {
			posts.add(accommodation.getPost());
		}

		List<PostResponse> postResponses = postMapper.mapPostsToPostResponses(posts);

		Paging<PostResponse> paging = new Paging<>(postResponses, accPage.getNumber(), accPage.getSize(),
				accPage.getTotalElements(), accPage.getTotalPages(), accPage.isLast(), accPage.isFirst());

		return paging;
	}
	
	@Override
	public Paging<PostResponse> getPostsByCriteria(int pageNo, int pageSize, String field, String type,
			String address) {
		Pageable pageable = PageAndSortUtils.getPageableWithOrder(pageNo, pageSize, field, true);
		Page<Accommodation> accPage = Page.empty();

		if (type != null) {
			if (address != null) {
				accPage = accommodationRepository.getPostsByProperties(pageable, type, address);
			} else {
				accPage = accommodationRepository.getPostsByType(pageable, type);
			}
		} else {
			if (address != null) {
				accPage = accommodationRepository.getPostsContainAddress(pageable, address);
			}
		}
		
		List<Post> posts = new LinkedList<>();

		for (Accommodation accommodation : accPage.getContent()) {
			posts.add(accommodation.getPost());
		}

		List<PostResponse> postResponses = postMapper.mapPostsToPostResponses(posts);

		Paging<PostResponse> paging = new Paging<>(postResponses, accPage.getNumber(), accPage.getSize(),
				accPage.getTotalElements(), accPage.getTotalPages(), accPage.isLast(), accPage.isFirst());

		return paging;
	}
	
	@Override
	public Paging<PostResponse> getPostsOfType(String shortName, int pageNo, int pageSize, String field) {
		Pageable pageable = PageAndSortUtils.getPageableWithOrder(pageNo, pageSize, field, true);
		Page<Accommodation> accPage = accommodationRepository.getPostsByType(pageable, shortName);
	
		List<Post> posts = new LinkedList<>();

		for (Accommodation accommodation : accPage.getContent()) {
			posts.add(accommodation.getPost());
		}

		List<PostResponse> postResponses = postMapper.mapPostsToPostResponses(posts);

		Paging<PostResponse> paging = new Paging<>(postResponses, accPage.getNumber(), accPage.getSize(),
				accPage.getTotalElements(), accPage.getTotalPages(), accPage.isLast(), accPage.isFirst());

		return paging;
	}
}
