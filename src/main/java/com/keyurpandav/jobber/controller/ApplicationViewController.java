package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.entity.Application;
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

@Controller
@RequestMapping("/applications")
@RequiredArgsConstructor
@Slf4j
public class ApplicationViewController {

    private final ApplicationService applicationService;
    private final UserService userService;

    @PostMapping("/apply/{jobId}")
    public String applyForJob(@PathVariable Long jobId,
                              @RequestParam String resumeUrl,
                              RedirectAttributes redirectAttributes) {
        try {
            log.info("Applying for job ID: {}", jobId);

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated() || auth.getName().equals("anonymousUser")) {
                redirectAttributes.addFlashAttribute("error", "Please login to apply for jobs");
                return "redirect:/login";
            }

            String username = auth.getName();
            User applicant = userService.getUserByUsername(username);

            // Create application
            Application application = new Application();
            application.setApplicant(applicant);

            Job job = new Job();
            job.setId(jobId);
            application.setJob(job);

            application.setResumeUrl(resumeUrl);

            applicationService.applyToJob(application);
            redirectAttributes.addFlashAttribute("success", "✅ Application submitted successfully!");

        } catch (Exception e) {
            log.error("Application failed: {}", e.getMessage());
            redirectAttributes.addFlashAttribute("error", "❌ Application failed: " + e.getMessage());
        }
        return "redirect:/jobs";
    }
    @GetMapping("/my-applications")
    public String myApplications(Model model) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated()) {
                return "redirect:/login";
            }

            String username = auth.getName();
            User applicant = userService.getUserByUsername(username);

            var applications = applicationService.getApplicationsByUser(applicant.getId());
            model.addAttribute("applications", applications);

            if (applications.isEmpty()) {
                model.addAttribute("message", "You haven't applied to any jobs yet.");
            }

            return "my-applications";
        } catch (Exception e) {
            log.error("Error loading applications: {}", e.getMessage());
            model.addAttribute("error", "Error loading applications: " + e.getMessage());
            return "my-applications";
        }
    }
}
