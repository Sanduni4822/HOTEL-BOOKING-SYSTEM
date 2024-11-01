package com.hms.hotelmanagementsystem.hotelmanagementsystem.service;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.BookingPending;
import org.springframework.http.ResponseEntity;

public interface BookingPendingService {
    ResponseEntity<?> saveBookingPending(BookingPending bookingPending);

    ResponseEntity<?> deleteBookingPending(Long bId);

    ResponseEntity<?> getAllPendingBookings();
}
