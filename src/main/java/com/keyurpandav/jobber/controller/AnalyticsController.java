package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.service.AnalyticsService;
import com.keyurpandav.jobber.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.Map;

@Controller
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    private final UserService userService;

    @GetMapping("/employer")
    public String employerAnalytics(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            Model model) {
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        var employer = userService.getUserByUsername(username);

        LocalDate start = startDate != null && !startDate.isEmpty() ? LocalDate.parse(startDate) : null;
        LocalDate end = endDate != null && !endDate.isEmpty() ? LocalDate.parse(endDate) : null;

        Map<String, Object> analytics = analyticsService.getEmployerAnalytics(employer.getId(), start, end);
        model.addAllAttributes(analytics);
        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);

        return "analytics-employer";
    }

    @GetMapping("/applicant")
    public String applicantAnalytics(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            Model model) {
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        var applicant = userService.getUserByUsername(username);

        LocalDate start = startDate != null && !startDate.isEmpty() ? LocalDate.parse(startDate) : null;
        LocalDate end = endDate != null && !endDate.isEmpty() ? LocalDate.parse(endDate) : null;

        Map<String, Object> analytics = analyticsService.getApplicantAnalytics(applicant.getId(), start, end);
        model.addAllAttributes(analytics);
        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);

        return "analytics-applicant";
    }
}

