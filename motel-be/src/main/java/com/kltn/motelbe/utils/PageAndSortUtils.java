package com.kltn.motelbe.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageAndSortUtils {
	public static Pageable getPageable(int pageNo, int pageSize, String field) {
		Pageable paging=PageRequest.of(pageNo, pageSize, Sort.by(field).descending());
		return paging;
	}
	
	public static Pageable getPageableWithOrder(int pageNo, int pageSize, String field, boolean accessding) {
		Pageable paging;
		if(accessding) {
			paging=PageRequest.of(pageNo, pageSize, Sort.by(field).ascending());
		}else {
			paging=PageRequest.of(pageNo, pageSize, Sort.by(field).descending());
		}
		
		return paging;
	}
}
