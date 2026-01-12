package com.keyurpandav.jobber.entity;

import com.keyurpandav.jobber.enums.ApplicationStatusType;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "application")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String resumeUrl;
    private Timestamp appliedAt;

    @Enumerated(EnumType.STRING)
    private ApplicationStatusType status;

    @ManyToOne
    @JoinColumn(name = "job_id") private Job job;

    @ManyToOne
    @JoinColumn(name = "applicant_id") private User applicant;

    @PrePersist
    protected void onCreate(){
        this.appliedAt = new Timestamp(System.currentTimeMillis());
        if(this.status == null) this.status = ApplicationStatusType.PENDING;
    }
}