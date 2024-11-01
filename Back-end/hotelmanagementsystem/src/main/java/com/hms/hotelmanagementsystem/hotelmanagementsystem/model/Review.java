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
public class Review {

    @Id
    @GeneratedValue
    private Long revId;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private LocalDate postDay;
    @Column(nullable = false)
    private Integer rate;
    @Column(nullable = false)
    private String review;
    @Column(nullable = false)
    private LocalDate goDay;
    @Column(nullable = false)
    private String goWithWho;
    @Column(nullable = false)
    private String reviewTitle;
    private String img1;
    private String img2;
    private String img3;
    
}