-- ====================================================
-- EduMarket Rich Seed Dataset
-- 4 Classes | 17 Users | 8 Shops | 26 Products | 50+ Orders | 24+ Reviews
-- ====================================================

-- Classes
INSERT INTO classes (id, name, code, teacher_id) VALUES
('c1', 'ผู้ประกอบการรุ่นจิ๋ว · ม.4/1', 'BIZ401', 'teacher1'),
('c2', 'โครงงานธุรกิจสร้างสรรค์ · ม.4/2', 'BIZ402', 'teacher2'),
('c3', 'นวัตกรรมและการตลาดดิจิทัล · ม.5/1', 'MKT501', 'teacher3'),
('c4', 'ตลาดนัดและธุรกิจจำลอง · ม.6/3', 'ENT603', 'teacher4')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, code = EXCLUDED.code, teacher_id = EXCLUDED.teacher_id;

-- Users
INSERT INTO users (id, name, role, avatar, class_id) VALUES
('teacher1', 'ครูพลอย', 'teacher', '👩🏻‍🏫', 'c1'),
('teacher2', 'ครูนนท์', 'teacher', '👨🏻‍🏫', 'c2'),
('teacher3', 'ครูเมย์', 'teacher', '👩🏼‍🏫', 'c3'),
('teacher4', 'ครูเอก', 'teacher', '👨🏽‍🏫', 'c4'),
('student1', 'มินต์', 'student', '👩🏻', 'c1'),
('student2', 'ปัน', 'student', '👦🏻', 'c1'),
('student3', 'ฟ้า', 'student', '👩🏽', 'c1'),
('student4', 'ต้น', 'student', '👨🏻', 'c2'),
('student5', 'น้ำฝน', 'student', '👧🏻', 'c2'),
('student6', 'กานต์', 'student', '👦🏼', 'c2'),
('student7', 'แพรว', 'student', '👩🏼', 'c3'),
('student8', 'ภีม', 'student', '🧑🏻', 'c3'),
('student9', 'ข้าวหอม', 'student', '👧🏼', 'c3'),
('student10', 'นิว', 'student', '👦🏽', 'c4'),
('student11', 'เบลล่า', 'student', '👩🏻', 'c4'),
('student12', 'โจ้', 'student', '🧑🏽', 'c4'),
('admin1', 'ผู้ดูแลระบบ', 'admin', '🧑🏻‍💻', NULL)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, avatar = EXCLUDED.avatar, class_id = EXCLUDED.class_id;

-- Shops
INSERT INTO shops (id, name, tagline, emoji, color, class_id, members) VALUES
('s1', 'มินต์กับเพื่อน (Mint & Friends)', 'ของอร่อย ของน่ารัก คัดสรรจากพวกเรา ม.4/1', '🥪', 'lime', 'c1', '["student1", "student2"]'::jsonb),
('s2', 'ฟ้าทำเอง Handmade Studio', 'งานแฮนด์เมดเล็ก ๆ ที่ตั้งใจทำด้วยความประณีต', '🌸', 'lavender', 'c1', '["student3"]'::jsonb),
('s3', 'ชมรมวันดีดี Bakery', 'ขนมอบสดใหม่ทุกเช้า เติมพลังใจก่อนเข้าแถว', '🧁', 'peach', 'c2', '["student4", "student5"]'::jsonb),
('s4', 'Craft & Clay โดย กานต์', 'พวงกุญแจและจานรองเรซิ่น ปั้นมือทุกชิ้นไม่มีซ้ำ', '🎨', 'blue', 'c2', '["student6"]'::jsonb),
('s5', 'สรุปติดสปีด (Speed Shortnote)', 'ชีทสรุป 4 สี อ่านเข้าใจง่าย ทบทวนก่อนสอบมั่นใจ', '📚', 'yellow', 'c3', '["student7", "student8"]'::jsonb),
('s6', 'ชาแก้วโปรด (Your Cup Café)', 'ชานมไข่มุกและชาผลไม้แท้ ชื่นใจคลายร้อนช่วงบ่าย', '🧋', 'lime', 'c3', '["student9"]'::jsonb),
('s7', 'Crochet Club (ถักทอสุข)', 'เคสยาดมและพวงกุญแจไหมพรม นุ่มฟูน่ารักสุด ๆ', '🧶', 'pink', 'c4', '["student10", "student11"]'::jsonb),
('s8', 'Snack Attack วาฟเฟิลร้อน', 'วาฟเฟิลกรอบนอกนุ่มใน คุกกี้ช็อกโกแลตเยิ้ม ๆ', '🧇', 'orange', 'c4', '["student12"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, tagline = EXCLUDED.tagline, emoji = EXCLUDED.emoji, color = EXCLUDED.color, class_id = EXCLUDED.class_id, members = EXCLUDED.members;

