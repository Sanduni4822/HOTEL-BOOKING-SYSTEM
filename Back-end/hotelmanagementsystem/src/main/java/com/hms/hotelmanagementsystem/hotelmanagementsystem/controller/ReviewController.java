package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Review;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.ReviewServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/review")
public class ReviewController {

    @Autowired
    private ReviewServiceImpl reviewService;

    @PostMapping("/add")
    public ResponseEntity<?> saveReview(@RequestBody Review review) {
        return ResponseEntity.ok(reviewService.saveReview(review));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/byid")
    public ResponseEntity<?> getReviewById(@RequestParam Long revId) {
        return ResponseEntity.ok(reviewService.getReviewById(revId));
    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteReview(@RequestParam Long revId) {
        return ResponseEntity.ok(reviewService.deleteReview(revId));
    }


}
