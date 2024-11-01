package com.hms.hotelmanagementsystem.hotelmanagementsystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Card {

    @Id
    private String cardNumber;
    @Column(nullable = false)
    private String cTyep;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String cvc;
    @Column(nullable = false)
    private Long expMonth;
    @Column(nullable = false)
    private Long expYear;
    @Column(nullable = false)
    private Double balance;
    
}