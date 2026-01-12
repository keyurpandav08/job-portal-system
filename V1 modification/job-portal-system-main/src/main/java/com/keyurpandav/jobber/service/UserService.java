package com.keyurpandav.jobber.service;

import com.keyurpandav.jobber.dto.UserDto;
import com.keyurpandav.jobber.entity.Role;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.repository.RoleRepository;
import com.keyurpandav.jobber.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDto register(User user){
        // Check for duplicate username or email
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists: " + user.getUsername());
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered: " + user.getEmail());
        }

        if(user.getRole() == null){
            user.setRole(roleRepository.findByName("APPLICANT")
                    .orElseThrow(() -> new RuntimeException("Default role missing")));
        }else{
            Role r = roleRepository.findById(user.getRole().getId())
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            user.setRole(r);
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return UserDto.toDto(userRepository.save(user));
    }

    public List<UserDto> getAll(){
        return userRepository.findAll().stream().map(UserDto::toDto).toList();
    }

    public UserDto getByEmail(String email){
        return userRepository.findByEmail(email).map(UserDto::toDto)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }

    // Validate raw password against encoded password
    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
