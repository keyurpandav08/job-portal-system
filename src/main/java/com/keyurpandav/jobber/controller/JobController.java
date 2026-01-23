package com.keyurpandav.jobber.controller;
import com.keyurpandav.jobber.dto.ApplicationDto;
import com.keyurpandav.jobber.dto.JobDto;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.enums.ApplicationStatusType;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;
    private final ApplicationService applicationService;
    
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Job job, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> 
                errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        
        try {
            JobDto createdJob = jobService.CreateJobPosting(job);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/applications/{appId}/status")
    public ResponseEntity<?> updateAppStatus(@PathVariable Long appId, @RequestBody String status) {
        try {
            ApplicationStatusType statusType = ApplicationStatusType.valueOf(status);
            ApplicationDto updatedApp = applicationService.updateStatus(appId, statusType);
            return ResponseEntity.ok(updatedApp);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Invalid status value. Must be one of: " + 
                    String.join(", ", getValidStatuses())));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping
    public List<JobDto> getAllJobs(@RequestParam(value = "search", required = false) String keyword){
        if (keyword != null && !keyword.trim().isEmpty()) {
            return jobService.searchJobs(keyword);
        }
        return jobService.getAllJobs();
    }
    
    @GetMapping("/search")
    public List<JobDto> searchJobs(@RequestParam("keyword") String keyword){
        return jobService.searchJobs(keyword);
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
    
    private String[] getValidStatuses() {
        return java.util.Arrays.stream(ApplicationStatusType.values())
            .map(Enum::name)
            .toArray(String[]::new);
    }
}