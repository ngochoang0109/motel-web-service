package com.kltn.motelbe.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user", uniqueConstraints = { @UniqueConstraint(columnNames = { "email" }) })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;
	@NotBlank
	@Size(max = 50)
	private String username;
	@NotBlank
	@Size(min = 8, max = 100)
	private String password;
	private boolean enable;
	@NotBlank
	@Size(max = 40)
	private String fullname;
	private String phone;
	private String address;
	private String cardId;

	// 0 is male, 1 is female
	private boolean gender;
	private Date birthDate;
	private Date createDate;
	private Date updateDate;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id") , 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public User(@NotBlank @Size(max = 50) @Email String email, @NotBlank @Size(max = 50) String username,
			@NotBlank @Size(min = 8, max = 100) String password, @NotBlank @Size(max = 40) String fullname) {
		super();
		this.email = email;
		this.username = username;
		this.password = password;
		this.fullname = fullname;
		
		// generate create date
		this.createDate= new Date();
	}

	
	
	
}
