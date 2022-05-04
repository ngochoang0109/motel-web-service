package com.kltn.motelbe.payload.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthenticationResponse {
	private String accessToken;
    private String tokenType = "Bearer";
    private String usernameOrEmail;
    private List<String> roles;
	public JwtAuthenticationResponse(String accessToken,String usernameOrEmail, List<String> roles) {
		super();
		this.accessToken = accessToken;
		this.usernameOrEmail=usernameOrEmail;
		this.roles= roles;
	}
	public JwtAuthenticationResponse(String accessToken) {
		super();
		this.accessToken = accessToken;
	}
	
	
    
}
