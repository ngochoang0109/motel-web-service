package com.kltn.motelbe.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "accommodation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Accommodation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private double acreage;

	private String address;

	@Column(name = "air_conditioner")
	private boolean airConditioner;

	private boolean internet;

	private boolean parking;

	private double price;

	private boolean status;

	private int bedroom;
	private int floor;
	private boolean fridge;
	private boolean furniture;
	private boolean heater;
	private int toilet;
	private String tower;

	private double deposit; // deposit do chu nha quy dinh

	@Column(name = "x_coordinate")
	private String x;

	@Column(name = "y_coordinate")
	private String y;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "post_id", referencedColumnName = "id")
	private Post post;

	@OneToMany(mappedBy = "accommodation", cascade = CascadeType.ALL)
	private Set<Image> images;

	@OneToMany(mappedBy = "accommodation", cascade = CascadeType.ALL)
	private Set<Video> videos = new HashSet<>();
}
