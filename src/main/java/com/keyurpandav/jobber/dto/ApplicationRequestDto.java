package com.keyurpandav.jobber.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO for job application requests with validation
 */
@Data
public class ApplicationRequestDto {
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotNull(message = "Job ID is required") 
    private Long jobId;
    
    private String coverLetter; // Optional cover letter
    private String resumeUrl;   // Optional resume URL
}