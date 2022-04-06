package com.kltn.motelbe.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthenticationResponse {
	private String accessToken;
    private String tokenType = "Bearer";
    private String usernameOrEmail;
	public JwtAuthenticationResponse(String accessToken,String usernameOrEmail) {
		super();
		this.accessToken = accessToken;
		this.usernameOrEmail=usernameOrEmail;
	}
	public JwtAuthenticationResponse(String accessToken) {
		super();
		this.accessToken = accessToken;
	}
	
	
    
}
