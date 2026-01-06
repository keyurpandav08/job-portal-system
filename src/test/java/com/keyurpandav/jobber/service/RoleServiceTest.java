package com.keyurpandav.jobber.service;

import com.keyurpandav.jobber.entity.Role;
import com.keyurpandav.jobber.repository.RoleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RoleServiceTest {

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private RoleService roleService;

    @Test
    void create_ShouldReturnRole() {
        Role role = new Role();
        role.setName("ADMIN");
        when(roleRepository.save(any(Role.class))).thenReturn(role);

        Role result = roleService.create("ADMIN");

        assertNotNull(result);
        assertEquals("ADMIN", result.getName());
        verify(roleRepository).save(any(Role.class));
    }

    @Test
    void getByName_ShouldReturnRole_WhenExists() {
        Role role = new Role();
        role.setName("ADMIN");
        when(roleRepository.findByName("ADMIN")).thenReturn(Optional.of(role));

        Role result = roleService.getByName("ADMIN");

        assertNotNull(result);
        assertEquals("ADMIN", result.getName());
    }
}
