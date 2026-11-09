-- ==========================================
-- EduMarket Supabase Schema & Seed Data
-- Database: PostgreSQL (Supabase)
-- ==========================================

-- Clean up existing tables if reset is needed
-- DROP TABLE IF EXISTS submissions CASCADE;
-- DROP TABLE IF EXISTS assignments CASCADE;
-- DROP TABLE IF EXISTS reviews CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS shops CASCADE;
-- DROP TABLE IF EXISTS student_progress CASCADE;
-- DROP TABLE IF EXISTS contents CASCADE;
-- DROP TABLE IF EXISTS logs CASCADE;
-- DROP TABLE IF EXISTS notifications CASCADE;
-- DROP TABLE IF EXISTS messages CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS classes CASCADE;

-- 1. Classes Table
CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  teacher_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  avatar TEXT,
  class_id TEXT REFERENCES classes(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Shops Table
CREATE TABLE IF NOT EXISTS shops (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  emoji TEXT,
  color TEXT,
  class_id TEXT REFERENCES classes(id) ON DELETE SET NULL,
  members JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  shop_id TEXT NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  cost NUMERIC(10,2) DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  emoji TEXT,
  color TEXT,
  image TEXT,
  views INTEGER DEFAULT 0,
  wish_base INTEGER DEFAULT 0,
  wished_by JSONB DEFAULT '[]'::jsonb,
  preorder BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  buyer_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  shop_id TEXT NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'awaiting' CHECK (status IN ('awaiting', 'confirmed', 'preparing', 'delivered', 'cancelled')),
  pickup TEXT,
  time TEXT,
  is_demo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  text TEXT,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  from_user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  to_user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Assignments & Submissions Table
CREATE TABLE IF NOT EXISTS assignments (
  id TEXT PRIMARY KEY,
  class_id TEXT REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body TEXT,
  due TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  assignment_id TEXT REFERENCES assignments(id) ON DELETE CASCADE,
  student_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  body TEXT,
  grade TEXT,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Student Progress Table
CREATE TABLE IF NOT EXISTS student_progress (
  student_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  modules JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Contents (Learning Resources) Table
CREATE TABLE IF NOT EXISTS contents (
  id TEXT PRIMARY KEY,
  class_id TEXT REFERENCES classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT,
  body TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Logs Table
CREATE TABLE IF NOT EXISTS logs (
  id TEXT PRIMARY KEY,
  shop_id TEXT REFERENCES shops(id) ON DELETE CASCADE,
  product_id TEXT,
  type TEXT,
  before_val NUMERIC,
  after_val NUMERIC,
  reason TEXT,
  actor TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_shop_id ON products(shop_id);
CREATE INDEX IF NOT EXISTS idx_orders_shop_id ON orders(shop_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_user_id ON messages(to_user_id);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on classes" ON classes;
CREATE POLICY "Public read on classes" ON classes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on classes" ON classes;
CREATE POLICY "Public insert on classes" ON classes FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on classes" ON classes;
CREATE POLICY "Public update on classes" ON classes FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on classes" ON classes;
CREATE POLICY "Public delete on classes" ON classes FOR DELETE USING (true);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on users" ON users;
CREATE POLICY "Public read on users" ON users FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on users" ON users;
CREATE POLICY "Public insert on users" ON users FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on users" ON users;
CREATE POLICY "Public update on users" ON users FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on users" ON users;
CREATE POLICY "Public delete on users" ON users FOR DELETE USING (true);

ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on shops" ON shops;
CREATE POLICY "Public read on shops" ON shops FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on shops" ON shops;
CREATE POLICY "Public insert on shops" ON shops FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on shops" ON shops;
CREATE POLICY "Public update on shops" ON shops FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on shops" ON shops;
CREATE POLICY "Public delete on shops" ON shops FOR DELETE USING (true);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on products" ON products;
CREATE POLICY "Public read on products" ON products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on products" ON products;
CREATE POLICY "Public insert on products" ON products FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on products" ON products;
CREATE POLICY "Public update on products" ON products FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on products" ON products;
CREATE POLICY "Public delete on products" ON products FOR DELETE USING (true);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on orders" ON orders;
CREATE POLICY "Public read on orders" ON orders FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on orders" ON orders;
CREATE POLICY "Public insert on orders" ON orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on orders" ON orders;
CREATE POLICY "Public update on orders" ON orders FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on orders" ON orders;
CREATE POLICY "Public delete on orders" ON orders FOR DELETE USING (true);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on reviews" ON reviews;
CREATE POLICY "Public read on reviews" ON reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on reviews" ON reviews;
CREATE POLICY "Public insert on reviews" ON reviews FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on reviews" ON reviews;
CREATE POLICY "Public update on reviews" ON reviews FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on reviews" ON reviews;
CREATE POLICY "Public delete on reviews" ON reviews FOR DELETE USING (true);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on notifications" ON notifications;
CREATE POLICY "Public read on notifications" ON notifications FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on notifications" ON notifications;
CREATE POLICY "Public insert on notifications" ON notifications FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on notifications" ON notifications;
CREATE POLICY "Public update on notifications" ON notifications FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on notifications" ON notifications;
CREATE POLICY "Public delete on notifications" ON notifications FOR DELETE USING (true);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on messages" ON messages;
CREATE POLICY "Public read on messages" ON messages FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on messages" ON messages;
CREATE POLICY "Public insert on messages" ON messages FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on messages" ON messages;
CREATE POLICY "Public update on messages" ON messages FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on messages" ON messages;
CREATE POLICY "Public delete on messages" ON messages FOR DELETE USING (true);

ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on assignments" ON assignments;
CREATE POLICY "Public read on assignments" ON assignments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on assignments" ON assignments;
CREATE POLICY "Public insert on assignments" ON assignments FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on assignments" ON assignments;
CREATE POLICY "Public update on assignments" ON assignments FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on assignments" ON assignments;
CREATE POLICY "Public delete on assignments" ON assignments FOR DELETE USING (true);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on submissions" ON submissions;
CREATE POLICY "Public read on submissions" ON submissions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on submissions" ON submissions;
CREATE POLICY "Public insert on submissions" ON submissions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on submissions" ON submissions;
CREATE POLICY "Public update on submissions" ON submissions FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on submissions" ON submissions;
CREATE POLICY "Public delete on submissions" ON submissions FOR DELETE USING (true);

ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on student_progress" ON student_progress;
CREATE POLICY "Public read on student_progress" ON student_progress FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on student_progress" ON student_progress;
CREATE POLICY "Public insert on student_progress" ON student_progress FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on student_progress" ON student_progress;
CREATE POLICY "Public update on student_progress" ON student_progress FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on student_progress" ON student_progress;
CREATE POLICY "Public delete on student_progress" ON student_progress FOR DELETE USING (true);

ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on contents" ON contents;
CREATE POLICY "Public read on contents" ON contents FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on contents" ON contents;
CREATE POLICY "Public insert on contents" ON contents FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on contents" ON contents;
CREATE POLICY "Public update on contents" ON contents FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on contents" ON contents;
CREATE POLICY "Public delete on contents" ON contents FOR DELETE USING (true);

ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read on logs" ON logs;
CREATE POLICY "Public read on logs" ON logs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert on logs" ON logs;
CREATE POLICY "Public insert on logs" ON logs FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update on logs" ON logs;
CREATE POLICY "Public update on logs" ON logs FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Public delete on logs" ON logs;
CREATE POLICY "Public delete on logs" ON logs FOR DELETE USING (true);

-- ==========================================
-- SEED DATA INSERTS
-- ==========================================

INSERT INTO classes (id, name, code, teacher_id) VALUES ('c1', 'ผู้ประกอบการรุ่นจิ๋ว · ม.4/1', 'BIZ401', 'teacher1') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, code = EXCLUDED.code, teacher_id = EXCLUDED.teacher_id;
INSERT INTO classes (id, name, code, teacher_id) VALUES ('c2', 'ธุรกิจสร้างสรรค์ · ม.4/2', 'BIZ402', 'teacher2') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, code = EXCLUDED.code, teacher_id = EXCLUDED.teacher_id;

INSERT INTO users (id, name, role, avatar, class_id) VALUES ('student1', 'มินต์', 'student', '👩🏻', 'c1') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, avatar = EXCLUDED.avatar, class_id = EXCLUDED.class_id;
INSERT INTO users (id, name, role, avatar, class_id) VALUES ('student2', 'ปัน', 'student', '👦🏻', 'c1') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, avatar = EXCLUDED.avatar, class_id = EXCLUDED.class_id;
INSERT INTO users (id, name, role, avatar, class_id) VALUES ('student3', 'ฟ้า', 'student', '👩🏽', 'c1') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, avatar = EXCLUDED.avatar, class_id = EXCLUDED.class_id;
INSERT INTO users (id, name, role, avatar, class_id) VALUES ('student4', 'ต้น', 'student', '👨🏻', 'c2') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, avatar = EXCLUDED.avatar, class_id = EXCLUDED.class_id;
INSERT INTO users (id, name, role, avatar, class_id) VALUES ('teacher1', 'ครูพลอย', 'teacher', '👩🏻‍🏫', NULL) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, avatar = EXCLUDED.avatar, class_id = EXCLUDED.class_id;
INSERT INTO users (id, name, role, avatar, class_id) VALUES ('teacher2', 'ครูนนท์', 'teacher', '👨🏻‍🏫', NULL) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, avatar = EXCLUDED.avatar, class_id = EXCLUDED.class_id;
INSERT INTO users (id, name, role, avatar, class_id) VALUES ('admin1', 'ผู้ดูแลระบบ', 'admin', '🧑🏻‍💻', NULL) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, avatar = EXCLUDED.avatar, class_id = EXCLUDED.class_id;

INSERT INTO shops (id, name, tagline, emoji, color, class_id, members) VALUES ('s1', 'มินต์กับเพื่อน', 'ของอร่อย ของน่ารัก จากพวกเรา ม.4/1', '🥑', 'lime', 'c1', '["student1","student2"]'::jsonb) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, tagline = EXCLUDED.tagline, emoji = EXCLUDED.emoji, color = EXCLUDED.color, class_id = EXCLUDED.class_id, members = EXCLUDED.members;
INSERT INTO shops (id, name, tagline, emoji, color, class_id, members) VALUES ('s2', 'ฟ้าทำเอง', 'งานแฮนด์เมดเล็ก ๆ ที่ตั้งใจทำ', '🌸', 'lavender', 'c1', '["student3"]'::jsonb) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, tagline = EXCLUDED.tagline, emoji = EXCLUDED.emoji, color = EXCLUDED.color, class_id = EXCLUDED.class_id, members = EXCLUDED.members;
INSERT INTO shops (id, name, tagline, emoji, color, class_id, members) VALUES ('s3', 'ชมรมวันดีดี', 'เติมความสดใสให้ทุกวันเรียน', '🍊', 'peach', 'c2', '["student4"]'::jsonb) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, tagline = EXCLUDED.tagline, emoji = EXCLUDED.emoji, color = EXCLUDED.color, class_id = EXCLUDED.class_id, members = EXCLUDED.members;

INSERT INTO products (id, shop_id, name, description, price, cost, stock, category, emoji, color, views, wish_base, wished_by, preorder, created_at) VALUES ('p1', 's1', 'แซนด์วิชไข่ อิ่มก่อนเรียน', 'ขนมปังนุ่ม ไข่ต้มเต็มคำ ทำสดตอนเช้า • มีไข่ นม และแป้งสาลี', 35, 22, 12, 'อาหาร & เครื่องดื่ม', '🥪', 'lime', 124, 18, '[]'::jsonb, FALSE, '2026-10-17T04:50:46.762Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, shop_id, name, description, price, cost, stock, category, emoji, color, views, wish_base, wished_by, preorder, created_at) VALUES ('p2', 's2', 'กำไลลูกปัด สีของเธอ', 'กำไลลูกปัดทำมือ เลือกโทนสีได้ ทักมาคุยกันได้เลย', 49, 24, 8, 'แฮนด์เมด', '📿', 'lavender', 86, 24, '[]'::jsonb, TRUE, '2026-10-17T04:50:46.762Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, shop_id, name, description, price, cost, stock, category, emoji, color, views, wish_base, wished_by, preorder, created_at) VALUES ('p3', 's1', 'สมุดโน้ต ไอเดียเล็ก ๆ', 'สมุดพกขนาด A6 กระดาษถนอมสายตา สำหรับไอเดียใหม่ของทุกวัน', 29, 18, 3, 'เครื่องเขียน', '📒', 'pink', 65, 9, '[]'::jsonb, FALSE, '2026-10-17T04:50:46.762Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, shop_id, name, description, price, cost, stock, category, emoji, color, views, wish_base, wished_by, preorder, created_at) VALUES ('p4', 's3', 'ส้มสดใส น้ำส้มคั้น', 'น้ำส้มคั้นสดขวดเล็ก แช่เย็นพร้อมดื่ม รับที่โรงอาหารช่วงพัก', 25, 17, 15, 'อาหาร & เครื่องดื่ม', '🍊', 'peach', 152, 21, '["student1"]'::jsonb, FALSE, '2026-10-17T04:50:46.762Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, shop_id, name, description, price, cost, stock, category, emoji, color, views, wish_base, wished_by, preorder, created_at) VALUES ('p5', 's2', 'สติกเกอร์ วันเรียนแสนดี', 'สติกเกอร์วาดเอง 1 ชุด 8 ชิ้น แต่งสมุดให้น่าเปิดทุกวัน', 20, 9, 20, 'เครื่องเขียน', '🌼', 'yellow', 74, 12, '[]'::jsonb, FALSE, '2026-10-17T04:50:46.762Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, shop_id, name, description, price, cost, stock, category, emoji, color, views, wish_base, wished_by, preorder, created_at) VALUES ('p6', 's3', 'บราวนี ช็อกเต็มคำ', 'ช็อกโกแลตเข้มข้น อบสด รับจองสำหรับวันพรุ่งนี้ • มีไข่ นม แป้งสาลี', 30, 34, 6, 'อาหาร & เครื่องดื่ม', '🍫', 'sky', 98, 15, '[]'::jsonb, TRUE, '2026-10-17T04:50:46.762Z') ON CONFLICT (id) DO NOTHING;

INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-0-0', 'student2', 's1', '[{"productId":"p1","name":"แซนด์วิชไข่ อิ่มก่อนเรียน","price":35,"cost":22,"qty":1}]'::jsonb, 'delivered', 'โรงอาหารกลาง', '10:30', TRUE, '2026-11-01T04:50:46.762Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-0-1', 'student2', 's1', '[{"productId":"p1","name":"แซนด์วิชไข่ อิ่มก่อนเรียน","price":35,"cost":22,"qty":2}]'::jsonb, 'delivered', 'โรงอาหารกลาง', '12:00', TRUE, '2026-11-02T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-0-2', 'student2', 's1', '[{"productId":"p1","name":"แซนด์วิชไข่ อิ่มก่อนเรียน","price":35,"cost":22,"qty":3}]'::jsonb, 'delivered', 'โรงอาหารกลาง', '16:00', TRUE, '2026-11-03T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-0-3', 'student2', 's1', '[{"productId":"p1","name":"แซนด์วิชไข่ อิ่มก่อนเรียน","price":35,"cost":22,"qty":1}]'::jsonb, 'delivered', 'โรงอาหารกลาง', '10:30', TRUE, '2026-11-04T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-0-4', 'student2', 's1', '[{"productId":"p1","name":"แซนด์วิชไข่ อิ่มก่อนเรียน","price":35,"cost":22,"qty":2}]'::jsonb, 'awaiting', 'โรงอาหารกลาง', '12:00', TRUE, '2026-11-05T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-1-0', 'student2', 's2', '[{"productId":"p2","name":"กำไลลูกปัด สีของเธอ","price":49,"cost":24,"qty":2}]'::jsonb, 'delivered', 'ศาลาหน้าเสาธง', '10:30', TRUE, '2026-10-19T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-1-1', 'student2', 's2', '[{"productId":"p2","name":"กำไลลูกปัด สีของเธอ","price":49,"cost":24,"qty":3}]'::jsonb, 'delivered', 'ศาลาหน้าเสาธง', '12:00', TRUE, '2026-10-20T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-1-2', 'student2', 's2', '[{"productId":"p2","name":"กำไลลูกปัด สีของเธอ","price":49,"cost":24,"qty":1}]'::jsonb, 'delivered', 'ศาลาหน้าเสาธง', '16:00', TRUE, '2026-10-21T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-1-3', 'student2', 's2', '[{"productId":"p2","name":"กำไลลูกปัด สีของเธอ","price":49,"cost":24,"qty":2}]'::jsonb, 'delivered', 'ศาลาหน้าเสาธง', '10:30', TRUE, '2026-10-22T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-1-4', 'student2', 's2', '[{"productId":"p2","name":"กำไลลูกปัด สีของเธอ","price":49,"cost":24,"qty":3}]'::jsonb, 'awaiting', 'ศาลาหน้าเสาธง', '12:00', TRUE, '2026-10-23T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-2-0', 'student2', 's1', '[{"productId":"p3","name":"สมุดโน้ต ไอเดียเล็ก ๆ","price":29,"cost":18,"qty":3}]'::jsonb, 'delivered', 'หน้าห้องพักครู', '10:30', TRUE, '2026-11-01T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-2-1', 'student2', 's1', '[{"productId":"p3","name":"สมุดโน้ต ไอเดียเล็ก ๆ","price":29,"cost":18,"qty":1}]'::jsonb, 'delivered', 'หน้าห้องพักครู', '12:00', TRUE, '2026-11-02T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-2-2', 'student2', 's1', '[{"productId":"p3","name":"สมุดโน้ต ไอเดียเล็ก ๆ","price":29,"cost":18,"qty":2}]'::jsonb, 'delivered', 'หน้าห้องพักครู', '16:00', TRUE, '2026-11-03T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-2-3', 'student2', 's1', '[{"productId":"p3","name":"สมุดโน้ต ไอเดียเล็ก ๆ","price":29,"cost":18,"qty":3}]'::jsonb, 'delivered', 'หน้าห้องพักครู', '10:30', TRUE, '2026-11-04T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-2-4', 'student2', 's1', '[{"productId":"p3","name":"สมุดโน้ต ไอเดียเล็ก ๆ","price":29,"cost":18,"qty":1}]'::jsonb, 'awaiting', 'หน้าห้องพักครู', '12:00', TRUE, '2026-11-05T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-3-0', 'student2', 's3', '[{"productId":"p4","name":"ส้มสดใส น้ำส้มคั้น","price":25,"cost":17,"qty":1}]'::jsonb, 'delivered', 'ใต้ตึกเรียน 3', '10:30', TRUE, '2026-11-01T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-3-1', 'student2', 's3', '[{"productId":"p4","name":"ส้มสดใส น้ำส้มคั้น","price":25,"cost":17,"qty":2}]'::jsonb, 'delivered', 'ใต้ตึกเรียน 3', '12:00', TRUE, '2026-11-02T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-3-2', 'student2', 's3', '[{"productId":"p4","name":"ส้มสดใส น้ำส้มคั้น","price":25,"cost":17,"qty":3}]'::jsonb, 'delivered', 'ใต้ตึกเรียน 3', '16:00', TRUE, '2026-11-03T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-3-3', 'student2', 's3', '[{"productId":"p4","name":"ส้มสดใส น้ำส้มคั้น","price":25,"cost":17,"qty":1}]'::jsonb, 'delivered', 'ใต้ตึกเรียน 3', '10:30', TRUE, '2026-11-04T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-3-4', 'student2', 's3', '[{"productId":"p4","name":"ส้มสดใส น้ำส้มคั้น","price":25,"cost":17,"qty":2}]'::jsonb, 'awaiting', 'ใต้ตึกเรียน 3', '12:00', TRUE, '2026-11-05T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-4-0', 'student2', 's2', '[{"productId":"p5","name":"สติกเกอร์ วันเรียนแสนดี","price":20,"cost":9,"qty":2}]'::jsonb, 'delivered', 'โรงอาหารกลาง', '10:30', TRUE, '2026-11-01T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-4-1', 'student2', 's2', '[{"productId":"p5","name":"สติกเกอร์ วันเรียนแสนดี","price":20,"cost":9,"qty":3}]'::jsonb, 'delivered', 'โรงอาหารกลาง', '12:00', TRUE, '2026-11-02T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-4-2', 'student2', 's2', '[{"productId":"p5","name":"สติกเกอร์ วันเรียนแสนดี","price":20,"cost":9,"qty":1}]'::jsonb, 'delivered', 'โรงอาหารกลาง', '16:00', TRUE, '2026-11-03T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-4-3', 'student2', 's2', '[{"productId":"p5","name":"สติกเกอร์ วันเรียนแสนดี","price":20,"cost":9,"qty":2}]'::jsonb, 'delivered', 'โรงอาหารกลาง', '10:30', TRUE, '2026-11-04T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-4-4', 'student2', 's2', '[{"productId":"p5","name":"สติกเกอร์ วันเรียนแสนดี","price":20,"cost":9,"qty":3}]'::jsonb, 'awaiting', 'โรงอาหารกลาง', '12:00', TRUE, '2026-11-05T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-5-0', 'student2', 's3', '[{"productId":"p6","name":"บราวนี ช็อกเต็มคำ","price":30,"cost":34,"qty":3}]'::jsonb, 'delivered', 'ศาลาหน้าเสาธง', '10:30', TRUE, '2026-11-01T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-5-1', 'student2', 's3', '[{"productId":"p6","name":"บราวนี ช็อกเต็มคำ","price":30,"cost":34,"qty":1}]'::jsonb, 'delivered', 'ศาลาหน้าเสาธง', '12:00', TRUE, '2026-11-02T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-5-2', 'student2', 's3', '[{"productId":"p6","name":"บราวนี ช็อกเต็มคำ","price":30,"cost":34,"qty":2}]'::jsonb, 'delivered', 'ศาลาหน้าเสาธง', '16:00', TRUE, '2026-11-03T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-5-3', 'student2', 's3', '[{"productId":"p6","name":"บราวนี ช็อกเต็มคำ","price":30,"cost":34,"qty":3}]'::jsonb, 'delivered', 'ศาลาหน้าเสาธง', '10:30', TRUE, '2026-11-04T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES ('seed-o-5-4', 'student2', 's3', '[{"productId":"p6","name":"บราวนี ช็อกเต็มคำ","price":30,"cost":34,"qty":1}]'::jsonb, 'awaiting', 'ศาลาหน้าเสาธง', '12:00', TRUE, '2026-11-05T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;

INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r0a', 'p1', 'student2', 5, 'น่ารักมาก รับของสะดวก ไว้มาอุดหนุนอีกนะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r0b', 'p1', 'student3', 4, 'ของตรงปก ร้านตอบเร็วค่ะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r1a', 'p2', 'student2', 5, 'น่ารักมาก รับของสะดวก ไว้มาอุดหนุนอีกนะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r1b', 'p2', 'student3', 4, 'ของตรงปก ร้านตอบเร็วค่ะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r2a', 'p3', 'student2', 5, 'น่ารักมาก รับของสะดวก ไว้มาอุดหนุนอีกนะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r2b', 'p3', 'student3', 4, 'ของตรงปก ร้านตอบเร็วค่ะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r3a', 'p4', 'student2', 5, 'น่ารักมาก รับของสะดวก ไว้มาอุดหนุนอีกนะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r3b', 'p4', 'student3', 4, 'ของตรงปก ร้านตอบเร็วค่ะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r4a', 'p5', 'student2', 5, 'น่ารักมาก รับของสะดวก ไว้มาอุดหนุนอีกนะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r4b', 'p5', 'student3', 4, 'ของตรงปก ร้านตอบเร็วค่ะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r5a', 'p6', 'student2', 3, 'รสชาติดี แต่อยากให้นัดรับตรงเวลาขึ้นค่ะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES ('r5b', 'p6', 'student3', 4, 'ของตรงปก ร้านตอบเร็วค่ะ', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;

INSERT INTO assignments (id, class_id, teacher_id, title, body, due) VALUES ('a1', 'c1', 'teacher1', 'ตั้งราคาสินค้าชิ้นแรกของเรา', 'เลือกสินค้า 1 ชิ้น แยกต้นทุนคงที่และต้นทุนผันแปร แล้วอธิบายเหตุผลในการตั้งราคา พร้อมคำนวณจำนวนที่ต้องขายให้คุ้มทุน', '2026-10-12') ON CONFLICT (id) DO NOTHING;

INSERT INTO contents (id, class_id, title, category, body) VALUES ('ct1', 'c1', 'คิดแบบผู้ประกอบการ', 'แนวคิดธุรกิจ', 'เริ่มจากปัญหาเล็ก ๆ รอบตัว สังเกตว่าเพื่อนต้องการอะไร แล้วทดลองทำในจำนวนน้อยก่อน การทดลองแต่ละครั้งควรมีคำถามและสิ่งที่อยากเรียนรู้') ON CONFLICT (id) DO NOTHING;
INSERT INTO contents (id, class_id, title, category, body) VALUES ('ct2', 'c1', 'การตลาดที่เริ่มจากการฟัง', 'การตลาด', 'ลองถามเพื่อน 5 คนว่าอยากได้สินค้าประเภทไหนและยินดีจ่ายเท่าไร บันทึกคำตอบ แล้วเปรียบเทียบกับยอดขายจริง ความสนใจยังไม่เท่ากับการซื้อ') ON CONFLICT (id) DO NOTHING;
INSERT INTO contents (id, class_id, title, category, body) VALUES ('ct3', 'c1', 'โปสเตอร์หนึ่งใบต้องมีอะไร', 'ภาพ & โปสเตอร์', 'ใช้ภาพสินค้าที่ชัดเจน บอกชื่อ จุดเด่น ราคา และจุดนัดรับ อ่านง่ายบนหน้าจอเล็ก หลีกเลี่ยงการอ้างผลเกินจริง') ON CONFLICT (id) DO NOTHING;
INSERT INTO contents (id, class_id, title, category, body) VALUES ('ct4', 'c1', 'หยุดคิด แล้วลองใหม่', 'วิเคราะห์ & สะท้อนผล', 'หลังขายแต่ละครั้ง เขียนสิ่งที่คาดการณ์ ผลที่เกิดขึ้น และสิ่งที่จะเปลี่ยนในครั้งหน้า อย่าดูแค่ยอดขาย ให้ดูต้นทุน สินค้าเหลือ และความคิดเห็นของลูกค้าด้วย') ON CONFLICT (id) DO NOTHING;

INSERT INTO logs (id, shop_id, product_id, type, before_val, after_val, reason, actor, created_at) VALUES ('l1', 's1', 'p1', 'ราคา', 30, 35, 'เพิ่มไส้ไข่และคำนวณค่าบรรจุภัณฑ์แล้ว', 'student1', '2026-11-05T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO logs (id, shop_id, product_id, type, before_val, after_val, reason, actor, created_at) VALUES ('l2', 's1', 'p3', 'สต็อก', 10, 3, 'ขายในช่วงพักกลางวัน 7 เล่ม', 'student1', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;

INSERT INTO notifications (id, user_id, title, text, type, is_read, created_at) VALUES ('n1', 'student1', 'ครูพลอยมอบหมายงานใหม่', 'ตั้งราคาสินค้าชิ้นแรกของเรา · ส่งภายใน 12 ต.ค.', 'teacher', FALSE, '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;
INSERT INTO notifications (id, user_id, title, text, type, is_read, created_at) VALUES ('n2', 'student1', 'เริ่มต้นเล็ก ๆ เรียนรู้ได้ทุกวัน', 'เลือกเรียนบทไหนก็ได้ แล้วนำไปลองใช้กับร้านของเรา', 'lesson', FALSE, '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;

INSERT INTO messages (id, from_user_id, to_user_id, text, created_at) VALUES ('m1', 'student3', 'student1', 'รับแซนด์วิชที่โรงอาหารช่วง 12:00 ได้ไหมคะ?', '2026-11-06T04:50:46.763Z') ON CONFLICT (id) DO NOTHING;

INSERT INTO student_progress (student_id, modules) VALUES ('student1', '[]'::jsonb) ON CONFLICT (student_id) DO UPDATE SET modules = EXCLUDED.modules;
INSERT INTO student_progress (student_id, modules) VALUES ('student2', '["cost"]'::jsonb) ON CONFLICT (student_id) DO UPDATE SET modules = EXCLUDED.modules;
INSERT INTO student_progress (student_id, modules) VALUES ('student3', '["cost","demand"]'::jsonb) ON CONFLICT (student_id) DO UPDATE SET modules = EXCLUDED.modules;
INSERT INTO student_progress (student_id, modules) VALUES ('student4', '["cost"]'::jsonb) ON CONFLICT (student_id) DO UPDATE SET modules = EXCLUDED.modules;
