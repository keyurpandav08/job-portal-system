---

# 💼 Job Portal System

A robust, full-stack Job Portal application built with **Spring Boot**, **Thymeleaf**, and **PostgreSQL**. This system features a dual-role architecture (Applicant & Employer) with role-based access control and real-time application tracking.

🎬 **[Watch the System Flow Explanation Video](https://www.youtube.com/watch?v=DxSpEyaUvmU)**

---

## 🚀 Key Features

### 👤 For Job Seekers (Applicants)

* **Smart Profiles:** Register with skills, experience, and contact details [[00:53](http://www.youtube.com/watch?v=DxSpEyaUvmU&t=53)].
* **One-Click Apply:** Submit applications instantly by providing a resume URL [[02:45](http://www.youtube.com/watch?v=DxSpEyaUvmU&t=165)].
* **Real-time Tracking:** Monitor application status (Pending, Accepted, Rejected) directly from a personal dashboard [[02:05](http://www.youtube.com/watch?v=DxSpEyaUvmU&t=125)].

### 🏢 For Employers

* **Job Management:** Post, edit, and manage job listings with salary and location details [[03:29](http://www.youtube.com/watch?v=DxSpEyaUvmU&t=209)].
* **Candidate Pipeline:** View all applicants for specific jobs and manage their hiring status [[03:49](http://www.youtube.com/watch?v=DxSpEyaUvmU&t=229)].
* **Instant Updates:** Acceptance or rejection status updates are reflected instantly on the applicant's end [[04:11](http://www.youtube.com/watch?v=DxSpEyaUvmU&t=251)].

---

## 🛠️ Tech Stack

* **Backend:** Spring Boot, Spring Security (Role-based Authorization)
* **Data:** Spring Data JPA, PostgreSQL
* **Frontend:** Thymeleaf (Server-side rendering), HTML5, CSS3
* **Build Tool:** Maven

---

## 💻 Local Setup & Installation

### Prerequisites

* **Java 17+**
* **Maven 3.6+**
* **PostgreSQL** (Running locally or via Docker)

### 1. Database Configuration

Create a database named `job_portal` in PostgreSQL. Then, update `src/main/resources/application.properties` (or use your `.env` file):

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/job_portal
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

```

### 2. Run the Application

```bash
# Clone the repository
git clone https://github.com/keyurpandav08/job-portal-system.git

# Navigate to the project directory
cd job-portal-system

# Build and run
mvn spring-boot:run

```

The application will be available at `http://localhost:8080`.

---

## 📁 Project Structure

```text
src/main/java/com/jobportal/
 ├── controller/    # Web & REST Controllers [00:04:52]
 ├── entity/        # JPA Entities (User, Job, Application) [00:01:14]
 ├── repository/    # Data Access Layer [00:02:36]
 ├── service/       # Business Logic
 └── security/      # Spring Security Configuration [00:01:27]

```

---

## 🤝 Contributing

Contributions make the open-source community an amazing place!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

*See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.*

---

## 🗺️ Project Roadmap

We are actively looking for contributors to help implement the following features. If you'd like to work on one, please open an issue first!

### 🟢 Phase 1: Core Enhancements (Low Hanging Fruit)
- [ ] **Validation:** Add `@Valid` annotations to controller inputs for better error handling.
- [ ] **Search Filters:** Add the ability to filter jobs by Location or Salary Range.
- [ ] **Password Encryption:** Ensure all passwords are encrypted using BCrypt (Spring Security).

### 🟡 Phase 2: User Experience (Frontend & UX)
- [ ] **Flash Messages:** Add "Success" or "Error" alerts after applying for a job or posting a listing.
- [ ] **Profile Pictures:** Allow users to upload profile images via AWS S3 or local storage.
- [ ] **Dark Mode:** Add a toggle for dark/light theme using CSS variables.

### 🔴 Phase 3: Advanced Features
- [ ] **Resume Parsing:** Automatically extract skills from uploaded PDF resumes.
- [ ] **Email Notifications:** Send automated emails when an application status changes to "Accepted".
- [ ] **Admin Dashboard:** A third role for platform admins to manage users and moderate job posts.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---