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

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    public ApplicationDto applyToJob(Application mydata) {
        User user = userRepository.findById(mydata.getApplicant().getId())
                .orElseThrow(() -> new IllegalArgumentException("No User Found with ID: " + mydata.getApplicant().getId()));

        Job job = jobRepository.findById(mydata.getJob().getId())
                .orElseThrow(() -> new IllegalArgumentException("No Job Found with ID: " + mydata.getJob().getId()));

        Application application = new Application();

        applicationRepository.findByApplicantAndJob(user, job)
                .ifPresent(existing -> {
                    throw new IllegalArgumentException("You have already applied for this job.");
                });

        application.setApplicant(user);
        application.setJob(job);
        application.setStatus(ApplicationStatusType.PENDING);
        application.setAppliedAt(Timestamp.valueOf(LocalDateTime.now()));
        application.setResumeUrl(mydata.getResumeUrl());

        Application savedApplication = applicationRepository.save(application);
        return ApplicationDto.toDto(savedApplication);
    }

    public List<ApplicationDto> getApplicationsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("No User Found with ID: " + userId));

        List<Application> applications = applicationRepository.findByApplicant(user);
        return applications.stream()
                .map(ApplicationDto::toDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getApplicationsByJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("No Job Found with ID: " + jobId));

        List<Application> applications = applicationRepository.findByJob(job);
        return applications.stream()
                .map(ApplicationDto::toDto)
                .collect(Collectors.toList());
    }
    public boolean deletebyid(Long appId) {
        User user = userRepository.findById(appId)
                .orElseThrow(() -> new IllegalArgumentException("No User Found with ID: " + appId));
        applicationRepository.deleteById(appId);
        return true;
    }
    public ApplicationDto updateStatus(Long appId, ApplicationStatusType updatedStatus) {
        Application application = applicationRepository.findById(appId)
                .orElseThrow(() -> new IllegalArgumentException("No Application Found with ID: " + appId));

        application.setStatus(updatedStatus);
        Application saved = applicationRepository.save(application);
        return ApplicationDto.toDto(saved);
    }

    // Add this method if not exists
    public Application getApplicationById(Long appId) {
        return applicationRepository.findById(appId)
                .orElseThrow(() -> new IllegalArgumentException("No Application Found with ID: " + appId));
    }

    public List<ApplicationDto> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(ApplicationDto::toDto)
                .collect(Collectors.toList());
    }

}