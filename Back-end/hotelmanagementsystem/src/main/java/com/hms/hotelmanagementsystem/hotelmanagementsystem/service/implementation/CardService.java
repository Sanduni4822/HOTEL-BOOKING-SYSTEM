package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Card;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    @Transactional
    public String processPayment(String cardNumber, String cvc, Double amount, String cardType, String name, Long expMonth, Long expYear) {
        Card card = cardRepository.findById(cardNumber).orElse(null);

        if (card == null) {
            return "Card not found";
        }
        if (!card.getExpMonth().equals(expMonth) || !card.getExpYear().equals(expYear)) {
            return "Expiration date does not match";
        }
        LocalDate currentDate = LocalDate.now();
        LocalDate expirationDate = LocalDate.of(card.getExpYear().intValue(), card.getExpMonth().intValue(), 1);
        if (expirationDate.isBefore(currentDate)) {
            return "Card is expired";
        }
        if (!card.getCvc().equals(cvc) || !card.getName().equals(name) || !card.getCTyep().equals(cardType)) {
            return "Card details do not match";
        }
        if (card.getBalance() < amount) {
            return "Insufficient balance";
        }
        card.setBalance(card.getBalance() - amount);
        cardRepository.save(card);

        return "Payment processed successfully";
    }
}
