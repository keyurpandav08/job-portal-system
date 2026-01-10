# Database Connection Checklist

## ✅ Steps to Connect Your PostgreSQL Database to Spring Boot

### Step 1: Verify Database Exists in pgAdmin 4

1. Open **pgAdmin 4**
2. Expand **Servers** → **PostgreSQL 17** (or your version)
3. Look for your database name under **Databases**
4. **Note down the exact database name** (case-sensitive!)

### Step 2: Update application.properties

Your current configuration is:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/jobberdb
spring.datasource.username=postgres
spring.datasource.password=admin
```

**Update these values to match your pgAdmin 4 database:**

- **Database name**: Replace `jobberdb` with your actual database name
- **Username**: Usually `postgres` (default)
- **Password**: The password you set during PostgreSQL installation
- **Port**: Usually `5432` (default)

### Step 3: Verify PostgreSQL is Running

Check if PostgreSQL service is running:
```powershell
Get-Service -Name "*postgres*"
```

If it shows "Running", you're good to go! ✅

### Step 4: Test Connection from pgAdmin 4

Before running Spring Boot, test the connection in pgAdmin 4:

1. Right-click on your database
2. Select **Query Tool**
3. Run this simple query:
   ```sql
   SELECT version();
   ```
4. If it works, your database is accessible ✅

### Step 5: Run Your Spring Boot Application

Use Maven wrapper to run:
```powershell
.\mvnw.cmd spring-boot:run
```

### Step 6: Check for Connection Success

Look for these messages in the console:

✅ **SUCCESS indicators:**
- `HikariPool-1 - Start completed`
- `Started JobberApplication in X seconds`
- `DATABASE CONNECTION TEST` with ✅ symbol
- No exceptions or errors

❌ **FAILURE indicators:**
- `Connection refused`
- `database "xxx" does not exist`
- `password authentication failed`
- `Unable to determine Dialect`

## Common Issues and Solutions

### Issue 1: "database does not exist"
**Solution:** Create the database in pgAdmin 4:
1. Right-click **Databases**
2. Select **Create** → **Database**
3. Enter name: `jobberdb` (or your preferred name)
4. Click **Save**

### Issue 2: "password authentication failed"
**Solution:** Update the password in `application.properties` to match your PostgreSQL password

### Issue 3: "Connection refused"
**Solution:** 
- Ensure PostgreSQL service is running
- Check if port 5432 is correct (verify in pgAdmin 4 → Server Properties)

### Issue 4: "Unable to determine Dialect"
**Solution:** Already fixed! Your `application.properties` now includes:
```properties
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

## Quick Connection Test

To quickly test if your database is accessible, run this PowerShell command:

```powershell
$env:PGPASSWORD='admin'; & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d jobberdb -c "SELECT 1;"
```

Replace:
- `admin` with your password
- `jobberdb` with your database name
- `17` with your PostgreSQL version if different

If this works, Spring Boot should connect successfully! ✅

## What Happens When Spring Boot Connects?

With `spring.jpa.hibernate.ddl-auto=update`, Spring Boot will:

1. ✅ Connect to your PostgreSQL database
2. ✅ Automatically create tables based on your Entity classes:
   - `users` table (from User.java)
   - `roles` table (from Role.java)
   - `jobs` table (from Job.java)
   - `applications` table (from Application.java)
3. ✅ Create relationships and foreign keys
4. ✅ Add columns if you modify entities later

**You don't need to manually create tables!** Spring Boot does it automatically.

## Next Steps After Successful Connection

1. ✅ Verify tables were created in pgAdmin 4
2. ✅ Test your REST API endpoints
3. ✅ Add sample data through your application
4. ✅ View data in pgAdmin 4 Query Tool

## Need Help?

If you're still having issues, please provide:
1. Your exact database name from pgAdmin 4
2. The error message from Spring Boot console
3. Screenshot of your databases in pgAdmin 4 (if possible)
