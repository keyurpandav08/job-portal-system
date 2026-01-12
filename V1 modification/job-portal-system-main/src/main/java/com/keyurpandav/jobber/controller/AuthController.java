package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final UserService userService;


    /**
     * GET - Get Logged-in User (Profile)
     * Endpoint: GET /auth/profile?username={username}
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getLoggedInUser(@RequestParam String username) {
        try {
            User user = userService.getUserByUsername(username);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "user", Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "role", user.getRole().getName()
                )
            ));
        } catch (Exception e) {
            log.error("Error fetching user profile: {}", e.getMessage());
            return ResponseEntity.status(404)
                .body(Map.of("error", "User not found: " + e.getMessage()));
        }
    }

    /**
     * POST - Login User
     * Endpoint: POST /auth/login
     * Body: { "username": "...", "password": "..." }
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = credentials.get("password");

            // Validate credentials
            User user = userService.getUserByUsername(username);
            boolean isValidPassword = userService.validatePassword(password, user.getPassword());

            if (!isValidPassword) {
                return ResponseEntity.status(401)
                    .body(Map.of("error", "Invalid username or password"));
            }

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "user", Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "role", user.getRole().getName()
                )
            ));
        } catch (Exception e) {
            log.error("Login error: {}", e.getMessage());
            return ResponseEntity.status(401)
                .body(Map.of("error", "Invalid username or password"));
        }
    }

    /**
     * POST - Register User
     * Endpoint: POST /auth/register
     * Body: User object
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            var registeredUser = userService.register(user);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Registration successful",
                "user", registeredUser
            ));
        } catch (Exception e) {
            log.error("Registration error: {}", e.getMessage());
            return ResponseEntity.status(400)
                .body(Map.of("error", "Registration failed: " + e.getMessage()));
        }
    }
}