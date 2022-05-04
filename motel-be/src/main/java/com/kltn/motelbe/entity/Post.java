package com.kltn.motelbe.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "post")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String title;
	
	@Lob
	private String content;
	
	// (reject = 1 and approve = 1) or (reject = 1 and approve = 0) => is reject
	// reject = 0 and approved = 1 => showing
	// reject = 0 and approved = 0 => wait-post(hidden post)
	private boolean approved;
	
	private boolean reject;
	
	@Column(name = "last_update")
	private Date lastUpdate;
	
	private boolean enabled;
	
	@Column(name = "create_at")
	private Date createAt;
	
	private String brief; 
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "type")
	@JsonManagedReference
	private TypePost typePost;
	
	@OneToOne(mappedBy = "post",cascade=CascadeType.ALL, fetch = FetchType.LAZY)
	private Accommodation accommodation;

}

