package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.ApplicationDto;
import com.keyurpandav.jobber.entity.Application;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.enums.ApplicationStatusType;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.JobService;
import com.keyurpandav.jobber.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@Slf4j
public class ApplicationApiController {

    private final ApplicationService applicationService;
    private final UserService userService;
    private final JobService jobService;

    /**
     * GET - Get Applications for a Job (Employer)
     * Endpoint: GET /api/applications/job/{jobId}?username={username}
     */
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getApplicationsForJob(
            @PathVariable Long jobId,
            @RequestParam String username) {
        try {
            var employer = userService.getUserByUsername(username);
            var job = jobService.getjobsbyid(jobId);
            
            // Verify ownership
            if (!job.getEmployerName().equals(username)) {
                return ResponseEntity.status(403)
                    .body(Map.of("error", "You don't have permission to view these applications"));
            }

            var applications = applicationService.getApplicationsByJob(jobId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "jobId", jobId,
                "jobTitle", job.getTitle(),
                "count", applications.size(),
                "applications", applications
            ));
        } catch (Exception e) {
            log.error("Error fetching applications: {}", e.getMessage());
            return ResponseEntity.status(500)
                .body(Map.of("error", "Failed to fetch applications: " + e.getMessage()));
        }
    }


    /**
     * POST - Apply to Job
     * Endpoint: POST /api/applications/apply
     * Body: { "jobId": 1, "username": "...", "resumeUrl": "..." }
     */
    @PostMapping("/apply")
    public ResponseEntity<?> applyToJob(@RequestBody Map<String, Object> applicationData) {
        try {
            Long jobId = Long.valueOf(applicationData.get("jobId").toString());
            String username = applicationData.get("username").toString();
            String resumeUrl = applicationData.get("resumeUrl").toString();

            var applicant = userService.getUserByUsername(username);
            
            Application application = new Application();
            application.setApplicant(applicant);
            
            Job job = new Job();
            job.setId(jobId);
            application.setJob(job);
            application.setResumeUrl(resumeUrl);

            var saved = applicationService.applyToJob(application);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Application submitted successfully",
                "application", saved
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400)
                .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            log.error("Error applying to job: {}", e.getMessage());
            return ResponseEntity.status(500)
                .body(Map.of("error", "Failed to submit application: " + e.getMessage()));
        }
    }

    /**
     * GET - Get Application Details
     * Endpoint: GET /api/applications/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicationDetails(@PathVariable Long id) {
        try {
            var application = applicationService.getApplicationById(id);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "application", Map.of(
                    "id", application.getId(),
                    "jobId", application.getJob().getId(),
                    "jobTitle", application.getJob().getTitle(),
                    "applicantName", application.getApplicant().getUsername(),
                    "resumeUrl", application.getResumeUrl(),
                    "status", application.getStatus(),
                    "appliedAt", application.getAppliedAt()
                )
            ));
        } catch (Exception e) {
            log.error("Error fetching application: {}", e.getMessage());
            return ResponseEntity.status(404)
                .body(Map.of("error", "Application not found"));
        }
    }

    /**
     * PUT - Update Application Status (Accept/Reject)
     * Endpoint: PUT /api/applications/{id}/status
     * Body: { "status": "ACCEPTED" or "REJECTED" }
     */
    @PutMapping("/{id}/status")
    public ApplicationDto updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String,String> body,
            @RequestParam String username) {   // employer username
        return applicationService.updateStatus(
                id,
                ApplicationStatusType.valueOf(body.get("status")),
                username);
    }
    /**
     * DELETE - Cancel My Application
     * Endpoint: DELETE /api/applications/{id}?username={username}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelMyApplication(
            @PathVariable Long id,
            @RequestParam String username) {
        try {
            var application = applicationService.getApplicationById(id);
            
            // Verify ownership
            if (!application.getApplicant().getUsername().equals(username)) {
                return ResponseEntity.status(403)
                    .body(Map.of("error", "You don't have permission to cancel this application"));
            }

            boolean deleted = applicationService.deletebyid(id);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Application cancelled successfully",
                "deleted", deleted
            ));
        } catch (Exception e) {
            log.error("Error cancelling application: {}", e.getMessage());
            return ResponseEntity.status(500)
                .body(Map.of("error", "Failed to cancel application: " + e.getMessage()));
        }
    }


    /**
     * GET - Get My Application Count
     * Endpoint: GET /api/applications/count?username={username}
     */
    @GetMapping("/count")
    public ResponseEntity<?> getMyApplicationCount(@RequestParam String username) {
        try {
            var user = userService.getUserByUsername(username);
            var applications = applicationService.getApplicationsByUser(user.getId());

            // Count by status
            Map<String, Long> statusCounts = new HashMap<>();

            statusCounts.put("PENDING",
                    applications.stream()
                            .filter(app -> "PENDING".equalsIgnoreCase(app.getStatus()))
                            .count()
            );

            statusCounts.put("ACCEPTED",
                    applications.stream()
                            .filter(app -> "ACCEPTED".equalsIgnoreCase(app.getStatus()))
                            .count()
            );

            statusCounts.put("REJECTED",
                    applications.stream()
                            .filter(app -> "REJECTED".equalsIgnoreCase(app.getStatus()))
                            .count()
            );


            return ResponseEntity.ok(Map.of(
                "success", true,
                "totalCount", applications.size(),
                "statusCounts", statusCounts
            ));
        } catch (Exception e) {
            log.error("Error fetching application count: {}", e.getMessage());
            return ResponseEntity.status(500)
                .body(Map.of("error", "Failed to fetch count: " + e.getMessage()));
        }
    }

    /**
     * GET - Filter Applications (Optional)
     * Endpoint: GET /api/applications/filter?username={username}&status={status}
     */
    @GetMapping("/filter")
    public ResponseEntity<?> filterApplications(
            @RequestParam String username,
            @RequestParam(required = false) String status) {
        try {
            var user = userService.getUserByUsername(username);
            var applications = applicationService.getApplicationsByUser(user.getId());

            // Filter by status if provided
            if (status != null && !status.isEmpty()) {

                String filterStatus = status.toUpperCase();

                applications = applications.stream()
                        .filter(app -> app.getStatus().equalsIgnoreCase(filterStatus))
                        .toList();
            }


            return ResponseEntity.ok(Map.of(
                "success", true,
                "count", applications.size(),
                "filter", status != null ? status : "ALL",
                "applications", applications
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400)
                .body(Map.of("error", "Invalid status value"));
        } catch (Exception e) {
            log.error("Error filtering applications: {}", e.getMessage());
            return ResponseEntity.status(500)
                .body(Map.of("error", "Failed to filter applications: " + e.getMessage()));
        }
    }
}