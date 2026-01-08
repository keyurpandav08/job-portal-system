package com.keyurpandav.jobber.service;

import com.keyurpandav.jobber.entity.Application;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.enums.ApplicationStatusType;
import com.keyurpandav.jobber.repository.ApplicationRepository;
import com.keyurpandav.jobber.repository.JobRepository;
import com.keyurpandav.jobber.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    // Employer Analytics
    public Map<String, Object> getEmployerAnalytics(Long employerId, LocalDate startDate, LocalDate endDate) {
        User employer = userRepository.findById(employerId)
                .orElseThrow(() -> new IllegalArgumentException("Employer not found"));

        List<Job> jobs = jobRepository.findByEmployer(employer);
        List<Application> allApplications = new ArrayList<>();
        
        for (Job job : jobs) {
            allApplications.addAll(applicationRepository.findByJob(job));
        }

        // Filter by date range if provided
        if (startDate != null || endDate != null) {
            allApplications = filterByDateRange(allApplications, startDate, endDate);
        }

        Map<String, Object> analytics = new HashMap<>();
        
        // Basic Statistics
        analytics.put("totalApplications", allApplications.size());
        analytics.put("totalJobs", jobs.size());
        analytics.put("pendingApplications", countByStatus(allApplications, ApplicationStatusType.PENDING));
        analytics.put("reviewedApplications", countByStatus(allApplications, ApplicationStatusType.REVIEWED));
        analytics.put("acceptedApplications", countByStatus(allApplications, ApplicationStatusType.ACCEPTED));
        analytics.put("rejectedApplications", countByStatus(allApplications, ApplicationStatusType.REJECTED));

        // Applications by Job
        Map<String, Long> applicationsByJob = new HashMap<>();
        for (Job job : jobs) {
            List<Application> jobApps = applicationRepository.findByJob(job);
            if (startDate != null || endDate != null) {
                jobApps = filterByDateRange(jobApps, startDate, endDate);
            }
            applicationsByJob.put(job.getTitle(), (long) jobApps.size());
        }
        analytics.put("applicationsByJob", applicationsByJob);

        // Applications Over Time (Last 30 days)
        analytics.put("applicationsOverTime", getApplicationsOverTime(allApplications, 30));

        // Status Distribution
        Map<String, Long> statusDistribution = new HashMap<>();
        statusDistribution.put("PENDING", countByStatus(allApplications, ApplicationStatusType.PENDING));
        statusDistribution.put("REVIEWED", countByStatus(allApplications, ApplicationStatusType.REVIEWED));
        statusDistribution.put("ACCEPTED", countByStatus(allApplications, ApplicationStatusType.ACCEPTED));
        statusDistribution.put("REJECTED", countByStatus(allApplications, ApplicationStatusType.REJECTED));
        analytics.put("statusDistribution", statusDistribution);

        // Top Jobs by Applications
        Map<String, Long> topJobs = applicationsByJob.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
        analytics.put("topJobs", topJobs);

        return analytics;
    }

    // Applicant Analytics
    public Map<String, Object> getApplicantAnalytics(Long applicantId, LocalDate startDate, LocalDate endDate) {
        User applicant = userRepository.findById(applicantId)
                .orElseThrow(() -> new IllegalArgumentException("Applicant not found"));

        List<Application> applications = applicationRepository.findByApplicant(applicant);

        // Filter by date range if provided
        if (startDate != null || endDate != null) {
            applications = filterByDateRange(applications, startDate, endDate);
        }

        Map<String, Object> analytics = new HashMap<>();
        
        // Basic Statistics
        analytics.put("totalApplications", applications.size());
        analytics.put("pendingApplications", countByStatus(applications, ApplicationStatusType.PENDING));
        analytics.put("reviewedApplications", countByStatus(applications, ApplicationStatusType.REVIEWED));
        analytics.put("acceptedApplications", countByStatus(applications, ApplicationStatusType.ACCEPTED));
        analytics.put("rejectedApplications", countByStatus(applications, ApplicationStatusType.REJECTED));

        // Success Rate
        long total = applications.size();
        long accepted = countByStatus(applications, ApplicationStatusType.ACCEPTED);
        double successRate = total > 0 ? (accepted * 100.0 / total) : 0.0;
        analytics.put("successRate", Math.round(successRate * 100.0) / 100.0);

        // Applications Over Time
        analytics.put("applicationsOverTime", getApplicationsOverTime(applications, 30));

        // Status Distribution
        Map<String, Long> statusDistribution = new HashMap<>();
        statusDistribution.put("PENDING", countByStatus(applications, ApplicationStatusType.PENDING));
        statusDistribution.put("REVIEWED", countByStatus(applications, ApplicationStatusType.REVIEWED));
        statusDistribution.put("ACCEPTED", countByStatus(applications, ApplicationStatusType.ACCEPTED));
        statusDistribution.put("REJECTED", countByStatus(applications, ApplicationStatusType.REJECTED));
        analytics.put("statusDistribution", statusDistribution);

        // Applications by Company (if we have employer info)
        Map<String, Long> applicationsByCompany = new HashMap<>();
        for (Application app : applications) {
            String company = app.getJob().getEmployer().getUsername();
            applicationsByCompany.put(company, applicationsByCompany.getOrDefault(company, 0L) + 1);
        }
        analytics.put("applicationsByCompany", applicationsByCompany);

        return analytics;
    }

    private long countByStatus(List<Application> applications, ApplicationStatusType status) {
        return applications.stream()
                .filter(app -> app.getStatus() == status)
                .count();
    }

    private List<Application> filterByDateRange(List<Application> applications, LocalDate startDate, LocalDate endDate) {
        return applications.stream()
                .filter(app -> {
                    if (app.getAppliedAt() == null) return false;
                    LocalDate appliedDate = app.getAppliedAt().toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                    
                    if (startDate != null && appliedDate.isBefore(startDate)) {
                        return false;
                    }
                    if (endDate != null && appliedDate.isAfter(endDate)) {
                        return false;
                    }
                    return true;
                })
                .collect(Collectors.toList());
    }

    private Map<String, Long> getApplicationsOverTime(List<Application> applications, int days) {
        Map<String, Long> overTime = new LinkedHashMap<>();
        LocalDate today = LocalDate.now();
        
        for (int i = days - 1; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            String dateKey = date.toString();
            long count = applications.stream()
                    .filter(app -> {
                        if (app.getAppliedAt() == null) return false;
                        LocalDate appliedDate = app.getAppliedAt().toInstant()
                                .atZone(ZoneId.systemDefault())
                                .toLocalDate();
                        return appliedDate.equals(date);
                    })
                    .count();
            overTime.put(dateKey, count);
        }
        
        return overTime;
    }
}

