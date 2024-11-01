package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/card")
public class CardController {

    @Autowired
    private CardService cardService;

    @PostMapping("/pay")
    public String processPayment(@RequestParam String cardNumber,
                                 @RequestParam String cvc,
                                 @RequestParam Double amount,
                                 @RequestParam String cardType,
                                 @RequestParam String name,
                                 @RequestParam Long expMonth,
                                 @RequestParam Long expYear) {
        return cardService.processPayment(cardNumber, cvc, amount, cardType, name, expMonth, expYear);
    }
}
