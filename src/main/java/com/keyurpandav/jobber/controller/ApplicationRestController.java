package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.ApplicationDto;
import com.keyurpandav.jobber.entity.Application;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/applications") // Base path for application APIs
@RequiredArgsConstructor
public class ApplicationRestController {

    private final ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyToJob(@RequestBody Map<String, Long> payload) {
        try {
            Long userId = payload.get("userId");
            Long jobId = payload.get("jobId");

            if (userId == null || jobId == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "UserId and JobId are required."));
            }

            // Construct minimal entity for Service
            Application appRequest = new Application();
            User applicant = new User();
            applicant.setId(userId);
            
            Job job = new Job();
            job.setId(jobId);
            
            appRequest.setApplicant(applicant);
            appRequest.setJob(job);
            
            // Resume URL is optional/placeholder for now
            appRequest.setResumeUrl("resume_placeholder.pdf");

            ApplicationDto createdApp = applicationService.applyToJob(appRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdApp);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Application failed: " + e.getMessage()));
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
