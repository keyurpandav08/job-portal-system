# Database Schema

The system uses **PostgreSQL** with three primary entities. Relationships are managed via JPA annotations.

## Entities

### 1. User
- Stores both Applicants and Employers.
- Key fields: `id`, `username`, `email`, `password`, `role`, `skills`, `experience`.

### 2. Job
- Created by an Employer.
- **Relationship**: Many-to-One (Many jobs belong to one Employer).
- Key fields: `id`, `title`, `description`, `salary`, `location`, `employer_id`.

### 3. Application
- Connects an Applicant to a Job.
- **Relationship**: Many-to-One (Many applications for one Job; Many applications by one Applicant).
- Key fields: `id`, `job_id`, `applicant_id`, `status` (PENDING, ACCEPTED, REJECTED), `resume_url`, `apply_date`.