package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.UserDto;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.JobService;
import com.keyurpandav.jobber.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HomeController.class)
class HomeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JobService jobService;

    @MockBean
    private UserService userService;

    @Test
    @WithMockUser
    void home_ShouldRedirectToHome() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/home"));
    }

    @Test
    @WithMockUser
    void homePage_ShouldReturnHomeView() throws Exception {
        mockMvc.perform(get("/home"))
                .andExpect(status().isOk())
                .andExpect(view().name("home"))
                .andExpect(model().attributeExists("message"));
    }

    @Test
    @WithMockUser
    void loginPage_ShouldReturnLoginView() throws Exception {
        mockMvc.perform(get("/login"))
                .andDo(org.springframework.test.web.servlet.result.MockMvcResultHandlers.print())
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void registerPage_ShouldReturnRegisterView() throws Exception {
        mockMvc.perform(get("/register"))
                .andExpect(status().isOk())
                .andExpect(view().name("register"))
                .andExpect(model().attributeExists("user"));
    }

    @Test
    @WithMockUser
    void registerUser_ShouldReturnLoginView_WhenSuccess() throws Exception {
        UserDto userDto = new UserDto();
        when(userService.register(any(User.class))).thenReturn(userDto);

        mockMvc.perform(post("/register")
                .with(csrf())
                .param("username", "testuser")
                .param("password", "password"))
                .andExpect(status().isOk())
                .andExpect(view().name("login"))
                .andExpect(model().attributeExists("success"));
    }

    @Test
    @WithMockUser(roles = "EMPLOYER")
    void dashboard_ShouldRedirectToEmployerDashboard_WhenEmployer() throws Exception {
        mockMvc.perform(get("/dashboard"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/dashboard/employer"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void dashboard_ShouldRedirectToUserDashboard_WhenUser() throws Exception {
        mockMvc.perform(get("/dashboard"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/dashboard/user"));
    }
}
