-- Admin Setup Script for Job Portal System
-- Run this script in your PostgreSQL database to create an admin user

-- Step 1: Create ADMIN role if it doesn't exist
INSERT INTO roles (name)
SELECT 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'ADMIN');

-- Step 2: Get the ADMIN role ID (you'll need this for the next step)
-- Run this query to see the role ID:
-- SELECT id, name FROM roles WHERE name = 'ADMIN';

-- Step 3: Create admin user
-- Replace the password hash below with your own BCrypt hash if needed
-- The password hash below is for password: "admin123"
-- To generate your own BCrypt hash, you can use an online tool or Spring's BCryptPasswordEncoder

INSERT INTO users (username, email, password, full_name, role_id, created_at)
SELECT 
    'admin',
    'admin@jobportal.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- BCrypt hash for "admin123"
    'System Administrator',
    (SELECT id FROM roles WHERE name = 'ADMIN'),
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

-- Verify the admin user was created
SELECT u.id, u.username, u.email, u.full_name, r.name as role_name
FROM users u
JOIN roles r ON u.role_id = r.id
WHERE u.username = 'admin';

-- Alternative: If you want to update an existing user to admin role
-- UPDATE users 
-- SET role_id = (SELECT id FROM roles WHERE name = 'ADMIN')
-- WHERE username = 'your_username_here';
