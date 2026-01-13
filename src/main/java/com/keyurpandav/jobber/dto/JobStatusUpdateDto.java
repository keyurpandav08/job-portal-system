package com.keyurpandav.jobber.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * DTO for job status update with validation
 */
@Data
public class JobStatusUpdateDto {
    
    @NotNull(message = "Job ID is required")
    private Long jobId;
    
    @NotBlank(message = "Status is required")
    @Pattern(regexp = "ACTIVE|INACTIVE|CLOSED", 
             message = "Status must be one of: ACTIVE, INACTIVE, CLOSED")
    private String status;
}