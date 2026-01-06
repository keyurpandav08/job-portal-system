package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.JobDto;
import com.keyurpandav.jobber.service.JobService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(JobViewController.class)
class JobViewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JobService jobService;

    @Test
    @WithMockUser
    void browseJobs_ShouldReturnBrowseJobsView() throws Exception {
        when(jobService.getAllJobs()).thenReturn(Arrays.asList(new JobDto(), new JobDto()));

        mockMvc.perform(get("/jobs"))
                .andExpect(status().isOk())
                .andExpect(view().name("browse-jobs"))
                .andExpect(model().attributeExists("jobs"));
    }

    @Test
    @WithMockUser
    void jobDetails_ShouldReturnJobDetailsView() throws Exception {
        when(jobService.getjobsbyid(1L)).thenReturn(new JobDto());

        mockMvc.perform(get("/jobs/1"))
                .andExpect(status().isOk())
                .andExpect(view().name("job-details"))
                .andExpect(model().attributeExists("job"));
    }
}
