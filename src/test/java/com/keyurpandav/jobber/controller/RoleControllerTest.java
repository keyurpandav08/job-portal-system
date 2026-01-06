package com.keyurpandav.jobber.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.keyurpandav.jobber.entity.Role;
import com.keyurpandav.jobber.service.RoleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RoleController.class)
class RoleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RoleService roleService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    void create_ShouldReturnRole() throws Exception {
        Role role = new Role();
        role.setName("ROLE_USER");

        when(roleService.create("ROLE_USER")).thenReturn(role);

        mockMvc.perform(post("/role")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(role)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("ROLE_USER"));
    }

    @Test
    @WithMockUser
    void byName_ShouldReturnRole() throws Exception {
        Role role = new Role();
        role.setName("ROLE_USER");

        when(roleService.getByName("ROLE_USER")).thenReturn(role);

        mockMvc.perform(get("/role/ROLE_USER"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("ROLE_USER"));
    }
}
