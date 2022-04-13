package com.kltn.motelbe.controller;

import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.motelbe.payload.request.LoginReq;
import com.kltn.motelbe.payload.request.SignUpReq;
import com.kltn.motelbe.payload.response.ApiResponse;
import com.kltn.motelbe.payload.response.JwtAuthenticationResponse;
import com.kltn.motelbe.security.jwt.JwtTokenProvider;
import com.kltn.motelbe.service.UserService;

@RestController
@RequestMapping("api/auth")
public class AuthController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenProvider tokenProvider;

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpReq signUpReq) {
		userService.registerUser(signUpReq);
		return new ResponseEntity<ApiResponse>(new ApiResponse(new Date(), true, "User registered successfully"),HttpStatus.OK);
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginReq loginRequest) {
		
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=
				new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(), loginRequest.getPassword());
		
		Authentication authentication=authenticationManager.authenticate(usernamePasswordAuthenticationToken);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenProvider.generateToken(authentication);
		
		if (jwt.equals(null)) {
			return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
		}
	
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt,loginRequest.getUsernameOrEmail()));
	}
}
