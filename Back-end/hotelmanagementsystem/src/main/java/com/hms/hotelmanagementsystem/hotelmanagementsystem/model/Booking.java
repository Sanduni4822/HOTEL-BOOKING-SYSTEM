package com.hms.hotelmanagementsystem.hotelmanagementsystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue
    private Long bId;
    @Column(nullable = false)
    private Long rId;
    @Column(nullable = false)
    private LocalDate checkInDate;
    @Column(nullable = false)
    private LocalDate checkOutDate;
    @Column(nullable = false)
    private String gName;
    @Column(nullable = false)
    private String gEmail;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String gPhone;
    private String notes;
    @Column(nullable = false)
    private String postCode;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private Integer adultsCount;
    private Integer childrenCount;
    @Column(nullable = false)
    private Integer totalGuest;
    @Column(nullable = false)
    private LocalDate bookedDate;
    
}