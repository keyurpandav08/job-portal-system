# Job Matching & Application Flow

This document explains the lifecycle of a job application within the system.

## 1. Discovery
The system fetches all jobs from the `JobRepository` where the status is active. Applicants can browse these regardless of their specific skills.

## 2. The Application Trigger
When an applicant clicks "Apply":
1. The system validates if the user is logged in as an `APPLICANT`.
2. A new `Application` entity is created, linking the `User` ID and `Job` ID.
3. The initial status is set to `PENDING`.

## 3. Employer Review
1. Employers view a list of applications filtered by their specific `job_id`.
2. The employer reviews the `resume_url` provided by the applicant.

## 4. Status Update (The "Match")
- If the employer clicks **Accept**, the application status updates to `ACCEPTED`.
- The applicant's dashboard reflects this change instantly via a dynamic query in the `ApplicationRepository`.