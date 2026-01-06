package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.JobDto;
import com.keyurpandav.jobber.entity.Application;
import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.enums.ApplicationStatusType;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.JobService;
import com.keyurpandav.jobber.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EmployerDashboardController.class)
class EmployerDashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JobService jobService;

    @MockBean
    private UserService userService;

    @MockBean
    private ApplicationService applicationService;

    @Test
    @WithMockUser(username = "employer", roles = "EMPLOYER")
    void employerDashboard_ShouldReturnDashboardView() throws Exception {
        User user = new User();
        user.setId(1L);
        when(userService.getUserByUsername("employer")).thenReturn(user);
        when(jobService.getjobsbyusers(1L)).thenReturn(new ArrayList<>());

        mockMvc.perform(get("/dashboard/employer"))
                .andExpect(status().isOk())
                .andExpect(view().name("employer-dashboard"))
                .andExpect(model().attributeExists("jobs"))
                .andExpect(model().attributeExists("totalApplications"));
    }

    @Test
    @WithMockUser(username = "employer", roles = "EMPLOYER")
    void createJob_ShouldRedirectToDashboard() throws Exception {
        User user = new User();
        when(userService.getUserByUsername("employer")).thenReturn(user);

        mockMvc.perform(post("/dashboard/employer/jobs")
                .with(csrf())
                .flashAttr("job", new Job()))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/dashboard/employer"))
                .andExpect(flash().attributeExists("success"));
    }

    @Test
    @WithMockUser(username = "employer", roles = "EMPLOYER")
    void viewJobApplications_ShouldReturnApplicationsView_WhenOwner() throws Exception {
        User user = new User();
        user.setUsername("employer");
        when(userService.getUserByUsername("employer")).thenReturn(user);

        JobDto job = new JobDto();
        job.setId(1L);
        job.setEmployerName("employer");
        when(jobService.getjobsbyid(1L)).thenReturn(job);
        when(applicationService.getApplicationsByJob(1L)).thenReturn(new ArrayList<>());

        mockMvc.perform(get("/dashboard/employer/jobs/1/applications"))
                .andExpect(status().isOk())
                .andExpect(view().name("job-applications"))
                .andExpect(model().attributeExists("applications"));
    }

    @Test
    @WithMockUser(username = "employer", roles = "EMPLOYER")
    void updateApplicationStatus_ShouldRedirectToApplications_WhenSuccess() throws Exception {
        // Setup for helper method getJobIdFromApplication
        Application app = new Application();
        Job job = new Job();
        job.setId(10L);
        app.setJob(job);
        
        when(applicationService.getApplicationById(1L)).thenReturn(app);
        
        mockMvc.perform(post("/dashboard/employer/applications/1/status")
                .with(csrf())
                .param("status", "ACCEPTED"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/dashboard/employer/jobs/10/applications"))
                .andExpect(flash().attributeExists("success"));
    }
}
