package com.keyurpandav.jobber.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * DTO for user login with validation
 */
@Data
public class LoginRequestDto {
    
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}