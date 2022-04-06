package com.kltn.motelbe.entity;


import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
	
	@Column(name = "electric_price")
	private double electricPrice;
	
	private boolean internet;
	
	private boolean parking;
	
	private double price;
	
	private boolean status;
	
	@Column(name = "water_price")
	private double waterPrice;
	
	private double deposit; // deposit do chu nha quy dinh
	
	@Column(name = "x_coordinate")
	private String xCoordinate;
	
	@Column(name = "y_coordinate")
	private String yCoordinate;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
	private Post post;
	
	@ManyToMany(fetch= FetchType.EAGER)
	@JoinTable(
			name="accomodation_image",
			joinColumns = @JoinColumn(name="accomodation_id"),
			inverseJoinColumns = @JoinColumn(name="image_id")
			)
	private Set<Image> images = new HashSet<>();
	
	@ManyToMany(fetch= FetchType.EAGER)
	@JoinTable(
			name="accommodation_video",
			joinColumns = @JoinColumn(name="accommodation_id"),
			inverseJoinColumns = @JoinColumn(name="video_id")
			)
	private Set<Video> videos = new HashSet<>();
	

}
