package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.BookingPending;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.BookingPendingRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.BookingPendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BookingPendingServiceImpl implements BookingPendingService {

    @Autowired
    private BookingPendingRepository bookingPendingRepository;

    @Override
    public ResponseEntity<?> saveBookingPending(BookingPending bookingPending) {

        try {
            return ResponseEntity.ok(bookingPendingRepository.save(bookingPending));
        }catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> deleteBookingPending(Long bId) {
        try {
            if (!bookingPendingRepository.existsById(bId)) {
                return ResponseEntity.ok("Pending booking not found with id " + bId);
            }
            bookingPendingRepository.deleteById(bId);
            return ResponseEntity.ok("Successfully deleted pending booking with id " + bId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getAllPendingBookings() {

        try {
            return  ResponseEntity.ok(bookingPendingRepository.findAll());

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
