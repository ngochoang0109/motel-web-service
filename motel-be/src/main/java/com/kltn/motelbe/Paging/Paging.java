package com.kltn.motelbe.Paging;


import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Paging<T> {
	private List<T> content;
	private int pageNo;
	private int pageSize;
	private long totalElements;
	private int totalPages;
	private boolean last;
	private boolean first;
	
	public Paging(List<T> content, int pageNo, int pageSize, long totalElements, int totalPages, boolean last,
			boolean first) {
		super();
		this.content = content;
		this.pageNo = pageNo;
		this.pageSize = pageSize;
		this.totalElements = totalElements;
		this.totalPages = totalPages;
		this.last = last;
		this.first = first;
	}

}
