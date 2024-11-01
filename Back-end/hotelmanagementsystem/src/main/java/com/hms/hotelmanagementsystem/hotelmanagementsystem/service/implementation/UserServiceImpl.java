package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.User;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.UserRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> saveUser(User user) {

        try{
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

            if (existingUser.isPresent()) {
                return ResponseEntity.ok("This email is already registered");
            } else {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                user.setRole("receptionist");
                userRepository.save(user);
                user.setPassword(null);
                HttpHeaders headers = new HttpHeaders();
                headers.add("status", "Success");
                return ResponseEntity
                        .ok()
                        .headers(headers)
                        .body(user);
            }
        }catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> login(String email, String password) {

        try{
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                if (passwordEncoder.matches(password, user.getPassword())) {

                    user.setPassword(null);
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("status", "Success");
                    return ResponseEntity
                            .ok()
                            .headers(headers)
                            .body(user);
                }
            }
            return null;
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getAllUsers() {

        try {
            return  ResponseEntity.ok(userRepository.findAll());

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
