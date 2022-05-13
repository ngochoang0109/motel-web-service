package com.kltn.motelbe.service.impl;

import java.util.Collections;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kltn.motelbe.constant.RoleConstant;
import com.kltn.motelbe.dto.UserDto;
import com.kltn.motelbe.entity.Role;
import com.kltn.motelbe.entity.User;
import com.kltn.motelbe.exception.BadRequestException;
import com.kltn.motelbe.exception.ResourceNotFoundException;
import com.kltn.motelbe.exception.WebServerException;
import com.kltn.motelbe.payload.request.SignUpReq;
import com.kltn.motelbe.repository.RoleRepository;
import com.kltn.motelbe.repository.UserRepository;
import com.kltn.motelbe.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public User registerUser(SignUpReq signUpReq) {
		if (userRepository.existsByUsername(signUpReq.getUsername())) {
			throw new BadRequestException("Username is already taken!");
		}

		if (userRepository.existsByEmail(signUpReq.getEmail())) {
			throw new BadRequestException("Email Address already in use!");
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

		return userRepository.save(user);

	}
	
	
	@Override
	public UserDto findUserByUsernameOrEmail(String username, String email) {
		User user= userRepository.findByUsernameOrEmail(username,email)
				.orElseThrow(() -> new ResourceNotFoundException("user", "username", username));
		UserDto userDto = modelMapper.map(user, UserDto.class);
		return userDto;
	}
}
