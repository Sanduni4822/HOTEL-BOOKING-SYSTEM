package com.hms.hotelmanagementsystem.hotelmanagementsystem.repository;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Room;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r WHERE r.rMaxCount >= :guestCount " +
            "AND r.rId NOT IN (SELECT b.rId FROM Booking b WHERE " +
            "(b.checkInDate < :checkOutDate AND b.checkOutDate > :checkInDate))")
    List<Room> findAvailableRooms(
            @Param("guestCount") int guestCount,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate);
}
