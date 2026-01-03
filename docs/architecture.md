# System Architecture

The Job Portal System is built using the **Spring MVC** pattern, ensuring a clean separation of concerns.

## High-Level Flow
1. **Client Tier**: Thymeleaf templates provide a responsive UI for Applicants and Employers.
2. **Security Tier**: Spring Security intercepts requests to handle Authentication and Role-Based Access Control (RBAC).
3. **Logic Tier**: Service layer handles business rules (e.g., "Can an applicant apply to the same job twice?").
4. **Data Tier**: Spring Data JPA interacts with PostgreSQL to persist user and job data.



## Role-Based Access
- **Applicants**: Can view jobs and apply. Access restricted from the "Post Job" routes.
- **Employers**: Can create jobs and change application statuses. Access restricted from the "My Applications" routes.