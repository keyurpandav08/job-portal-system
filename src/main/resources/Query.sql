-- Fix trailing spaces in roles table
UPDATE roles SET name = TRIM(name) WHERE name != TRIM(name);

-- Verify the fix
SELECT id, name, LENGTH(name) as name_length FROM roles;






