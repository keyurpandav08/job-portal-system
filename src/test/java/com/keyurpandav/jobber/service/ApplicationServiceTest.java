package com.keyurpandav.jobber.service;

import com.keyurpandav.jobber.dto.ApplicationDto;
import com.keyurpandav.jobber.entity.Application;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.enums.ApplicationStatusType;
import com.keyurpandav.jobber.repository.ApplicationRepository;
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
class ApplicationServiceTest {

    @Mock
    private ApplicationRepository applicationRepository;

    @Mock
    private JobRepository jobRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ApplicationService applicationService;

    private User applicant;
    private Job job;
    private Application application;

    @BeforeEach
    void setUp() {
        applicant = new User();
        applicant.setId(1L);
        applicant.setUsername("applicant");

        job = new Job();
        job.setId(1L);
        job.setTitle("Software Engineer");

        application = new Application();
        application.setId(1L);
        application.setApplicant(applicant);
        application.setJob(job);
        application.setStatus(ApplicationStatusType.PENDING);
        application.setResumeUrl("http://resume.url");
    }

    @Test
    void applyToJob_ShouldReturnDto_WhenValid() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(applicant));
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        when(applicationRepository.findByApplicantAndJob(applicant, job)).thenReturn(Optional.empty());
        when(applicationRepository.save(any(Application.class))).thenReturn(application);

        ApplicationDto result = applicationService.applyToJob(application);

        assertNotNull(result);
        assertEquals(ApplicationStatusType.PENDING.name(), result.getStatus());
        verify(applicationRepository).save(any(Application.class));
    }

    @Test
    void applyToJob_ShouldThrowException_WhenAlreadyApplied() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(applicant));
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        when(applicationRepository.findByApplicantAndJob(applicant, job)).thenReturn(Optional.of(application));

        assertThrows(IllegalArgumentException.class, () -> applicationService.applyToJob(application));
    }

    @Test
    void getApplicationsByUser_ShouldReturnList() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(applicant));
        when(applicationRepository.findByApplicant(applicant)).thenReturn(Arrays.asList(application));

        List<ApplicationDto> result = applicationService.getApplicationsByUser(1L);

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
    }

    @Test
    void updateStatus_ShouldReturnUpdatedDto() {
        when(applicationRepository.findById(1L)).thenReturn(Optional.of(application));
        when(applicationRepository.save(any(Application.class))).thenReturn(application);

        ApplicationDto result = applicationService.updateStatus(1L, ApplicationStatusType.ACCEPTED);

        assertNotNull(result);
        verify(applicationRepository).save(application);
    }
}
