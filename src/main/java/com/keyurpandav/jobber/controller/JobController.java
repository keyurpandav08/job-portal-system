package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.ApplicationDto;
import com.keyurpandav.jobber.dto.JobDto;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.enums.ApplicationStatusType;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final ApplicationService applicationService;

    @PostMapping
    public JobDto create(@RequestBody Job job){
        return jobService.CreateJobPosting(job);
    }
    @PutMapping("/applications/{appId}/status")
    public ApplicationDto updateAppStatus(@PathVariable Long appId, @RequestBody String status) {
        return applicationService.updateStatus(appId, ApplicationStatusType.valueOf(status));
    }
    @GetMapping
    public List<JobDto> getAllJobs(){
        return jobService.getAllJobs();
    }

    @GetMapping("/user/{myid}")
    public List<JobDto> getJobsByUser(@PathVariable Long myid){
        return jobService.getjobsbyusers(myid);
    }

    @GetMapping("/{myid}")
    public JobDto getJobById(@PathVariable Long myid){
        return jobService.getjobsbyid(myid);
    }

    @DeleteMapping("/{myid}")
    public boolean deleteJobById(@PathVariable Long myid){
        return jobService.deletejobs(myid);
    }
}