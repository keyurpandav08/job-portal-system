package com.keyurpandav.jobber.dto;

import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.enums.StatusType;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class JobDto {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double salary;
    private StatusType status;
    private String employerName;

    public static JobDto toDto(Job j){
        return JobDto.builder()
                .id(j.getId())
                .title(j.getTitle())
                .description(j.getDescription())
                .location(j.getLocation())
                .salary(j.getSalary())
                .status(j.getStatus())
                .employerName(j.getEmployer().getUsername())
                .build();
    }

}