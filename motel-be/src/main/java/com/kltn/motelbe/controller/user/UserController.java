package com.kltn.motelbe.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.kltn.motelbe.dto.UserDto;
import com.kltn.motelbe.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;

	@GetMapping
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<UserDto> getCurrentUser(Authentication authentication){
		UserDto userDto=userService.findUserByUsernameOrEmail(authentication.getName(),authentication.getName());
		return new ResponseEntity<UserDto>(userDto,HttpStatus.OK);
	}
	
}
