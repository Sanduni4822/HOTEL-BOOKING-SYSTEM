package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/email")
public class EmailController {

    @Autowired
    private EmailServiceImpl emailService;

    @PostMapping("/confirmation")
    public String sendBookingEmail(
            @RequestParam String to,
            @RequestParam String bookingId,
            @RequestParam String roomId,
            @RequestParam String checkInDate,
            @RequestParam String checkOutDate,
            @RequestParam String gName) {

        emailService.sendBookingEmail(to, bookingId, roomId, checkInDate, checkOutDate, gName);
        return "Booking confirmation email sent successfully!";
    }
}
