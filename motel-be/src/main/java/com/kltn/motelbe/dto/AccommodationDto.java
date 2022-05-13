package com.kltn.motelbe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccommodationDto {
	
	private double acreage;
	private String address;
	private boolean airConditioner;
	private int bedroom;
	private int floor;
	private boolean fridge;
	private boolean furniture;
	private boolean heater;
	private boolean internet;
	private boolean parking;
	private double price;
	private double deposit;
	private int toilet;
	private String tower;
	private String x;
	private String y;

}
