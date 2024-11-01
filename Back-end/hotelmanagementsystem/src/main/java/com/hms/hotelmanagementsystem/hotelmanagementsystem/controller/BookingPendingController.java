package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.BookingPending;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.BookingPendingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/bookingpending")
public class BookingPendingController {

    @Autowired
    private BookingPendingServiceImpl bookingPendingService;

    @PostMapping("/add")
    public ResponseEntity<?> saveBookingPending(@RequestBody BookingPending bookingPending) {
        return ResponseEntity.ok(bookingPendingService.saveBookingPending(bookingPending));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteBookingPending(@RequestParam Long bId) {
        return ResponseEntity.ok(bookingPendingService.deleteBookingPending(bId));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPendingBookings() {
        return ResponseEntity.ok(bookingPendingService.getAllPendingBookings());
    }
}
