package com.hms.hotelmanagementsystem.hotelmanagementsystem.service;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Room;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

public interface RoomService {
    ResponseEntity<?> saveRoom(Room room);

    ResponseEntity<?> getAllRooms();

    ResponseEntity<?> getRoomById(Long rId);

    ResponseEntity<?> updateRoom(Long rId, Room roomDetails);

    ResponseEntity<?> deleteRoom(Long rId);

    List<Room> checkRoomAvailability(int guestCount, LocalDate checkInDate, LocalDate checkOutDate);
}
