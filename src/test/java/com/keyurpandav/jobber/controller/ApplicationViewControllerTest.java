package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.entity.Application;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ApplicationViewController.class)
class ApplicationViewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ApplicationService applicationService;

    @MockBean
    private UserService userService;

    @Test
    @WithMockUser(username = "testuser")
    void applyForJob_ShouldRedirectToJobs_WhenAuthenticated() throws Exception {
        User user = new User();
        user.setUsername("testuser");
        when(userService.getUserByUsername("testuser")).thenReturn(user);

        mockMvc.perform(post("/applications/apply/1")
                .with(csrf())
                .param("resumeUrl", "http://resume.com/cv.pdf"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/jobs"))
                .andExpect(flash().attributeExists("success"));
    }

    @Test
    void applyForJob_ShouldRedirectToLogin_WhenNotAuthenticated() throws Exception {
        // No @WithMockUser

        mockMvc.perform(post("/applications/apply/1")
                .with(csrf()))
                .andDo(org.springframework.test.web.servlet.result.MockMvcResultHandlers.print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "testuser")
    void myApplications_ShouldReturnMyApplicationsView() throws Exception {
         User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        when(userService.getUserByUsername("testuser")).thenReturn(user);

        mockMvc.perform(get("/applications/my-applications"))
                .andExpect(status().isOk())
                .andExpect(view().name("my-applications"))
                .andExpect(model().attributeExists("applications"));
    }
}
