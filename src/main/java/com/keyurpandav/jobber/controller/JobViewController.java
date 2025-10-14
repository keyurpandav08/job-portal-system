package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobViewController {

    private final JobService jobService;

    @GetMapping
    public String browseJobs(Model model) {
        model.addAttribute("jobs", jobService.getAllJobs());
        return "browse-jobs";
    }

    @GetMapping("/{id}")
    public String jobDetails(@PathVariable Long id, Model model) {
        model.addAttribute("job", jobService.getjobsbyid(id));
        return "job-details";
    }
}