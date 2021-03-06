package com.kltn.motelbe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
	private String resource;
	private String field;
	private long value;
	private String data;
	
	public ResourceNotFoundException(String resource, String field, long value) {
		super(String.format("%s not found with %s: %s", resource, field, value));
		this.resource = resource;
		this.field = field;
		this.value = value;
	}
	
	
	 
	public ResourceNotFoundException(String resource, String field, String data) {
		super(String.format("%s not found with %s: %s", resource, field, data));
		this.resource = resource;
		this.field = field;
		this.data = data;
	}



	public String getData() {
		return data;
	}



	public String getResource() {
		return resource;
	}
	
	public String getField() {
		return field;
	}
	
	public long getValue() {
		return value;
	}
}
