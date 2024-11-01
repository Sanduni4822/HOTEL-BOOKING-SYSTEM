package com.hms.hotelmanagementsystem.hotelmanagementsystem.service;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Review;
import org.springframework.http.ResponseEntity;

public interface ReviewService {
    ResponseEntity<?> saveReview(Review review);

    ResponseEntity<?> getAllReviews();

    ResponseEntity<?> getReviewById(Long revId);

    ResponseEntity<?> deleteReview(Long revId);
}
