package com.kltn.motelbe.dto;

import java.util.Set;

import com.kltn.motelbe.entity.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
	private String fullName;
	private String phone;
	private Set<Role> roles;
}
