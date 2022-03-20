package com.kltn.motelbe.entity;


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
@Table(name = "prepayment_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrepaymentDetail {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private Double deposit;

	@ManyToOne
	@JoinColumn(name = "prepayment_id")
	private Prepayment prepayment;
	
	@ManyToOne
	@JoinColumn(name = "accommodation_id")
	private Accommodation accommodation;
	
	
}
