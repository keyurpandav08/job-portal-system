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
## 📁 Folder Structure
```bash
📦 job-portal-system/
├── 📄 .gitattributes
├── 📄 .gitignore
├── 📄 backend-output.log
├── 📄 LICENSE
├── 📄 mvnw
├── 📄 mvnw.cmd
├── 📄 package-lock.json
├── 📄 pom.xml
├── 📄 POSTGRESQL_SETUP.md
├── 📄 README.md
├── 📄 run-output.txt
│
├── 📁 .github/
│   └── 📁 workflows/
│       ├── 📄 duplicate-issue.yml
│       ├── 📄 issue-create-automate-message.yml
│       ├── 📄 pr-auto-label-assign.yml
│       └── 📄 pr-create-automate-message.yml
│
├── 📁 .mvn/
│   └── 📁 wrapper/
│       └── 📄 maven-wrapper.properties
│
├── 📁 frontend/
│   ├── 📄 .gitignore
│   ├── 📄 CHANGELOG.md
│   ├── 📄 eslint.config.js
│   ├── 📄 index.html
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   ├── 📄 README.md
│   ├── 📄 vite.config.js
│   │
│   ├── 📁 public/
│   │   ├── 📄 logo.png
│   │   └── 📄 vite.svg
│   │
│   └── 📁 src/
│       ├── 📄 App.jsx
│       ├── 📄 index.css
│       ├── 📄 main.jsx
│       │
│       ├── 📁 assets/
│       │   ├── 📄 hero-illustration.png
│       │   ├── 📄 image.png
│       │   ├── 📄 react.svg
│       │   ├── 📄 README.md
│       │   └── 📁 brand/
│       │       └── 📁 logo/
│       │           ├── 📄 careerlink-icon.png
│       │           └── 📄 careerlink-logo-primary.png
│       │
│       ├── 📁 components/
│       │   ├── 📄 Footer.jsx
│       │   ├── 📄 Layout.jsx
│       │   ├── 📄 Loader.jsx
│       │   ├── 📄 ProtectedRoute.jsx
│       │   ├── 📄 ThemeToggle.css
│       │   └── 📄 ThemeToggle.jsx
│       │
│       ├── 📁 context/
│       │   ├── 📄 AuthContext.jsx
│       │   └── 📄 ThemeContext.jsx
│       │
│       ├── 📁 pages/
│       │   ├── 📄 Auth.css
│       │   ├── 📄 CreateJob.jsx
│       │   ├── 📄 Dashboard.jsx
│       │   ├── 📄 Home.css
│       │   ├── 📄 Home.jsx
│       │   ├── 📄 JobDetail.jsx
│       │   ├── 📄 JobList.jsx
│       │   ├── 📄 Login.jsx
│       │   ├── 📄 NotFound.jsx
│       │   └── 📄 Register.jsx
│       │
│       ├── 📁 services/
│       │   └── 📄 api.js
│       │
│       └── 📁 theme/
│           ├── 📄 colors.js
│           └── 📄 tokens.css
│
└── 📁 src/
    ├── 📁 main/
    │   ├── 📄 README.md
    │   ├── 📁 java/
    │   │   └── 📁 com/
    │   │       └── 📁 keyurpandav/
    │   │           └── 📁 jobber/
    │   │               ├── 📄 JobberApplication.java
    │   │               │
    │   │               ├── 📁 config/
    │   │               │   ├── 📄 DataInitializer.java
    │   │               │   ├── 📄 SecurityConfig.java
    │   │               │   └── 📄 UserDetailsServiceImpl.java
    │   │               │
    │   │               ├── 📁 controller/
    │   │               │   ├── 📄 AnalyticsController.java
    │   │               │   ├── 📄 ApplicationRestController.java
    │   │               │   ├── 📄 CustomErrorController.java
    │   │               │   ├── 📄 JobController.java
    │   │               │   ├── 📄 RoleController.java
    │   │               │   └── 📄 UserController.java
    │   │               │
    │   │               ├── 📁 dto/
    │   │               │   ├── 📄 ApplicationDto.java
    │   │               │   ├── 📄 JobDto.java
    │   │               │   └── 📄 UserDto.java
    │   │               │
    │   │               ├── 📁 entity/
    │   │               │   ├── 📄 Application.java
    │   │               │   ├── 📄 Job.java
    │   │               │   ├── 📄 Role.java
    │   │               │   └── 📄 User.java
    │   │               │
    │   │               ├── 📁 enums/
    │   │               │   ├── 📄 ApplicationStatusType.java
    │   │               │   └── 📄 StatusType.java
    │   │               │
    │   │               ├── 📁 repository/
    │   │               │   ├── 📄 ApplicationRepository.java
    │   │               │   ├── 📄 JobRepository.java
    │   │               │   ├── 📄 RoleRepository.java
    │   │               │   └── 📄 UserRepository.java
    │   │               │
    │   │               └── 📁 service/
    │   │                   ├── 📄 AnalyticsService.java
    │   │                   ├── 📄 ApplicationService.java
    │   │                   ├── 📄 EmailService.java
    │   │                   ├── 📄 JobService.java
    │   │                   ├── 📄 ResumeParserService.java
    │   │                   ├── 📄 RoleService.java
    │   │                   └── 📄 UserService.java
    │   │
    │   └── 📁 resources/
    │       ├── 📄 application.yml
    │       └── 📄 Query.sql
    │
    └── 📁 test/
        └── 📁 java/
            └── 📁 com/
                └── 📁 keyurpandav/
                    └── 📁 jobber/
                        └── 📄 JobberApplicationTests.java
```
---

## 📁 Project Structure

