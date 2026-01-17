# Admin Dashboard Setup Instructions

## Quick Setup - Create Admin User in Database

### Option 1: Using SQL Script (Recommended)

1. **Run the SQL script** provided in `src/main/resources/admin_setup.sql`:
   ```sql
   -- Connect to your PostgreSQL database
   psql -U postgres -d job_portal -f src/main/resources/admin_setup.sql
   ```
   
   Or manually run the SQL commands in your database client.

2. **Default Admin Credentials:**
   - **Username:** `admin`
   - **Password:** `admin123`
   - **Email:** `admin@jobportal.com`

3. **Login:**
   - Go to `http://localhost:8080/login`
   - Enter username: `admin` and password: `admin123`
   - You will be redirected to the Admin Dashboard

### Option 2: Using Application API (Alternative)

If you prefer to create the admin user programmatically:

1. **First, create the ADMIN role** (if it doesn't exist):
   ```bash
   curl -X POST http://localhost:8080/role \
     -H "Content-Type: application/json" \
     -d '{"name": "ADMIN"}'
   ```

2. **Then create an admin user** using the registration endpoint (you'll need to modify the registration to accept ADMIN role, or create it directly in the database).

### Option 3: Manual Database Entry

1. **Connect to your PostgreSQL database:**
   ```bash
   psql -U postgres -d job_portal
   ```

2. **Create ADMIN role:**
   ```sql
   INSERT INTO roles (name) VALUES ('ADMIN') ON CONFLICT DO NOTHING;
   ```

3. **Get the ADMIN role ID:**
   ```sql
   SELECT id FROM roles WHERE name = 'ADMIN';
   ```

4. **Create admin user with BCrypt password:**
   
   You need to generate a BCrypt hash for your password. You can:
   - Use an online BCrypt generator: https://www.bcrypt-generator.com/
   - Or use this pre-generated hash for password "admin123":
     ```
     $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
     ```
   
   ```sql
   INSERT INTO users (username, email, password, full_name, role_id, created_at)
   VALUES (
       'admin',
       'admin@jobportal.com',
       '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
       'System Administrator',
       (SELECT id FROM roles WHERE name = 'ADMIN'),
       CURRENT_TIMESTAMP
   );
   ```

### Generate Your Own BCrypt Password Hash

If you want to use a different password, you can generate a BCrypt hash using:

1. **Online tool:** https://www.bcrypt-generator.com/
2. **Java code:**
   ```java
   BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
   String hash = encoder.encode("your_password_here");
   System.out.println(hash);
   ```
3. **Spring Boot Shell:**
   ```bash
   # In your application, you can use:
   BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
   encoder.encode("your_password");
   ```

### Verify Admin User

After creating the admin user, verify it exists:

```sql
SELECT u.id, u.username, u.email, u.full_name, r.name as role_name
FROM users u
JOIN roles r ON u.role_id = r.id
WHERE u.username = 'admin';
```

### Access Admin Dashboard

1. Start your Spring Boot application
2. Navigate to: `http://localhost:8080/login`
3. Login with admin credentials
4. You will be automatically redirected to: `http://localhost:8080/dashboard/admin`

### Admin Dashboard Features

Once logged in as admin, you can:
- ✅ View all users in the system
- ✅ Delete users
- ✅ View all job postings
- ✅ Moderate job postings (change status: Open/Close)
- ✅ Delete job postings
- ✅ View system statistics (total users, jobs, applications)
- ✅ View users by role statistics
- ✅ View jobs by status statistics

### Security Note

⚠️ **Important:** Change the default admin password after first login for security purposes!
