package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.JobDto;
import com.keyurpandav.jobber.dto.UserDto;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.enums.StatusType;
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
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/dashboard/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminDashboardController {

    private final UserService userService;
    private final JobService jobService;
    private final ApplicationService applicationService;

    @GetMapping
    public String adminDashboard(Model model) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            User admin = userService.getUserByUsername(username);

            // Get all users
            List<UserDto> users = userService.getAll();
            
            // Get all jobs
            List<JobDto> jobs = jobService.getAllJobs();
            
            // Calculate statistics
            long totalUsers = users.size();
            long totalJobs = jobs.size();
            long totalApplications = applicationService.getAllApplications().size();
            
            // Count users by role
            Map<String, Long> usersByRole = new HashMap<>();
            for (UserDto user : users) {
                String roleName = user.getRoleName() != null ? user.getRoleName() : "N/A";
                usersByRole.put(roleName, usersByRole.getOrDefault(roleName, 0L) + 1);
            }
            
            // Count jobs by status
            Map<String, Long> jobsByStatus = new HashMap<>();
            for (JobDto job : jobs) {
                String status = job.getStatus() != null ? job.getStatus().toString() : "N/A";
                jobsByStatus.put(status, jobsByStatus.getOrDefault(status, 0L) + 1);
            }

            model.addAttribute("admin", admin);
            model.addAttribute("users", users);
            model.addAttribute("jobs", jobs);
            model.addAttribute("totalUsers", totalUsers);
            model.addAttribute("totalJobs", totalJobs);
            model.addAttribute("totalApplications", totalApplications);
            model.addAttribute("usersByRole", usersByRole);
            model.addAttribute("jobsByStatus", jobsByStatus);

        } catch (Exception e) {
            log.error("Error loading admin dashboard: {}", e.getMessage());
            model.addAttribute("error", "Error loading dashboard: " + e.getMessage());
        }
        return "admin-dashboard";
    }

    @PostMapping("/users/{userId}/delete")
    public String deleteUser(@PathVariable Long userId, RedirectAttributes redirectAttributes) {
        try {
            userService.deleteUser(userId);
            redirectAttributes.addFlashAttribute("success", "User deleted successfully!");
        } catch (Exception e) {
            log.error("Error deleting user: {}", e.getMessage());
            redirectAttributes.addFlashAttribute("error", "Failed to delete user: " + e.getMessage());
        }
        return "redirect:/dashboard/admin";
    }

    @PostMapping("/jobs/{jobId}/delete")
    public String deleteJob(@PathVariable Long jobId, RedirectAttributes redirectAttributes) {
        try {
            jobService.deletejobs(jobId);
            redirectAttributes.addFlashAttribute("success", "Job deleted successfully!");
        } catch (Exception e) {
            log.error("Error deleting job: {}", e.getMessage());
            redirectAttributes.addFlashAttribute("error", "Failed to delete job: " + e.getMessage());
        }
        return "redirect:/dashboard/admin";
    }

    @PostMapping("/jobs/{jobId}/status")
    public String updateJobStatus(@PathVariable Long jobId,
                                  @RequestParam String status,
                                  RedirectAttributes redirectAttributes) {
        try {
            // Convert string to enum
            StatusType statusEnum = StatusType.valueOf(status);
            
            // Update job status using service
            jobService.updateJobStatus(jobId, statusEnum);
            
            redirectAttributes.addFlashAttribute("success", "Job status updated to: " + status);

        } catch (Exception e) {
            log.error("Error updating job status: {}", e.getMessage());
            redirectAttributes.addFlashAttribute("error", "Failed to update job status");
        }
        return "redirect:/dashboard/admin";
    }
}
