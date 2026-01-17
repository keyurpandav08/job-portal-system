-- Fix Admin Password - Run this after generating a new BCrypt hash
-- 
-- Step 1: Generate a BCrypt hash using the utility endpoint:
--   Visit: http://localhost:8080/util/hash?password=admin123
--   Copy the generated hash
--
-- Step 2: Update the admin user's password with the new hash:

-- Option A: If you know the admin user ID
UPDATE users 
SET password = 'YOUR_BCRYPT_HASH_HERE'
WHERE username = 'admin';

-- Option B: Using a subquery (safer)
UPDATE users 
SET password = 'YOUR_BCRYPT_HASH_HERE'
WHERE username = 'admin' 
  AND role_id = (SELECT id FROM roles WHERE name = 'ADMIN');

-- Step 3: Verify the password was updated
SELECT username, email, 
       SUBSTRING(password, 1, 20) || '...' as password_hash_preview
FROM users 
WHERE username = 'admin';
