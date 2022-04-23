package com.kltn.motelbe.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "type_post")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypePost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String shortName;
	
	@Column(nullable = false)
	private String fullName;
	
	@OneToMany(mappedBy="typePost")
	@JsonBackReference
    private List<Post> posts;
}
