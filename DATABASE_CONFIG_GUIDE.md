# Database Configuration Guide

## Files Created

1. **`.env`** - Contains your actual database credentials (DO NOT commit to Git)
2. **`.env.example`** - Template file for other developers
3. **`application.properties`** - Spring Boot native configuration file

## Setup Instructions

### Option 1: Using application.properties (Recommended - Easiest)

1. **Edit the `application.properties` file** and replace the placeholder values:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/job_portal
   spring.datasource.username=postgres
   spring.datasource.password=your_actual_password
   ```

2. **Delete or rename `application.yml`** to avoid conflicts:
   - Spring Boot will use `application.properties` if both exist

3. **Restart your application** - Spring Boot will automatically pick up the configuration

### Option 2: Using .env file (Requires additional setup)

If you prefer using a `.env` file, you need to:

1. **Add the `dotenv-java` dependency** to your `pom.xml`:
   ```xml
   <dependency>
       <groupId>io.github.cdimascio</groupId>
       <artifactId>dotenv-java</artifactId>
       <version>3.0.0</version>
   </dependency>
   ```

2. **Update `application.yml` or `application.properties`** to use environment variables:
   ```yaml
   spring:
     datasource:
       url: ${DB_URL}
       username: ${DB_USERNAME}
       password: ${DB_PASSWORD}
     jpa:
       hibernate.ddl-auto: ${JPA_DDL_AUTO}
   ```

3. **Edit the `.env` file** with your actual credentials:
   ```
   DB_URL=jdbc:postgresql://localhost:5432/job_portal
   DB_USERNAME=postgres
   DB_PASSWORD=your_actual_password
   JPA_DDL_AUTO=update
   ```

4. **Load the .env file** in your main application class:
   ```java
   import io.github.cdimascio.dotenv.Dotenv;
   
   @SpringBootApplication
   public class JobberApplication {
       public static void main(String[] args) {
           Dotenv dotenv = Dotenv.configure().load();
           System.setProperty("DB_URL", dotenv.get("DB_URL"));
           System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
           System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
           System.setProperty("JPA_DDL_AUTO", dotenv.get("JPA_DDL_AUTO"));
           
           SpringApplication.run(JobberApplication.class, args);
       }
   }
   ```

### Option 3: Using Environment Variables (Production Best Practice)

For production deployments, set environment variables directly:

**Windows (PowerShell):**
```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/job_portal"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="your_password"
```

**Linux/Mac:**
```bash
export DB_URL="jdbc:postgresql://localhost:5432/job_portal"
export DB_USERNAME="postgres"
export DB_PASSWORD="your_password"
```

## Security Best Practices

✅ **DO:**
- Keep `.env` in `.gitignore` (already done)
- Use `.env.example` as a template for other developers
- Use different credentials for development and production
- Use environment variables in production

❌ **DON'T:**
- Commit `.env` to version control
- Share your actual passwords in code or documentation
- Use the same credentials across environments

## Next Steps

1. Choose which option you want to use (I recommend Option 1 for simplicity)
2. Update the configuration with your actual PostgreSQL credentials
3. Ensure PostgreSQL is running on `localhost:5432`
4. Create the database: `CREATE DATABASE job_portal;`
5. Run your Spring Boot application

## Current Database Setup

Based on your `application.yml`, you're currently using:
- Database: `jobberdb`
- Username: `postgres`
- Password: `admin`
- Port: `5432`

You can either:
- Update the new configuration files to match these values, OR
- Create a new database called `job_portal` as specified in the new files
