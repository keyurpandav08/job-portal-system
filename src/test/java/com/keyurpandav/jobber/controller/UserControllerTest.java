package com.keyurpandav.jobber.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.keyurpandav.jobber.dto.UserDto;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.UserService;
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
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    void register_ShouldReturnCreatedUser_WhenValid() throws Exception {
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password");
        user.setEmail("test@example.com");
        
        com.keyurpandav.jobber.entity.Role role = new com.keyurpandav.jobber.entity.Role();
        role.setName("USER");
        user.setRole(role);
        
        UserDto userDto = new UserDto();
        userDto.setUsername("testuser");
        userDto.setEmail("test@example.com");

        when(userService.register(any(User.class))).thenReturn(userDto);

        java.util.Map<String, Object> userMap = new java.util.HashMap<>();
        userMap.put("username", "testuser");
        userMap.put("password", "password");
        userMap.put("email", "test@example.com");
        userMap.put("fullName", "Test User");

        mockMvc.perform(post("/users/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userMap)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("testuser"));
    }

    @Test
    @WithMockUser
    void all_ShouldReturnListOfUsers() throws Exception {
        UserDto user1 = new UserDto();
        user1.setUsername("user1");
        UserDto user2 = new UserDto();
        user2.setUsername("user2");
        List<UserDto> users = Arrays.asList(user1, user2);

        when(userService.getAll()).thenReturn(users);

        mockMvc.perform(get("/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].username").value("user1"));
    }

    @Test
    @WithMockUser
    void byEmail_ShouldReturnUser() throws Exception {
        UserDto user = new UserDto();
        user.setEmail("test@example.com");

        when(userService.getByEmail("test@example.com")).thenReturn(user);

        mockMvc.perform(get("/users/email/test@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }
}
