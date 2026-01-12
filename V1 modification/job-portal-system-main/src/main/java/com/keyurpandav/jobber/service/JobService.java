package com.keyurpandav.jobber.service;

import com.keyurpandav.jobber.dto.JobDto;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.repository.JobRepository;
import com.keyurpandav.jobber.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userReopsitory;

    public JobDto createJobPosting(Job jobData, String username) {
        User employer = userReopsitory.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Employer not found with username: " + username));

        Job job = new Job();
        job.setTitle(jobData.getTitle());
        job.setDescription(jobData.getDescription());
        job.setLocation(jobData.getLocation());
        job.setSalary(jobData.getSalary());
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

    @Transactional
    public JobDto updateJob(Long id, JobDto dto, String username) {
        Job j = jobRepository.findById(id)
                .filter(job -> job.getEmployer().getUsername().equals(username))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN));

        Optional.ofNullable(dto.getTitle()).ifPresent(j::setTitle);
        Optional.ofNullable(dto.getDescription()).ifPresent(j::setDescription);
        Optional.ofNullable(dto.getLocation()).ifPresent(j::setLocation);
        Optional.ofNullable(dto.getSalary()).ifPresent(j::setSalary);

        return JobDto.toDto(j);   // save & map in one go
    }

    public List<JobDto> findJobsByEmployerUsername(String username) {
        return jobRepository.findByEmployer_Username(username)
                .stream()
                .map(JobDto::toDto)
                .toList();
    }
}