package com.keyurpandav.jobber.config;

import com.keyurpandav.jobber.entity.Role;
import com.keyurpandav.jobber.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            List<String> roles = List.of("APPLICANT", "EMPLOYER");

            for (String roleName : roles) {
                if (roleRepository.findByName(roleName).isEmpty()) {
                    Role role = new Role();
                    role.setName(roleName);
                    roleRepository.save(role);
                    System.out.println("Seeded role: " + roleName);
                }
            }
        };
    }
}
