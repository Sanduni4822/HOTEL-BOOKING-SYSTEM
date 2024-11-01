package com.hms.hotelmanagementsystem.hotelmanagementsystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Room {

    @Id
    @GeneratedValue
    private Long rId;

    @Column(nullable = false)
    private String rName;

    @Column(nullable = false)
    private String rType;

    @Column(nullable = false)
    private Double rFee;

    @Column(nullable = false)
    private Integer rMaxCount;

    @Column(nullable = false)
    private String rDescription;

    @Column(nullable = false, length = 1000)
    private String rImg1;

    @Column(length = 1000)
    private String rImg2;

    @Column(length = 1000)
    private String rImg3;

}