package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Room;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.RoomServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/room")
public class RoomController {

    @Autowired
    private RoomServiceImpl roomService;

    @PostMapping("/add")
    public ResponseEntity<?> saveRoom(@RequestBody Room room) {
        return ResponseEntity.ok(roomService.saveRoom(room));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/byid")
    public ResponseEntity<?> getRoomById(@RequestParam Long rId) {
        return ResponseEntity.ok(roomService.getRoomById(rId));
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateRoom(@RequestParam Long rId, @RequestBody Room roomDetails) {
        try {
            return ResponseEntity.ok(roomService.updateRoom(rId, roomDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteRoom(@RequestParam Long rId) {
        return ResponseEntity.ok(roomService.deleteRoom(rId));
    }

    @GetMapping("/availability")
    public List<Room> checkRoomAvailability(
            @RequestParam int guestCount,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {

        return roomService.checkRoomAvailability(guestCount, checkInDate, checkOutDate);
    }
}
