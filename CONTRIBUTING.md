# 🤝 Contributing to Job Portal System

Thank you for considering contributing to the Job Portal System! We welcome contributions from the community and are grateful for your support.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

---

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please:

- Be respectful and considerate in your communication
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17+** (JDK 21 recommended)
- **Maven 3.6+**
- **Node.js 18+** and **npm**
- **PostgreSQL 14+**
- **Git**

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/job-portal-system.git
   cd job-portal-system
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/PankajSingh34/job-portal-system.git
   ```

---

## 💻 Development Setup

### Backend Setup

1. **Configure PostgreSQL Database:**
   ```sql
   CREATE DATABASE job_portal;
   ```

2. **Update Application Configuration:**
   Edit `src/main/resources/application.yml`:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/job_portal
       username: your_username
       password: your_password
   ```

3. **Run the Backend:**
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start at `http://localhost:8080`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will start at `http://localhost:5173`

### Verify Setup

- Backend health check: `http://localhost:8080/actuator/health`
- Frontend: `http://localhost:5173`
- Test login with default credentials (if data initializer is configured)

---

## 🛠️ How to Contribute

### Types of Contributions

We appreciate all types of contributions:

1. **🐛 Bug Fixes** - Fix issues and improve stability
2. **✨ New Features** - Add new functionality
3. **📚 Documentation** - Improve or add documentation
4. **🎨 UI/UX Improvements** - Enhance user interface and experience
5. **🧪 Tests** - Add or improve test coverage
6. **♻️ Refactoring** - Improve code quality without changing functionality
7. **🔒 Security** - Enhance security measures

### Contribution Workflow

1. **Check existing issues** or create a new one to discuss your proposed changes
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Commit your changes** with clear commit messages
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** against the `main` branch

---

## 📏 Coding Standards

### Java/Spring Boot (Backend)

- Follow **Java naming conventions** (camelCase for variables/methods, PascalCase for classes)
- Use **meaningful variable and method names**
- Add **JavaDoc comments** for public methods and classes
- Follow **SOLID principles**
- Keep methods focused and concise (Single Responsibility)
- Use **Spring Boot best practices**:
  - Use dependency injection
  - Implement proper exception handling
  - Use DTOs for data transfer
  - Validate input using `@Valid` annotations
- **Package structure**:
  ```
  com.keyurpandav.jobber/
  ├── controller/    # REST controllers
  ├── service/       # Business logic
  ├── repository/    # Data access
  ├── entity/        # JPA entities
  ├── dto/           # Data transfer objects
  ├── config/        # Configuration classes
  ├── exception/     # Custom exceptions
  └── security/      # Security configuration
  ```

### JavaScript/React (Frontend)

- Use **functional components** with hooks
- Follow **React best practices**:
  - Use PropTypes for type checking
  - Implement proper error boundaries
  - Use context for global state
  - Memoize expensive computations
- Use **ES6+ syntax**
- Follow **naming conventions**:
  - Components: PascalCase (`UserProfile.jsx`)
  - Utility files: camelCase (`api.js`)
  - Constants: UPPER_SNAKE_CASE
- **File organization**:
  ```
  src/
  ├── components/    # Reusable components
  ├── pages/         # Page components
  ├── context/       # Context providers
  ├── services/      # API services
  ├── assets/        # Images, icons
  └── theme/         # Theme configuration
  ```
- Run linter before committing:
  ```bash
  npm run lint
  ```

### General Guidelines

- Write **clear, self-documenting code**
- Add **comments** for complex logic
- Keep functions **small and focused**
- Avoid **code duplication** (DRY principle)
- Handle **errors gracefully**
- Use **meaningful commit messages**

---

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD configuration changes

### Examples

```bash
feat(auth): add password reset functionality

- Add password reset endpoint
- Implement email notification
- Add frontend password reset form

Closes #123
```

```bash
fix(job-list): resolve pagination issue

Fixed bug where pagination was not working correctly
when filtering jobs by location.

Fixes #456
```

```bash
docs(readme): update installation instructions

Added Docker setup instructions and clarified
PostgreSQL configuration steps.
```

---

## 🔄 Pull Request Process

### Before Submitting

1. ✅ Ensure your code follows the coding standards
2. ✅ Run all tests and ensure they pass:
   ```bash
   # Backend
   ./mvnw test
   
   # Frontend
   cd frontend && npm test
   ```
3. ✅ Run the linter:
   ```bash
   # Frontend
   npm run lint
   ```
4. ✅ Update documentation if needed
5. ✅ Add or update tests for your changes
6. ✅ Rebase your branch on the latest `main`:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### PR Title and Description

- Use a **clear and descriptive title**
- Follow the commit message format for PR titles
- Provide a **detailed description** of your changes:
  - What problem does it solve?
  - How does it solve it?
  - Any breaking changes?
  - Screenshots (for UI changes)
  - Related issues

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe the tests you ran and how to reproduce

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally

## Related Issues
Closes #(issue number)
```

### Review Process

1. At least one maintainer will review your PR
2. Address any requested changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be credited in the release notes

---

## 🐛 Reporting Bugs

### Before Submitting a Bug Report

- **Check existing issues** to avoid duplicates
- **Verify the bug** in the latest version
- **Collect information** about your environment

### Bug Report Template

When creating a bug report, please include:

```markdown
**Describe the Bug**
A clear and concise description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 10, macOS 12, Ubuntu 22.04]
- Browser: [e.g., Chrome 98, Firefox 96]
- Java Version: [e.g., Java 17]
- Node Version: [e.g., Node 18.12.0]

**Additional Context**
Any other relevant information.
```

---

## 💡 Suggesting Enhancements

### Enhancement Proposal Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features you've considered.

**Additional context**
Any other context, mockups, or screenshots.

**Would you like to work on this?**
Let us know if you're interested in implementing this feature!
```

---

## 🧪 Testing Guidelines

### Backend Tests

- Write **unit tests** for service layer
- Write **integration tests** for repositories
- Write **controller tests** for REST endpoints
- Use **JUnit 5** and **Mockito**
- Aim for **80%+ code coverage**

Example:
```java
@SpringBootTest
@AutoConfigureMockMvc
class JobControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void shouldReturnAllJobs() throws Exception {
        mockMvc.perform(get("/api/jobs"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$").isArray());
    }
}
```

### Frontend Tests

- Write **component tests** using React Testing Library
- Write **unit tests** for utility functions
- Test **user interactions** and **edge cases**
- Aim for **70%+ code coverage**

---

## 📞 Getting Help

If you need help or have questions:

- 💬 Open a [GitHub Discussion](https://github.com/PankajSingh34/job-portal-system/discussions)
- 🐛 Check existing [Issues](https://github.com/PankajSingh34/job-portal-system/issues)
- 📧 Contact the maintainers

---

## 🎉 Recognition

Contributors will be recognized in:
- The project's README
- Release notes
- GitHub's contributor page

Thank you for contributing to the Job Portal System! 🚀

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.
