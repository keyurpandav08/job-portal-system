package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.Role;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.repository.RoleRepository;
import com.keyurpandav.jobber.service.JobService;
import com.keyurpandav.jobber.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {

    private final JobService jobService;
    private final UserService userService;
    private final RoleRepository roleRepository;

    @GetMapping("/")
    public String home() {
        return "redirect:/home";
    }

    @GetMapping("/home")
    public String homePage(Model model) {
        model.addAttribute("message", "Welcome to Job Portal");
        return "home";
    }

    @GetMapping("/login")
    public String loginPage(@RequestParam(value = "error", required = false) String error,
                            @RequestParam(value = "logout", required = false) String logout,
                            Model model) {
        if (error != null) {
            model.addAttribute("error", "Invalid username or password!");
        }
        if (logout != null) {
            model.addAttribute("message", "You have been logged out successfully.");
        }
        return "login";
    }

    @GetMapping("/register")
    public String registerPage(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, 
                              @RequestParam(value = "role", required = false) String roleId,
                              Model model) {
        try {
            // Handle role binding from form
            if (roleId != null && !roleId.isEmpty()) {
                try {
                    Long roleIdLong = Long.parseLong(roleId);
                    Role role = roleRepository.findById(roleIdLong)
                            .orElseThrow(() -> new RuntimeException("Role not found with ID: " + roleId));
                    user.setRole(role);
                } catch (NumberFormatException e) {
                    model.addAttribute("error", "Invalid role selected. Please try again.");
                    model.addAttribute("user", user);
                    return "register";
                }
            }
            
            userService.register(user);
            model.addAttribute("success", "Registration successful! Please login.");
            return "login";
        } catch (Exception e) {
            model.addAttribute("error", "Registration failed: " + e.getMessage());
            model.addAttribute("user", user);
            return "register";
        }
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            
            if (auth == null) {
                log.warn("Authentication is null, redirecting to login");
                return "redirect:/login?error=true";
            }
            
            if (auth.getAuthorities() == null || !auth.getAuthorities().iterator().hasNext()) {
                log.warn("No authorities found for user: {}", auth.getName());
                return "redirect:/login?error=true";
            }
            
            // Log all authorities for debugging
            var authorities = auth.getAuthorities();
            log.info("User {} has {} authorities:", auth.getName(), authorities.size());
            authorities.forEach(authority -> log.info("  - Authority: {}", authority.getAuthority()));
            
            String role = auth.getAuthorities().iterator().next().getAuthority();
            log.info("Using first authority as role: {}", role);
            
            // Normalize role for comparison (uppercase and trim)
            String normalizedRole = role.toUpperCase().trim();

            if (normalizedRole.equals("ROLE_ADMIN") || normalizedRole.contains("ADMIN")) {
                log.info("Redirecting admin to dashboard");
                return "redirect:/dashboard/admin";
            } else if (normalizedRole.equals("ROLE_EMPLOYER") || normalizedRole.contains("EMPLOYER")) {
                log.info("Redirecting employer to dashboard");
                return "redirect:/dashboard/employer";
            } else if (normalizedRole.equals("ROLE_APPLICANT") || normalizedRole.contains("APPLICANT")) {
                log.info("Redirecting applicant to dashboard");
                return "redirect:/dashboard/user";
            } else {
                // Unknown role, redirect to home
                log.warn("Unknown role '{}' (normalized: '{}') for user {}, redirecting to home", role, normalizedRole, auth.getName());
                return "redirect:/home";
            }
        } catch (Exception e) {
            log.error("Error in dashboard method: {}", e.getMessage(), e);
            return "redirect:/login?error=true";
        }
    }
}