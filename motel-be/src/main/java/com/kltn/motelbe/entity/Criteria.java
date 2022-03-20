package com.kltn.motelbe.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "criteria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Criteria {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private boolean motel;
	
	private boolean stop;
	
	@Column(name = "price_start")
	private double priceStart;
	
	@Column(name = "price_end")
	private double priceEnd;
	
	@Column(name = "acreage_start")
	private double acreageStart;
	
	@Column(name = "acreage_end")
	private double acreageEnd;

	@Column(name = "create_at")
	private Date createAt;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "district_id")
	private District district;
	
}
