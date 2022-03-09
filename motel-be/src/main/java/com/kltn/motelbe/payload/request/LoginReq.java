package com.kltn.motelbe.payload.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginReq {
	@NotBlank
	private String usernameOrEmail;

	@NotBlank
	private String password;
}
