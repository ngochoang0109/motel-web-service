package com.kltn.motelbe.service;

import com.kltn.motelbe.entity.User;
import com.kltn.motelbe.payload.request.SignUpReq;

public interface UserService {
	User registerUser(SignUpReq signUpReq);
}
