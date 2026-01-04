package com.keyurpandav.jobber.entity;
import com.keyurpandav.jobber.enums.StatusType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
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
    
    @NotBlank(message = "Job title is required")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;
    
    @NotBlank(message = "Job description is required")
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    private String description;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be a positive number")
    private Double salary;
    
    private LocalDate createdAt;
    
    @Enumerated(EnumType.STRING)
    private StatusType status;
    
    @ManyToOne
    @JoinColumn(name = "employer_id") 
    private User employer;
    
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL) 
    private List<Application> applications;
    
    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDate.now();
        if(this.status == null) this.status = StatusType.Open;
    }
}