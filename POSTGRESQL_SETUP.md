# PostgreSQL Setup Guide for Job Portal System

## 📋 Prerequisites
- Windows OS
- PostgreSQL installed (version 12 or higher)

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)
Run the provided batch script:
```bash
.\setup-database.bat
```

### Option 2: Manual Setup

#### Step 1: Start PostgreSQL Service
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find "postgresql-x64-16" (or your version)
4. Right-click → Start (if not running)

#### Step 2: Open Command Prompt as Administrator
```bash
# Navigate to PostgreSQL bin directory
cd "C:\Program Files\PostgreSQL\16\bin"

# Connect to PostgreSQL
psql -U postgres

# Enter your password when prompted (default: admin)
```

#### Step 3: Create Database
Once connected to PostgreSQL, run:
```sql
CREATE DATABASE jobberdb;
```

Verify the database was created:
```sql
\l
```

Exit PostgreSQL:
```sql
\q
```

## 🔧 Configuration

The application is configured to use:
- **Database Name:** `jobberdb`
- **Username:** `postgres`
- **Password:** `admin`
- **Port:** `5432`
- **Host:** `localhost`

These settings are in: `src/main/resources/application.yml`

### To Change Database Credentials:
Edit `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/jobberdb
    username: your_username
    password: your_password
```

## ✅ Verify Setup

### Check PostgreSQL is Running:
```bash
# Check service status
sc query postgresql-x64-16

# Or check if port 5432 is listening
netstat -ano | findstr :5432
```

### Test Database Connection:
```bash
psql -U postgres -d jobberdb
```

## 🐛 Troubleshooting

### Issue: "psql: command not found"
**Solution:** Add PostgreSQL to PATH:
1. Search "Environment Variables" in Windows
2. Edit "Path" variable
3. Add: `C:\Program Files\PostgreSQL\16\bin`
4. Restart terminal

### Issue: "password authentication failed"
**Solution:** 
1. Open `pg_hba.conf` (usually in `C:\Program Files\PostgreSQL\16\data`)
2. Change authentication method to `trust` temporarily
3. Restart PostgreSQL service
4. Reset password using:
   ```bash
   ALTER USER postgres PASSWORD 'admin';
   ```

### Issue: "database already exists"
**Solution:** Database is already created! You're good to go.

### Issue: "could not connect to server"
**Solution:** 
1. Check if PostgreSQL service is running
2. Verify port 5432 is not blocked by firewall
3. Check `postgresql.conf` for correct port setting

## 🎯 Next Steps

After database setup:
1. Run the Spring Boot backend:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```

2. The application will automatically create tables using JPA/Hibernate

3. Access the application at: `http://localhost:8080`

## 📚 Useful PostgreSQL Commands

```sql
-- List all databases
\l

-- Connect to a database
\c jobberdb

-- List all tables
\dt

-- View table structure
\d table_name

-- Drop database (if needed)
DROP DATABASE jobberdb;

-- Create new user
CREATE USER myuser WITH PASSWORD 'mypassword';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE jobberdb TO myuser;
```

## 🔗 Resources
- [PostgreSQL Official Docs](https://www.postgresql.org/docs/)
- [pgAdmin Documentation](https://www.pgadmin.org/docs/)
- [Spring Boot + PostgreSQL Guide](https://spring.io/guides/gs/accessing-data-jpa/)
