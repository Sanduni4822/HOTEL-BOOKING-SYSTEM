package com.hms.hotelmanagementsystem.hotelmanagementsystem.repository;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Booking;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.BookingPending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingPendingRepository extends JpaRepository<BookingPending, Long> {

    @Query("SELECT bp FROM BookingPending bp WHERE bp.bookedDate IN :bookedDates")
    List<BookingPending> findByBookedDates(@Param("bookedDates") List<LocalDate> bookedDates);

}
