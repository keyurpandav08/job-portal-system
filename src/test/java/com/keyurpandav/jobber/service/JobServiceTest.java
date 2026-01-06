package com.keyurpandav.jobber.service;

import com.keyurpandav.jobber.dto.JobDto;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.repository.JobRepository;
import com.keyurpandav.jobber.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobServiceTest {

    @Mock
    private JobRepository jobRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private JobService jobService;

    private User employer;
    private Job job;

    @BeforeEach
    void setUp() {
        employer = new User();
        employer.setId(1L);
        employer.setUsername("employer");

        job = new Job();
        job.setId(1L);
        job.setTitle("Software Engineer");
        job.setDescription("Great Job");
        job.setEmployer(employer);
    }

    @Test
    void createJobPosting_ShouldReturnJobDto_WhenEmployerExists() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(employer));
        when(jobRepository.save(any(Job.class))).thenReturn(job);

        JobDto result = jobService.CreateJobPosting(job);

        assertNotNull(result);
        assertEquals("Software Engineer", result.getTitle());
        verify(jobRepository).save(any(Job.class));
    }

    @Test
    void createJobPosting_ShouldThrowException_WhenEmployerNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> jobService.CreateJobPosting(job));
    }

    @Test
    void getAllJobs_ShouldReturnListOfJobDtos() {
        when(jobRepository.findAll()).thenReturn(Arrays.asList(job));

        List<JobDto> result = jobService.getAllJobs();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Software Engineer", result.get(0).getTitle());
    }

    @Test
    void getJobsByEmployer_ShouldReturnList_WhenEmployerExists() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(employer));
        when(jobRepository.findByEmployer(employer)).thenReturn(Arrays.asList(job));

        List<JobDto> result = jobService.getjobsbyusers(1L);

        assertFalse(result.isEmpty());
        assertEquals("Software Engineer", result.get(0).getTitle());
    }

    @Test
    void getJobById_ShouldReturnJobDto_WhenExists() {
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));

        JobDto result = jobService.getjobsbyid(1L);

        assertNotNull(result);
        assertEquals("Software Engineer", result.getTitle());
    }

    @Test
    void deleteJob_ShouldReturnTrue_WhenExists() {
        when(jobRepository.existsById(1L)).thenReturn(true);

        boolean result = jobService.deletejobs(1L);

        assertTrue(result);
        verify(jobRepository).deleteById(1L);
    }

    @Test
    void deleteJob_ShouldThrowException_WhenNotFound() {
        when(jobRepository.existsById(1L)).thenReturn(false);

        assertThrows(IllegalArgumentException.class, () -> jobService.deletejobs(1L));
        verify(jobRepository, never()).deleteById(anyLong());
    }
}
