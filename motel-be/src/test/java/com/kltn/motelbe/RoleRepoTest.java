package com.kltn.motelbe;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.kltn.motelbe.entity.Role;
import com.kltn.motelbe.repository.RoleRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class RoleRepoTest {
	
	@Autowired RoleRepository repo;

	@Test
	public void testCreateRoleUser() {
		String roleName = "ROLE_USER";
		Role roleUser = new Role();
		
		roleUser.setName(roleName);
		
		Role savedRole = repo.save(roleUser);
		
		assertThat(savedRole.getId()).isNotNull();
	}
	
	@Test
	public void testCreateRoleAdmin() {
		String roleName = "ROLE_ADMIN";
		Role roleAdmin = new Role();
		
		roleAdmin.setName(roleName);
		
		Role savedRole = repo.save(roleAdmin);
		
		assertThat(savedRole.getId()).isNotNull();
	}
}
