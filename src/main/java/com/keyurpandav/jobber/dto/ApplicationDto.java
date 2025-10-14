package com.keyurpandav.jobber.dto;

import com.keyurpandav.jobber.entity.Application;
import lombok.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ApplicationDto {
    private Long id;
    private String applicantName;
    private String jobTitle;
    private String resumeUrl;
    private String status;
    private String appliedAt; // Change to String for formatted date

    public static ApplicationDto toDto(Application a){
        // Format the timestamp
        String formattedDate = "";
        if (a.getAppliedAt() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
            formattedDate = sdf.format(a.getAppliedAt());
        }

        return ApplicationDto.builder()
                .id(a.getId())
                .applicantName(a.getApplicant().getUsername())
                .jobTitle(a.getJob().getTitle())
                .resumeUrl(a.getResumeUrl())
                .status(a.getStatus().name())
                .appliedAt(formattedDate)
                .build();
    }
}