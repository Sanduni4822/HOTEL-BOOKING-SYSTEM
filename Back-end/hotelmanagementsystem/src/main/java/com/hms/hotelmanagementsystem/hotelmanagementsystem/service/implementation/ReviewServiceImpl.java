package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Review;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.ReviewRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public ResponseEntity<?> saveReview(Review review) {

        try {
            return ResponseEntity.ok(reviewRepository.save(review));
        }catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getAllReviews() {

        try {
            return  ResponseEntity.ok(reviewRepository.findAll());

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getReviewById(Long revId) {

        try {
            return ResponseEntity.ok(reviewRepository.findById(revId));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> deleteReview(Long revId) {
        try {
            if (!reviewRepository.existsById(revId)) {
                return ResponseEntity.ok("Review not found with id " + revId);
            }
            reviewRepository.deleteById(revId);
            return ResponseEntity.ok("Successfully deleted review with id " + revId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



}
