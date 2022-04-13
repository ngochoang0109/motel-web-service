package com.kltn.motelbe.service.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.kltn.motelbe.exception.ResourceNotFoundException;
import com.kltn.motelbe.service.AwsS3Service;

@Service
public class AwsS3ServiceImpl implements AwsS3Service {

	@Autowired
	private AmazonS3 amazonS3;

	@Value("${aws.s3.bucket}")
	private String bucket;

	@Value("${aws.endpoint}")
	private String endPoint;

	@Override
	public File convertMultiPartToFile(MultipartFile multipartFile) {
		File convFile = new File(multipartFile.getOriginalFilename());
		FileOutputStream fos;
		try {
			fos = new FileOutputStream(convFile);
			fos.write(multipartFile.getBytes());
			fos.close();
		} catch (FileNotFoundException e) {
			throw new ResourceNotFoundException("File", "file", e.getMessage());
		} catch (IOException e) {
			throw new ResourceNotFoundException("File", "file", e.getMessage());
		}
		return convFile;
	}

	@Override
	public String generateFileNameUnique(MultipartFile multipartFile) {
		return new Date().getTime() + "-" + multipartFile.getOriginalFilename().replace(" ", "_");
	}

	@Override
	public void uploadToStore(String filename, File file) {
		amazonS3.putObject(
				new PutObjectRequest(bucket, filename, file).withCannedAcl(CannedAccessControlList.PublicRead));
	}

	@Override
	public String uploadFile(MultipartFile multipartFile) {
		String fileUrl = "";
		try {
			File file = convertMultiPartToFile(multipartFile);
			String fileName = generateFileNameUnique(multipartFile);
			fileUrl = endPoint  + "/" + fileName;
			uploadToStore(fileName, file);
			file.delete();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return fileUrl;
	}

	@Override
	public List<String> uploadMulFile(List<MultipartFile> multipartFiles) {
		List<String> fileUrls = new LinkedList<>();
		if (multipartFiles!=null) {
			for (MultipartFile multipartFile : multipartFiles) {
				fileUrls.add(uploadFile(multipartFile));
			}
		}
		return fileUrls;
	}
}
