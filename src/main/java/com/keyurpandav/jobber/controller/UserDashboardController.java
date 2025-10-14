package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/dashboard/user")
@RequiredArgsConstructor
public class UserDashboardController {

    private final UserService userService;
    private final ApplicationService applicationService;

    @GetMapping
    public String userDashboard(Model model) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            User user = userService.getUserByUsername(username);

            // Get user applications
            var applications = applicationService.getApplicationsByUser(user.getId());

            model.addAttribute("user", user);
            model.addAttribute("applications", applications);

        } catch (Exception e) {
            model.addAttribute("error", "Error loading dashboard: " + e.getMessage());
        }
        return "user-dashboard";
    }
}