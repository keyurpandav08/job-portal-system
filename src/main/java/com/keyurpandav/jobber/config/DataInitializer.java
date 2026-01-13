package com.keyurpandav.jobber.config;

import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.enums.UserRole;
import com.keyurpandav.jobber.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("admin@careerlink.com").isEmpty()) {
            User admin = new User();
            // name setter not present on User; omit setting name or use existing API on User if available
            admin.setEmail("admin@careerlink.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(UserRole.ADMIN);
            userRepository.save(admin);
        }
    }
}
