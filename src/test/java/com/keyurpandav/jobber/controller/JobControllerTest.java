package com.keyurpandav.jobber.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.keyurpandav.jobber.dto.ApplicationDto;
import com.keyurpandav.jobber.dto.JobDto;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.enums.ApplicationStatusType;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.JobService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(JobController.class)
class JobControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JobService jobService;

    @MockBean
    private ApplicationService applicationService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    void create_ShouldReturnCreatedJob_WhenValid() throws Exception {
        Job job = new Job();
        job.setTitle("Software Engineer");
        job.setDescription("Great job description for testing");
        job.setLocation("Remote");
        job.setSalary(100000.0);
        // Add other required fields if validation requires them, but Job entity validation annotations weren't shown in detail.
        // Assuming simple object for now.
        
        JobDto jobDto = new JobDto();
        jobDto.setTitle("Software Engineer");

        when(jobService.CreateJobPosting(any(Job.class))).thenReturn(jobDto);

        mockMvc.perform(post("/job")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(job)))
                .andDo(org.springframework.test.web.servlet.result.MockMvcResultHandlers.print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Software Engineer"));
    }

    @Test
    @WithMockUser
    void updateAppStatus_ShouldReturnUpdatedApp_WhenValid() throws Exception {
        ApplicationDto appDto = new ApplicationDto();
        appDto.setStatus(ApplicationStatusType.ACCEPTED.name());

        when(applicationService.updateStatus(anyLong(), any(ApplicationStatusType.class))).thenReturn(appDto);

        mockMvc.perform(put("/job/applications/1/status")
                .with(csrf())
                .content("ACCEPTED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ACCEPTED"));
    }

    @Test
    @WithMockUser
    void getAllJobs_ShouldReturnList() throws Exception {
        JobDto job1 = new JobDto();
        job1.setTitle("Job 1");
        JobDto job2 = new JobDto();
        job2.setTitle("Job 2");
        List<JobDto> jobs = Arrays.asList(job1, job2);

        when(jobService.getAllJobs()).thenReturn(jobs);

        mockMvc.perform(get("/job"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Job 1"));
    }

    @Test
    @WithMockUser
    void getJobsByUser_ShouldReturnList() throws Exception {
        JobDto job1 = new JobDto();
        job1.setTitle("My Job");
        List<JobDto> jobs = Arrays.asList(job1);

        when(jobService.getjobsbyusers(1L)).thenReturn(jobs);

        mockMvc.perform(get("/job/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("My Job"));
    }

    @Test
    @WithMockUser
    void getJobById_ShouldReturnJob() throws Exception {
        JobDto job = new JobDto();
        job.setTitle("Detailed Job");

        when(jobService.getjobsbyid(1L)).thenReturn(job);

        mockMvc.perform(get("/job/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Detailed Job"));
    }

    @Test
    @WithMockUser
    void deleteJobById_ShouldReturnTrue() throws Exception {
        when(jobService.deletejobs(1L)).thenReturn(true);

        mockMvc.perform(delete("/job/1")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }
}
