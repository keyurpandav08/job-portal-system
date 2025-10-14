package com.keyurpandav.jobber.entity;

import com.keyurpandav.jobber.enums.StatusType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "jobs")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank private String title;
    private String description;
    private String location;
    private Double salary;
    private LocalDate createdAt;

    @Enumerated(EnumType.STRING)
    private StatusType status;

    @ManyToOne
    @JoinColumn(name = "employer_id") private User employer;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL) private List<Application> applications;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDate.now();
        if(this.status == null) this.status = StatusType.Open;
    }
}