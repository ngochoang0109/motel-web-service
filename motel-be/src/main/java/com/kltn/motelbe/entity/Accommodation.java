package com.kltn.motelbe.entity;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
	
	private boolean cabletv;
	
	@Column(name = "electric_price")
	private double electricPrice;
	
	private boolean heater;
	
	private boolean internet;
	
	private boolean motel;
	
	private boolean parking;
	
	private double price;
	
	private boolean status;
	
	@Column(name = "water_price")
	private double waterPrice;
	
	@Column(name = "x_coordinate")
	private double xCoordinate;
	
	@Column(name = "y_coordinate")
	private double yCoordinate;
	
	@ManyToOne
	@JoinColumn(name = "district_id")
	private District district;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
	private Post post;
	

}
