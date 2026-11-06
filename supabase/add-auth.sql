-- ====================================================
-- EduMarket - Authentication Schema Update
-- Run this in Supabase SQL Editor to add username and password
-- ====================================================

ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT;

-- Update existing users with usernames and passwords
UPDATE users SET username = 'mint', password = 'password123' WHERE id = 'student1';
UPDATE users SET username = 'pun', password = 'password123' WHERE id = 'student2';
UPDATE users SET username = 'fah', password = 'password123' WHERE id = 'student3';
UPDATE users SET username = 'ton', password = 'password123' WHERE id = 'student4';
UPDATE users SET username = 'namfon', password = 'password123' WHERE id = 'student5';
UPDATE users SET username = 'karn', password = 'password123' WHERE id = 'student6';
UPDATE users SET username = 'praew', password = 'password123' WHERE id = 'student7';
UPDATE users SET username = 'peem', password = 'password123' WHERE id = 'student8';
UPDATE users SET username = 'khaohom', password = 'password123' WHERE id = 'student9';
UPDATE users SET username = 'new', password = 'password123' WHERE id = 'student10';
UPDATE users SET username = 'bella', password = 'password123' WHERE id = 'student11';
UPDATE users SET username = 'joe', password = 'password123' WHERE id = 'student12';

UPDATE users SET username = 'ploy', password = 'password123' WHERE id = 'teacher1';
UPDATE users SET username = 'nont', password = 'password123' WHERE id = 'teacher2';
UPDATE users SET username = 'may', password = 'password123' WHERE id = 'teacher3';
UPDATE users SET username = 'ek', password = 'password123' WHERE id = 'teacher4';

UPDATE users SET username = 'admin', password = 'admin123' WHERE id = 'admin1';

