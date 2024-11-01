package com.hms.hotelmanagementsystem.hotelmanagementsystem.service;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Booking;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface BookingService {
    ResponseEntity<?> saveBooking(Booking booking);

    ResponseEntity<?> deleteBooking(Long bId);

    ResponseEntity<?> getAllBookings();

    Map<String, List<?>> fetchBookingsByDates(List<LocalDate> bookedDates);
}
