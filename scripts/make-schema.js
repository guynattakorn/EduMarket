const fs = require('fs');

const js = fs.readFileSync('app-decoded.js', 'utf8');
const end = js.indexOf('function Xu(');
const code = js.substring(0, end);
const fn = new Function(code + '; return Mn();');
const data = fn();

function sqlEscape(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'object') return "'" + JSON.stringify(val).replace(/'/g, "''") + "'::jsonb";
  return "'" + String(val).replace(/'/g, "''") + "'";
}

let sql = `-- ==========================================
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
`;

const tables = [
  'classes', 'users', 'shops', 'products', 'orders',
  'reviews', 'notifications', 'messages', 'assignments',
  'submissions', 'student_progress', 'contents', 'logs'
];

tables.forEach(t => {
  sql += `ALTER TABLE ${t} ENABLE ROW LEVEL SECURITY;\n`;
  sql += `DROP POLICY IF EXISTS "Public read on ${t}" ON ${t};\n`;
  sql += `CREATE POLICY "Public read on ${t}" ON ${t} FOR SELECT USING (true);\n`;
  sql += `DROP POLICY IF EXISTS "Public insert on ${t}" ON ${t};\n`;
  sql += `CREATE POLICY "Public insert on ${t}" ON ${t} FOR INSERT WITH CHECK (true);\n`;
  sql += `DROP POLICY IF EXISTS "Public update on ${t}" ON ${t};\n`;
  sql += `CREATE POLICY "Public update on ${t}" ON ${t} FOR UPDATE USING (true);\n`;
  sql += `DROP POLICY IF EXISTS "Public delete on ${t}" ON ${t};\n`;
  sql += `CREATE POLICY "Public delete on ${t}" ON ${t} FOR DELETE USING (true);\n\n`;
});

sql += `-- ==========================================
-- SEED DATA INSERTS
-- ==========================================

`;

data.classes.forEach(c => {
  sql += `INSERT INTO classes (id, name, code, teacher_id) VALUES (${sqlEscape(c.id)}, ${sqlEscape(c.name)}, ${sqlEscape(c.code)}, ${sqlEscape(c.teacherId)}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, code = EXCLUDED.code, teacher_id = EXCLUDED.teacher_id;\n`;
});
sql += '\n';

data.users.forEach(u => {
  sql += `INSERT INTO users (id, name, role, avatar, class_id) VALUES (${sqlEscape(u.id)}, ${sqlEscape(u.name)}, ${sqlEscape(u.role)}, ${sqlEscape(u.avatar)}, ${sqlEscape(u.classId)}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, avatar = EXCLUDED.avatar, class_id = EXCLUDED.class_id;\n`;
});
sql += '\n';

data.shops.forEach(s => {
  sql += `INSERT INTO shops (id, name, tagline, emoji, color, class_id, members) VALUES (${sqlEscape(s.id)}, ${sqlEscape(s.name)}, ${sqlEscape(s.tagline)}, ${sqlEscape(s.emoji)}, ${sqlEscape(s.color)}, ${sqlEscape(s.classId)}, ${sqlEscape(s.members)}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, tagline = EXCLUDED.tagline, emoji = EXCLUDED.emoji, color = EXCLUDED.color, class_id = EXCLUDED.class_id, members = EXCLUDED.members;\n`;
});
sql += '\n';

data.products.forEach(p => {
  sql += `INSERT INTO products (id, shop_id, name, description, price, cost, stock, category, emoji, color, views, wish_base, wished_by, preorder, created_at) VALUES (${sqlEscape(p.id)}, ${sqlEscape(p.shopId)}, ${sqlEscape(p.name)}, ${sqlEscape(p.description)}, ${sqlEscape(p.price)}, ${sqlEscape(p.cost)}, ${sqlEscape(p.stock)}, ${sqlEscape(p.category)}, ${sqlEscape(p.emoji)}, ${sqlEscape(p.color)}, ${sqlEscape(p.views)}, ${sqlEscape(p.wishBase)}, ${sqlEscape(p.wishedBy)}, ${sqlEscape(p.preorder)}, ${sqlEscape(p.createdAt)}) ON CONFLICT (id) DO NOTHING;\n`;
});
sql += '\n';

data.orders.forEach(o => {
  sql += `INSERT INTO orders (id, buyer_id, shop_id, items, status, pickup, time, is_demo, created_at) VALUES (${sqlEscape(o.id)}, ${sqlEscape(o.buyer)}, ${sqlEscape(o.shopId)}, ${sqlEscape(o.items)}, ${sqlEscape(o.status)}, ${sqlEscape(o.pickup)}, ${sqlEscape(o.time)}, ${sqlEscape(o.demo)}, ${sqlEscape(o.date)}) ON CONFLICT (id) DO NOTHING;\n`;
});
sql += '\n';

data.reviews.forEach(r => {
  sql += `INSERT INTO reviews (id, product_id, user_id, rating, text, created_at) VALUES (${sqlEscape(r.id)}, ${sqlEscape(r.productId)}, ${sqlEscape(r.userId)}, ${sqlEscape(r.rating)}, ${sqlEscape(r.text)}, ${sqlEscape(r.date)}) ON CONFLICT (id) DO NOTHING;\n`;
});
sql += '\n';

data.assignments.forEach(a => {
  sql += `INSERT INTO assignments (id, class_id, teacher_id, title, body, due) VALUES (${sqlEscape(a.id)}, ${sqlEscape(a.classId)}, ${sqlEscape(a.teacherId)}, ${sqlEscape(a.title)}, ${sqlEscape(a.body)}, ${sqlEscape(a.due)}) ON CONFLICT (id) DO NOTHING;\n`;
});
sql += '\n';

data.contents.forEach(c => {
  sql += `INSERT INTO contents (id, class_id, title, category, body) VALUES (${sqlEscape(c.id)}, ${sqlEscape(c.classId)}, ${sqlEscape(c.title)}, ${sqlEscape(c.category)}, ${sqlEscape(c.body)}) ON CONFLICT (id) DO NOTHING;\n`;
});
sql += '\n';

data.logs.forEach(l => {
  sql += `INSERT INTO logs (id, shop_id, product_id, type, before_val, after_val, reason, actor, created_at) VALUES (${sqlEscape(l.id)}, ${sqlEscape(l.shopId)}, ${sqlEscape(l.productId)}, ${sqlEscape(l.type)}, ${sqlEscape(l.before)}, ${sqlEscape(l.after)}, ${sqlEscape(l.reason)}, ${sqlEscape(l.actor)}, ${sqlEscape(l.date)}) ON CONFLICT (id) DO NOTHING;\n`;
});
sql += '\n';

data.notifications.forEach(n => {
  sql += `INSERT INTO notifications (id, user_id, title, text, type, is_read, created_at) VALUES (${sqlEscape(n.id)}, ${sqlEscape(n.to)}, ${sqlEscape(n.title)}, ${sqlEscape(n.text)}, ${sqlEscape(n.type)}, ${sqlEscape(n.read)}, ${sqlEscape(n.date)}) ON CONFLICT (id) DO NOTHING;\n`;
});
sql += '\n';

data.messages.forEach(m => {
  sql += `INSERT INTO messages (id, from_user_id, to_user_id, text, created_at) VALUES (${sqlEscape(m.id)}, ${sqlEscape(m.from)}, ${sqlEscape(m.to)}, ${sqlEscape(m.text)}, ${sqlEscape(m.date)}) ON CONFLICT (id) DO NOTHING;\n`;
});
sql += '\n';

for (const [studentId, modules] of Object.entries(data.progress)) {
  sql += `INSERT INTO student_progress (student_id, modules) VALUES (${sqlEscape(studentId)}, ${sqlEscape(modules)}) ON CONFLICT (student_id) DO UPDATE SET modules = EXCLUDED.modules;\n`;
}

if (!fs.existsSync('supabase')) fs.mkdirSync('supabase');
fs.writeFileSync('supabase/schema.sql', sql, 'utf8');
console.log('Successfully generated supabase/schema.sql, size:', sql.length, 'bytes');

