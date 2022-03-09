package com.kltn.motelbe.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.motelbe.entity.User;
import com.kltn.motelbe.repository.UserRepository;
import com.kltn.motelbe.security.UserPrincipal;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
		// Let people login with either user name or email
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> 
                        new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail)
        );
		return UserPrincipal.create(user);
	}
	
	// This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return UserPrincipal.create(user);
    }
}
