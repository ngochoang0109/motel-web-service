package com.kltn.motelbe.exception;

public class BadRequestException extends RuntimeException{
	private String message;

	public BadRequestException(String message) {
		super();
		this.message = message;
	}
}
