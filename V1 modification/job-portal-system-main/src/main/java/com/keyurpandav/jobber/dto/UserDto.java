package com.keyurpandav.jobber.dto;

import com.keyurpandav.jobber.entity.User;
import lombok.*;

import java.sql.Timestamp;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String phone;
    private String skills;
    private String experience;
    private String roleName;
    private Timestamp createdAt;
    private int applicationCount;

    public static UserDto toDto(User u){
        return UserDto.builder()
                .id(u.getId())
                .username(u.getUsername())
                .email(u.getEmail())
                .fullName(u.getFullName())
                .phone(u.getPhone())
                .skills(u.getSkills())
                .experience(u.getExperience())
                .roleName(u.getRole().getName())
                .createdAt(u.getCreatedAt())
                .applicationCount(u.getApplications() != null ? u.getApplications().size() : 0)
                .build();
    }
}