package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendBookingEmail(String to, String bookingId, String roomId, String checkInDate, String checkOutDate, String gName) {
        String subject = "Booking Confirmation - " + bookingId;
        String body = String.format("Dear %s,\n\nYour booking has been confirmed.\n\nBooking Details:\n- Booking ID: %s\n- Room ID: %s\n- Check-In Date: %s\n- Check-Out Date: %s\n\nThank you for choosing us!\n\nBest regards,\nHMS Hotel Management",
                gName, bookingId, roomId, checkInDate, checkOutDate);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
