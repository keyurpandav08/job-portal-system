package com.keyurpandav.jobber.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * Utility controller to generate BCrypt password hashes
 * This is for development/testing purposes only
 * Remove or secure this in production!
 */
@RestController
@RequestMapping("/util")
@RequiredArgsConstructor
public class PasswordUtilityController {

    private final BCryptPasswordEncoder passwordEncoder;

    /**
     * Generate BCrypt hash for a password
     * Example: GET /util/hash?password=admin123
     */
    @GetMapping("/hash")
    public String generateHash(@RequestParam String password) {
        String hash = passwordEncoder.encode(password);
        System.out.println("Password: " + password);
        System.out.println("BCrypt Hash: " + hash);
        return "Password: " + password + "\nBCrypt Hash: " + hash;
    }

    /**
     * Verify if a password matches a hash
     * Example: GET /util/verify?password=admin123&hash=$2a$10$...
     */
    @GetMapping("/verify")
    public String verifyPassword(@RequestParam String password, @RequestParam String hash) {
        boolean matches = passwordEncoder.matches(password, hash);
        return "Password matches: " + matches;
    }
}
