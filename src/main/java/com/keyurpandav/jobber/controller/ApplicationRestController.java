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
            String extractedResumeText = resumeParserService.extractContent(resumeFile);
            System.out.println("--- Extracted Resume Content ---\n" + extractedResumeText);
            // Can save it to database if want

            Application appRequest = new Application();
            User applicant = new User();
            applicant.setId(userId);
            
            Job job = new Job();
            job.setId(jobId);
            
            appRequest.setApplicant(applicant);
            appRequest.setJob(job);
            appRequest.setResumeUrl(resumeFile.getOriginalFilename()); // Can also save file to S3/Disk

            ApplicationDto createdApp = applicationService.applyToJob(appRequest);

            User fullUser = userService.getUserById(userId);
            Job fullJob = jobRepository.findById(jobId).orElseThrow();
            
            emailService.sendApplicationConfirmation(fullUser.getEmail(), fullJob.getTitle());

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "application", createdApp,
                "parsedResumePreview", extractedResumeText.substring(0, Math.min(extractedResumeText.length(), 200)) + "..."
            ));

        } catch (Exception e) {
            e.printStackTrace();
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