package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.ApplicationDto;
import com.keyurpandav.jobber.entity.Application;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.EmailService;
import com.keyurpandav.jobber.service.ResumeParserService;
import com.keyurpandav.jobber.service.UserService;
import com.keyurpandav.jobber.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationRestController {

    private final ApplicationService applicationService;
    private final ResumeParserService resumeParserService;
    private final EmailService emailService;
    private final UserService userService;
    private final JobRepository jobRepository;

    @PostMapping("/apply")
    public ResponseEntity<?> applyToJob(
            @RequestParam("userId") Long userId,
            @RequestParam("jobId") Long jobId,
            @RequestParam("resume") MultipartFile resumeFile
    ) {
        try {
            /* =====================
               1. Validate User & Job
               ===================== */
            User applicant = userService.getUserById(userId);
            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));

            /* =====================
               2. Parse Resume
               ===================== */
            String extractedResumeText = resumeParserService.extractContent(resumeFile);

            /* =====================
               3. Create Application
               ===================== */
            Application application = new Application();
            application.setApplicant(applicant);
            application.setJob(job);
            application.setResumeUrl(resumeFile.getOriginalFilename());

            ApplicationDto createdApplication =
                    applicationService.applyToJob(application);

            /* =====================
               4. Send Email (SAFE)
               ===================== */
            try {
                emailService.sendApplicationConfirmation(
                        applicant.getEmail(),
                        job.getTitle()
                );
            } catch (Exception mailEx) {
                // Email failure should NOT break application flow
                System.err.println("Email sending failed: " + mailEx.getMessage());
            }

            /* =====================
               5. Resume Preview (NULL SAFE)
               ===================== */
            String resumePreview =
                    (extractedResumeText == null || extractedResumeText.isBlank())
                            ? "No resume text extracted"
                            : extractedResumeText.substring(
                            0, Math.min(extractedResumeText.length(), 200)
                    ) + "...";

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of(
                            "application", createdApplication,
                            "parsedResumePreview", resumePreview
                    )
            );

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(
                    Map.of("error", "Application failed: " + e.getMessage())
            );
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getMyApplications(@PathVariable Long userId) {
        try {
            List<ApplicationDto> applications =
                    applicationService.getApplicationsByUser(userId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", e.getMessage())
            );
        }
    }
}