```text
📁 src/main/java/com/jobportal/
 ├──📁 controller/    # Web & REST Controllers [00:04:52]
 ├──📁 entity/        # JPA Entities (User, Job, Application) [00:01:14]
 ├──📁 repository/    # Data Access Layer [00:02:36]
 ├──📁 service/       # Business Logic
 └──📁 security/      # Spring Security Configuration [00:01:27]

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

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---
# Job Portal System

A complete web-based Job Portal application built with Spring Boot that connects job seekers with employers. This platform allows employers to post job opportunities while enabling applicants to browse and apply for positions seamlessly.

## 📢For Better Understand The Flow Refers To My Video : 
👉 https://youtu.be/DxSpEyaUvmU?si=0G3Eai4lI_qSitMW

## 🎯 What This System Does

### For Job Seekers (Applicants)
- **Create Your Profile** - Register as a job seeker with your skills, experience, and contact information
- **Discover Opportunities** - Browse through all available job postings from various employers
- **One-Click Applications** - Apply to jobs instantly by submitting your resume URL
- **Track Your Progress** - Monitor your application status in real-time (Pending, Reviewed, Accepted, Rejected)
- **Personal Dashboard** - Manage all your applications in one place with a clean, organized interface

### For Employers & Companies
- **Company Registration** - Create an employer account to start hiring
- **Post Job Openings** - Create detailed job listings with title, description, salary, and location
- **Receive Applications** - Get applications from qualified candidates directly through the platform
- **Manage Candidates** - Review applicant profiles and their submitted resumes
- **Update Application Status** - Keep candidates informed by updating their application status
- **Track Hiring Pipeline** - See how many applications you've received for each job posting

## 🔄 How It Works

### Registration & Onboarding
1. **Choose Your Role** - Select either "Applicant" or "Employer" during registration
2. **Complete Profile** - Fill in your details, skills, and experience
3. **Get Started** - Access your personalized dashboard based on your role

### Job Application Process
1. **Browse Jobs** - Applicants can view all available positions
2. **Apply Instantly** - Click "Apply" and submit resume URL
3. **Automatic Tracking** - System tracks application date and status
4. **Status Updates** - Employers update status, applicants see changes in real-time

### Job Posting & Management
1. **Create Listing** - Employers post jobs with complete details
2. **Receive Applications** - Candidates apply directly to your posting
3. **Review Candidates** - View applicant profiles and resumes
4. **Make Decisions** - Update application status to keep candidates informed

## 🏆 Key Features

### Smart User Management
- **Dual Role System** - Separate interfaces for applicants and employers
- **Secure Authentication** - Protected login with role-based access
- **Profile Management** - Complete control over personal information

### Efficient Job Matching
- **Comprehensive Listings** - Detailed job descriptions with salary and location
- **Easy Applications** - Simple, fast application process for candidates
- **Instant Notifications** - Real-time status updates for applicants

### Professional Hiring Tools
- **Application Tracking** - Complete pipeline management for employers
- **Candidate Management** - Organized view of all applicants
- **Status Workflow** - Clear progression from application to decision

## 💼 Use Cases

### Perfect For:
- **Job Seekers** looking for new opportunities
- **Recent Graduates** entering the job market
- **Career Changers** exploring new fields
- **Small Businesses** needing hiring solutions
- **Recruitment Agencies** managing multiple clients
- **HR Departments** streamlining hiring processes

## 🚀 Benefits

### For Job Applicants
- **Time Saving** - Apply to multiple jobs quickly
- **Organization** - Track all applications in one place
- **Transparency** - See real-time status updates
- **Accessibility** - Access from any device with internet

### For Employers
- **Efficiency** - Streamline your hiring process
- **Organization** - Manage all applications systematically
- **Cost Effective** - Free alternative to expensive job portals
- **Better Candidates** - Direct access to interested applicants

## 📊 System Architecture

### Frontend Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **User-Friendly Interface** - Intuitive navigation for all user types
- **Real-Time Updates** - Instant status changes without page refresh

### Backend Power
- **Secure Platform** - Protected user data and privacy
- **Scalable Infrastructure** - Handles multiple users and applications
- **Reliable Performance** - Consistent experience for all users

## 🔒 Privacy & Security

- **Secure Data Storage** - All user information protected
- **Private Applications** - Only relevant employers see your applications
- **Confidential Job Postings** - Controlled visibility of company information
- **Data Protection** - Industry-standard security practices

## 🎨 User Experience

### Clean & Professional Design
- **Modern Interface** - Contemporary design that's easy to use
- **Clear Navigation** - Find what you need quickly and easily
- **Mobile Friendly** - Perfect experience on any device
- **Fast Performance** - Quick loading and smooth interactions

### Intuitive Workflows
- **Simple Registration** - Get started in minutes
- **Easy Job Search** - Find relevant opportunities quickly
- **Streamlined Applications** - Apply to jobs with minimal effort
- **Clear Status Tracking** - Always know where you stand

## 🌟 Why Choose This System?

### For Job Seekers
- **Completely Free** - No hidden costs or subscription fees
- **User-Friendly** - Designed for everyone, regardless of tech experience
- **Time-Efficient** - Apply to multiple jobs quickly and easily
- **Professional** - Present yourself effectively to employers

### For Employers
- **Cost Effective** - Free platform for all your hiring needs
- **Easy to Use** - Simple interface for posting and managing jobs
- **Quality Candidates** - Attract serious, qualified applicants
- **Efficient Process** - Streamline your entire hiring workflow

---

**Ready to transform your job search or hiring process?** This platform provides everything you need in one simple, powerful system that actually works for real people and real businesses.
