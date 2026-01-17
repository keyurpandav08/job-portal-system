-- Quick Admin Setup - Copy and paste these SQL commands

-- 1. Insert ADMIN role (id will be auto-generated)
INSERT INTO roles (name)
VALUES ('ADMIN')
ON CONFLICT DO NOTHING;

-- 2. Verify ADMIN role was created and get its ID
SELECT id, name FROM roles WHERE name = 'ADMIN';

-- 3. Insert admin user (replace the role_id with the ID from step 2, or use subquery)
-- Password: admin123 (BCrypt hash)
INSERT INTO users (username, email, password, full_name, role_id, created_at)
VALUES (
    'admin',
    'admin@jobportal.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'System Administrator',
    (SELECT id FROM roles WHERE name = 'ADMIN'),
    CURRENT_TIMESTAMP
)
ON CONFLICT (username) DO NOTHING;

-- 4. Verify admin user was created
SELECT u.id, u.username, u.email, u.full_name, r.name as role_name
FROM users u
JOIN roles r ON u.role_id = r.id
WHERE u.username = 'admin';
