package com.kltn.motelbe.service;

import java.io.File;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {
	File convertMultiPartToFile(MultipartFile multipartFile);
	String generateFileNameUnique(MultipartFile multipartFile);
	void uploadToStore(String filename, File file);
	String uploadFile(MultipartFile multipartFile);
	List<String> uploadMulFile(List<MultipartFile> multipartFiles);
}
