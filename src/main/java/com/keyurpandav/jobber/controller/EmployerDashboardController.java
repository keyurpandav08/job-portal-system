package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.JobService;
import com.keyurpandav.jobber.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/dashboard/employer")
@RequiredArgsConstructor
@Slf4j
public class EmployerDashboardController {

    private final JobService jobService;
    private final UserService userService;
    private final ApplicationService applicationService;

    @GetMapping
    public String employerDashboard(Model model) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            User employer = userService.getUserByUsername(username);

            // Get employer's jobs
            var jobs = jobService.getjobsbyusers(employer.getId());
            model.addAttribute("jobs", jobs);
            model.addAttribute("newJob", new Job());

            // Calculate statistics
            int totalApplications = 0;
            int openJobs = 0;
            Map<Long, Integer> applicationCounts = new HashMap<>();

            for (var job : jobs) {
                try {
                    var applications = applicationService.getApplicationsByJob(job.getId());
                    int appCount = applications.size();
                    applicationCounts.put(job.getId(), appCount);
                    totalApplications += appCount;
                    openJobs++; // Count all jobs as open for now
                } catch (Exception e) {
                    log.warn("Could not load applications for job {}: {}", job.getId(), e.getMessage());
                    applicationCounts.put(job.getId(), 0);
                }
            }

            model.addAttribute("totalApplications", totalApplications);
            model.addAttribute("openJobs", openJobs);
            model.addAttribute("totalJobs", jobs.size());
            model.addAttribute("applicationCounts", applicationCounts);

        } catch (Exception e) {
            log.error("Error loading employer dashboard: {}", e.getMessage());
            model.addAttribute("error", "Error loading dashboard: " + e.getMessage());
        }
        return "employer-dashboard";
    }

    @PostMapping("/jobs")
    public String createJob(@ModelAttribute Job job, RedirectAttributes redirectAttributes) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            User employer = userService.getUserByUsername(username);

            job.setEmployer(employer);
            jobService.CreateJobPosting(job);

            redirectAttributes.addFlashAttribute("success", "✅ Job posted successfully!");

        } catch (Exception e) {
            log.error("Error creating job: {}", e.getMessage());
            redirectAttributes.addFlashAttribute("error", "❌ Failed to post job: " + e.getMessage());
        }
        return "redirect:/dashboard/employer";
    }

    @GetMapping("/jobs/{jobId}/applications")
    public String viewJobApplications(@PathVariable Long jobId, Model model) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            User employer = userService.getUserByUsername(username);

            // Verify the job belongs to this employer
            var job = jobService.getjobsbyid(jobId);
            if (job == null || !job.getEmployerName().equals(employer.getUsername())) {
                model.addAttribute("error", "You don't have permission to view applications for this job");
                return "redirect:/dashboard/employer";
            }

            var applications = applicationService.getApplicationsByJob(jobId);
            model.addAttribute("applications", applications);
            model.addAttribute("jobTitle", job.getTitle());
            model.addAttribute("jobId", jobId);

        } catch (Exception e) {
            log.error("Error loading job applications: {}", e.getMessage());
            model.addAttribute("error", "Error loading applications: " + e.getMessage());
        }
        return "job-applications";
    }
    @PostMapping("/applications/{appId}/status")
    public String updateApplicationStatus(@PathVariable Long appId,
                                          @RequestParam String status,
                                          RedirectAttributes redirectAttributes) {
        try {
            // Convert string to enum
            com.keyurpandav.jobber.enums.ApplicationStatusType statusEnum =
                    com.keyurpandav.jobber.enums.ApplicationStatusType.valueOf(status);

            // Update application status
            applicationService.updateStatus(appId, statusEnum);

            redirectAttributes.addFlashAttribute("success", "Status updated to: " + status);

        } catch (Exception e) {
            log.error("Error updating application status: {}", e.getMessage());
            redirectAttributes.addFlashAttribute("error", "Failed to update status");
        }

        // Redirect back to the same applications page
        return "redirect:/dashboard/employer/jobs/" + getJobIdFromApplication(appId) + "/applications";
    }

    // Helper method to get job ID from application
    private Long getJobIdFromApplication(Long appId) {
        try {
            var application = applicationService.getApplicationById(appId);
            return application.getJob().getId();
        } catch (Exception e) {
            return 1L; // Default fallback
        }
    }

}