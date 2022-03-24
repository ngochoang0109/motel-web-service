package com.kltn.motelbe.controller;
import java.net.URI;
import java.util.Collections;
import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.kltn.motelbe.constant.RoleConstant;
import com.kltn.motelbe.entity.Role;
import com.kltn.motelbe.entity.User;
import com.kltn.motelbe.exception.WebServerException;
import com.kltn.motelbe.payload.request.LoginReq;
import com.kltn.motelbe.payload.request.SignUpReq;
import com.kltn.motelbe.payload.response.ApiResponse;
import com.kltn.motelbe.payload.response.JwtAuthenticationResponse;
import com.kltn.motelbe.repository.RoleRepository;
import com.kltn.motelbe.repository.UserRepository;
import com.kltn.motelbe.security.jwt.JwtTokenProvider;

@RestController
@RequestMapping("api/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenProvider tokenProvider;

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpReq signUpReq) {
		if (userRepository.existsByUsername(signUpReq.getUsername())) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(new Date(), false, "Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpReq.getEmail())) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(new Date(), false, "Email Address already in use!"),
					HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		User user = new User(signUpReq.getEmail(), signUpReq.getUsername(), signUpReq.getPassword(),
				signUpReq.getFullname());

		user.setEnable(true);
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		Role role = roleRepository.findByName(RoleConstant.ROLE_USER)
				.orElseThrow(() -> new WebServerException("User role has not"));

		// Collections.singleton(userRole) returned list or set
		user.setRoles(Collections.singleton(role));

		User result = userRepository.save(user);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{username}")
				.buildAndExpand(result.getUsername()).toUri();

		return new ResponseEntity(new ApiResponse(new Date(), true, "User registered successfully"),HttpStatus.OK);
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginReq loginRequest) {
		
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=
				new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(), loginRequest.getPassword());
		
		Authentication authentication=authenticationManager.authenticate(usernamePasswordAuthenticationToken);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenProvider.generateToken(authentication);
	
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}
}
