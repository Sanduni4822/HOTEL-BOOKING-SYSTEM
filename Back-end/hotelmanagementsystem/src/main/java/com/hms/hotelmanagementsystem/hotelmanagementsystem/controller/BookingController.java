package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Booking;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.BookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/booking")
public class BookingController {

    @Autowired
    private BookingServiceImpl bookingService;

    @PostMapping("/add")
    public ResponseEntity<?> saveBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.saveBooking(booking));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteBooking(@RequestParam Long bId) {
        return ResponseEntity.ok(bookingService.deleteBooking(bId));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/filter")
    public Map<String, List<?>> fetchBookingsByDates(
            @RequestParam("bookedDates") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) List<LocalDate> bookedDates) {

        return bookingService.fetchBookingsByDates(bookedDates);
    }
}
