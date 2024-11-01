package com.hms.hotelmanagementsystem.hotelmanagementsystem.service;

public interface EmailService {
    void sendBookingEmail(String to, String bookingId, String roomId, String checkInDate, String checkOutDate, String gName);
}
