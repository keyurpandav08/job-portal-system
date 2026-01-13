package com.keyurpandav.jobber.service;

import com.keyurpandav.jobber.dto.ApplicationDto;
import com.keyurpandav.jobber.entity.Application;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.enums.ApplicationStatusType;
import com.keyurpandav.jobber.repository.ApplicationRepository;
import com.keyurpandav.jobber.repository.JobRepository;
import com.keyurpandav.jobber.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResumeParserService resumeParserService;

    // ================= APPLY TO JOB (WITH RESUME PARSING) =================
    public ApplicationDto applyToJob(Application mydata, MultipartFile resumeFile) {

        User user = userRepository.findById(mydata.getApplicant().getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("No User Found with ID: " + mydata.getApplicant().getId()));

        Job job = jobRepository.findById(mydata.getJob().getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("No Job Found with ID: " + mydata.getJob().getId()));

        // Prevent duplicate application
        applicationRepository.findByApplicantAndJob(user, job)
                .ifPresent(existing -> {
                    throw new IllegalArgumentException("You have already applied for this job.");
                });

        Application application = new Application();
        application.setApplicant(user);
        application.setJob(job);
        application.setStatus(ApplicationStatusType.PENDING);
        application.setAppliedAt(Timestamp.valueOf(LocalDateTime.now()));
        application.setResumeUrl(mydata.getResumeUrl());

        // 🔥 Resume Parsing
        if (resumeFile != null && !resumeFile.isEmpty()) {
            String extractedSkills = resumeParserService.extractSkills(resumeFile);
            application.setExtractedSkills(extractedSkills);
        }

        Application savedApplication = applicationRepository.save(application);
        return ApplicationDto.toDto(savedApplication);
    }

    // ================= GET APPLICATIONS BY USER =================
    public List<ApplicationDto> getApplicationsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("No User Found with ID: " + userId));

        return applicationRepository.findByApplicant(user)
                .stream()
                .map(ApplicationDto::toDto)
                .collect(Collectors.toList());
    }

    // ================= GET APPLICATIONS BY JOB =================
    public List<ApplicationDto> getApplicationsByJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new IllegalArgumentException("No Job Found with ID: " + jobId));

        return applicationRepository.findByJob(job)
                .stream()
                .map(ApplicationDto::toDto)
                .collect(Collectors.toList());
    }

    // ================= DELETE APPLICATION =================
    public boolean deletebyid(Long appId) {
        Application application = applicationRepository.findById(appId)
                .orElseThrow(() ->
                        new IllegalArgumentException("No Application Found with ID: " + appId));

        applicationRepository.delete(application);
        return true;
    }

    // ================= UPDATE APPLICATION STATUS =================
    public ApplicationDto updateStatus(Long appId, ApplicationStatusType updatedStatus) {
        Application application = applicationRepository.findById(appId)
                .orElseThrow(() ->
                        new IllegalArgumentException("No Application Found with ID: " + appId));

        application.setStatus(updatedStatus);
        Application saved = applicationRepository.save(application);
        return ApplicationDto.toDto(saved);
    }

    // ================= ACCEPT APPLICATION & SEND EMAIL =================
    public void acceptApplication(Long applicationId) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() ->
                        new IllegalArgumentException("No Application Found with ID: " + applicationId));

        application.setStatus(ApplicationStatusType.ACCEPTED);
        applicationRepository.save(application);

        // 🔥 Email Notification
        emailService.sendAcceptanceMail(
                application.getApplicant().getEmail(),
                application.getJob().getTitle()
        );
    }

    // ================= GET APPLICATION BY ID =================
    public Application getApplicationById(Long appId) {
        return applicationRepository.findById(appId)
                .orElseThrow(() ->
                        new IllegalArgumentException("No Application Found with ID: " + appId));
    }
}
