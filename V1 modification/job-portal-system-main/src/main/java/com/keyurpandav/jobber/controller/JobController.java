package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.ApplicationDto;
import com.keyurpandav.jobber.dto.JobDto;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.enums.ApplicationStatusType;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final ApplicationService applicationService;

    @PostMapping
    public JobDto create(@RequestBody Job job, @RequestParam String username) {
        return jobService.createJobPosting(job, username);
    }
    @PutMapping("/{id}")
    public JobDto update(@PathVariable Long id,
                         @RequestBody JobDto dto,   // ← use DTO, not entity
                         @RequestParam String username){
        return jobService.updateJob(id, dto, username);
    }

    @GetMapping
    public List<JobDto> getAllJobs(){
        return jobService.getAllJobs();
    }

    @GetMapping("/user/{myid}")
    public List<JobDto> getJobsByUser(@PathVariable Long myid){
        return jobService.getjobsbyusers(myid);
    }

    @GetMapping("/employer")   // GET /api/jobs/employer?username=employer_user
    public Map<String, Object> getMyJobs(@RequestParam String username) {
        List<JobDto> list = jobService.findJobsByEmployerUsername(username);
        return Map.of(
                "success", true,
                "count",   list.size(),
                "jobs",    list
        );
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