package com.kltn.motelbe.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.kltn.motelbe.payload.response.ApiResponse;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException 						resourceNotFoundException, WebRequest webRequest){
		ApiResponse apiResponse= new ApiResponse(new Date(),false,resourceNotFoundException.getMessage());
		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ApiResponse> handlerBadRequestException(BadRequestException badRequestException){
		ApiResponse apiResponse= new ApiResponse(new Date(), false, badRequestException.getMessage());
		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(WebServerException.class)
	public ResponseEntity<ApiResponse> handlerWebServerException(BadRequestException badRequestException){
		ApiResponse apiResponse= new ApiResponse(new Date(), false, badRequestException.getMessage());
		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);
	}
}
