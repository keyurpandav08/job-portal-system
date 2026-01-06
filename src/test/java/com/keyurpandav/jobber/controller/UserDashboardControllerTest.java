package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.ApplicationService;
import com.keyurpandav.jobber.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserDashboardController.class)
class UserDashboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private ApplicationService applicationService;

    @Test
    @WithMockUser(username = "testuser")
    void userDashboard_ShouldReturnUserDashboardView() throws Exception {
        User user = new User();
        user.setId(1L);
        when(userService.getUserByUsername("testuser")).thenReturn(user);
        when(applicationService.getApplicationsByUser(1L)).thenReturn(new ArrayList<>());

        mockMvc.perform(get("/dashboard/user"))
                .andExpect(status().isOk())
                .andExpect(view().name("user-dashboard"))
                .andExpect(model().attributeExists("user"))
                .andExpect(model().attributeExists("applications"));
    }
}
