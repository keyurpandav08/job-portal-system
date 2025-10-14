package com.keyurpandav.jobber.service;

import com.keyurpandav.jobber.dto.JobDto;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.repository.JobRepository;
import com.keyurpandav.jobber.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;   // NEW
import com.keyurpandav.jobber.enums.StatusType;                          // NEW

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userReopsitory;

    public JobDto CreateJobPosting(Job mydata) {
        User employer = userReopsitory.findById(mydata.getEmployer().getId())
                .orElseThrow(() -> new IllegalArgumentException("Employer not found with id: " + mydata.getEmployer().getId()));

        Job job = new Job();
        job.setTitle(mydata.getTitle());
        job.setDescription(mydata.getDescription());
        job.setLocation(mydata.getLocation());
        job.setSalary(mydata.getSalary());
        job.setEmployer(employer);

        jobRepository.save(job);
        return JobDto.toDto(job);
    }
    // Add this method to your existing JobService class
    public Job getJobEntityById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job not found with id: " + id));
    }
    public List<JobDto> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(JobDto::toDto)
                .collect(Collectors.toList());
    }

    public List<JobDto> getjobsbyusers(Long myid) {
        User employer = userReopsitory.findById(myid)
                .orElseThrow(() -> new IllegalArgumentException("Employer not found with id: " + myid));
        return jobRepository.findByEmployer(employer).stream()
                .map(JobDto::toDto)
                .collect(Collectors.toList());
    }

    public JobDto getjobsbyid(Long myid) {
        Job job = jobRepository.findById(myid)
                .orElseThrow(() -> new IllegalArgumentException("Job not found with id: " + myid));
        return JobDto.toDto(job);
    }

    public boolean deletejobs(Long myid) {
        if (!jobRepository.existsById(myid)) {
            throw new IllegalArgumentException("Job not found with id: " + myid);
        }
        jobRepository.deleteById(myid);
        return true;
    }

}