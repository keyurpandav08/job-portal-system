package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.ApplicationDto;
import com.keyurpandav.jobber.dto.ApplicationRequestDto;
import com.keyurpandav.jobber.entity.Application;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/applications") // Base path for application APIs
@RequiredArgsConstructor
public class ApplicationRestController {

    private final ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyToJob(@Valid @RequestBody ApplicationRequestDto applicationRequest, 
                                       BindingResult bindingResult) {
        
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> 
                errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        
        try {
            // Construct minimal entity for Service
            Application appRequest = new Application();
            User applicant = new User();
            applicant.setId(applicationRequest.getUserId());
            
            Job job = new Job();
            job.setId(applicationRequest.getJobId());
            
            appRequest.setApplicant(applicant);
            appRequest.setJob(job);
            
            // Set optional fields if provided
            if (applicationRequest.getCoverLetter() != null) {
                appRequest.setCoverLetter(applicationRequest.getCoverLetter());
            }
            if (applicationRequest.getResumeUrl() != null) {
                appRequest.setResumeUrl(applicationRequest.getResumeUrl());
            } else {
                appRequest.setResumeUrl("resume_placeholder.pdf");
            }

            ApplicationDto createdApp = applicationService.applyToJob(appRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdApp);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Application failed: " + e.getMessage()));
        }
    }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getMyApplications(@PathVariable Long userId) {
        try {
            List<ApplicationDto> apps = applicationService.getApplicationsByUser(userId);
            return ResponseEntity.ok(apps);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
