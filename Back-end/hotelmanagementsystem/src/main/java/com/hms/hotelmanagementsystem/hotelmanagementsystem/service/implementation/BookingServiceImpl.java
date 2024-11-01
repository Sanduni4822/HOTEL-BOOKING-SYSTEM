package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Booking;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.BookingPending;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.BookingPendingRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.BookingRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingPendingRepository bookingPendingRepository;

    @Override
    public ResponseEntity<?> saveBooking(Booking booking) {

        try {
            return ResponseEntity.ok(bookingRepository.save(booking));
        }catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> deleteBooking(Long bId) {
        try {
            if (!bookingRepository.existsById(bId)) {
                return ResponseEntity.ok("Booking not found with id " + bId);
            }
            bookingRepository.deleteById(bId);
            return ResponseEntity.ok("Successfully deleted booking with id " + bId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getAllBookings() {

        try {
            return  ResponseEntity.ok(bookingRepository.findAll());

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public Map<String, List<?>> fetchBookingsByDates(List<LocalDate> bookedDates) {
        List<Booking> confirmedBookings = bookingRepository.findByBookedDates(bookedDates);
        List<BookingPending> pendingBookings = bookingPendingRepository.findByBookedDates(bookedDates);

        Map<String, List<?>> bookings = new HashMap<>();
        bookings.put("confirmedBookings", confirmedBookings);
        bookings.put("pendingBookings", pendingBookings);

        return bookings;
    }
}
