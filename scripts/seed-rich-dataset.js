require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const rawUrl = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_URL = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '').trim();

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const now = new Date();
const daysAgo = (d, h = 0) => new Date(now.getTime() - (d * 86400000) + (h * 3600000)).toISOString();

// ====================================================================
// 1. Classes
// ====================================================================
const classes = [
  { id: 'c1', name: 'ผู้ประกอบการรุ่นจิ๋ว · ม.4/1', code: 'BIZ401', teacher_id: 'teacher1' },
  { id: 'c2', name: 'โครงงานธุรกิจสร้างสรรค์ · ม.4/2', code: 'BIZ402', teacher_id: 'teacher2' },
  { id: 'c3', name: 'นวัตกรรมและการตลาดดิจิทัล · ม.5/1', code: 'MKT501', teacher_id: 'teacher3' },
  { id: 'c4', name: 'ตลาดนัดและธุรกิจจำลอง · ม.6/3', code: 'ENT603', teacher_id: 'teacher4' },
];

// ====================================================================
// 2. Users (Teachers, Students, Admin)
// ====================================================================
const users = [
  // Teachers
  { id: 'teacher1', name: 'ครูพลอย', role: 'teacher', avatar: '👩🏻‍🏫', class_id: 'c1' },
  { id: 'teacher2', name: 'ครูนนท์', role: 'teacher', avatar: '👨🏻‍🏫', class_id: 'c2' },
  { id: 'teacher3', name: 'ครูเมย์', role: 'teacher', avatar: '👩🏼‍🏫', class_id: 'c3' },
  { id: 'teacher4', name: 'ครูเอก', role: 'teacher', avatar: '👨🏽‍🏫', class_id: 'c4' },
  // Students c1
  { id: 'student1', name: 'มินต์', role: 'student', avatar: '👩🏻', class_id: 'c1' },
  { id: 'student2', name: 'ปัน', role: 'student', avatar: '👦🏻', class_id: 'c1' },
  { id: 'student3', name: 'ฟ้า', role: 'student', avatar: '👩🏽', class_id: 'c1' },
  // Students c2
  { id: 'student4', name: 'ต้น', role: 'student', avatar: '👨🏻', class_id: 'c2' },
  { id: 'student5', name: 'น้ำฝน', role: 'student', avatar: '👧🏻', class_id: 'c2' },
  { id: 'student6', name: 'กานต์', role: 'student', avatar: '👦🏼', class_id: 'c2' },
  // Students c3
  { id: 'student7', name: 'แพรว', role: 'student', avatar: '👩🏼', class_id: 'c3' },
  { id: 'student8', name: 'ภีม', role: 'student', avatar: '🧑🏻', class_id: 'c3' },
  { id: 'student9', name: 'ข้าวหอม', role: 'student', avatar: '👧🏼', class_id: 'c3' },
  // Students c4
  { id: 'student10', name: 'นิว', role: 'student', avatar: '👦🏽', class_id: 'c4' },
  { id: 'student11', name: 'เบลล่า', role: 'student', avatar: '👩🏻', class_id: 'c4' },
  { id: 'student12', name: 'โจ้', role: 'student', avatar: '🧑🏽', class_id: 'c4' },
  // Admin
  { id: 'admin1', name: 'ผู้ดูแลระบบ', role: 'admin', avatar: '🧑🏻‍💻', class_id: null },
];

// ====================================================================
// 3. Shops (8 Diverse Stores)
// ====================================================================
const shops = [
  {
    id: 's1',
    name: 'มินต์กับเพื่อน (Mint & Friends)',
    tagline: 'ของอร่อย ของน่ารัก คัดสรรจากพวกเรา ม.4/1',
    emoji: '🥪',
    color: 'lime',
    class_id: 'c1',
    members: ['student1', 'student2'],
  },
  {
    id: 's2',
    name: 'ฟ้าทำเอง Handmade Studio',
    tagline: 'งานแฮนด์เมดเล็ก ๆ ที่ตั้งใจทำด้วยความประณีต',
    emoji: '🌸',
    color: 'lavender',
    class_id: 'c1',
    members: ['student3'],
  },
  {
    id: 's3',
    name: 'ชมรมวันดีดี Bakery',
    tagline: 'ขนมอบสดใหม่ทุกเช้า เติมพลังใจก่อนเข้าแถว',
    emoji: '🧁',
    color: 'peach',
    class_id: 'c2',
    members: ['student4', 'student5'],
  },
  {
    id: 's4',
    name: 'Craft & Clay โดย กานต์',
    tagline: 'พวงกุญแจและจานรองเรซิ่น ปั้นมือทุกชิ้นไม่มีซ้ำ',
    emoji: '🎨',
    color: 'blue',
    class_id: 'c2',
    members: ['student6'],
  },
  {
    id: 's5',
    name: 'สรุปติดสปีด (Speed Shortnote)',
    tagline: 'ชีทสรุป 4 สี อ่านเข้าใจง่าย ทบทวนก่อนสอบมั่นใจ',
    emoji: '📚',
    color: 'yellow',
    class_id: 'c3',
    members: ['student7', 'student8'],
  },
  {
    id: 's6',
    name: 'ชาแก้วโปรด (Your Cup Café)',
    tagline: 'ชานมไข่มุกและชาผลไม้แท้ ชื่นใจคลายร้อนช่วงบ่าย',
    emoji: '🧋',
    color: 'lime',
    class_id: 'c3',
    members: ['student9'],
  },
  {
    id: 's7',
    name: 'Crochet Club (ถักทอสุข)',
    tagline: 'เคสยาดมและพวงกุญแจไหมพรม นุ่มฟูน่ารักสุด ๆ',
    emoji: '🧶',
    color: 'pink',
    class_id: 'c4',
    members: ['student10', 'student11'],
  },
  {
    id: 's8',
    name: 'Snack Attack วาฟเฟิลร้อน',
    tagline: 'วาฟเฟิลกรอบนอกนุ่มใน คุกกี้ช็อกโกแลตเยิ้ม ๆ',
    emoji: '🧇',
    color: 'orange',
    class_id: 'c4',
    members: ['student12'],
  },
];

// ====================================================================
// 4. Products (26 Items)
// ====================================================================
const products = [
  // s1: มินต์กับเพื่อน
  {
    id: 'p1',
    shop_id: 's1',
    name: 'แซนด์วิชไข่โบราณไส้ทะลัก',
    description: 'ขนมปังฟูนุ่ม ไข่ต้มและน้ำสลัดโบราณสูตรคุณแม่ ทำสดตอนเช้า ไส้แน่นเต็มคำ',
    price: 35,
    cost: 18,
    stock: 18,
    category: 'อาหาร & เบเกอรี่',
    emoji: '🥪',
    color: 'lime',
    views: 245,
    wish_base: 32,
    preorder: false,
    created_at: daysAgo(14),
  },
  {
    id: 'p2',
    shop_id: 's1',
    name: 'มินิบราวนี่หนึบหนับ ดาร์กช็อก 70%',
    description: 'เข้มข้น หวานน้อย หน้าฟิล์มกรอบ เนื้อชุ่มฉ่ำ ทานเย็นยิ่งอร่อย',
    price: 25,
    cost: 12,
    stock: 24,
    category: 'อาหาร & เบเกอรี่',
    emoji: '🍫',
    color: 'lavender',
    views: 310,
    wish_base: 45,
    preorder: false,
    created_at: daysAgo(12),
  },
  {
    id: 'p3',
    shop_id: 's1',
    name: 'สติกเกอร์แมวส้มจอมกวน (A6)',
    description: 'สติกเกอร์เนื้อ PP ด้าน ไดคัทพร้อมลอก กันน้ำ 100% ติดเคสมือถือหรือไอแพดได้ไม่ลอก',
    price: 39,
    cost: 14,
    stock: 35,
    category: 'งานคราฟต์ & DIY',
    emoji: '🐱',
    color: 'peach',
    views: 180,
    wish_base: 28,
    preorder: false,
    created_at: daysAgo(10),
  },

  // s2: ฟ้าทำเอง
  {
    id: 'p4',
    shop_id: 's2',
    name: 'ยางรัดผมผ้าซาติน สีพาสเทล',
    description: 'เย็บมือทุกชิ้น ถนอมเส้นผม ไม่ทำให้ผมหักงอ ลายคลาวด์พาสเทลน่ารัก',
    price: 29,
    cost: 9,
    stock: 20,
    category: 'แฟชั่น & ของสะสม',
    emoji: '🎀',
    color: 'lavender',
    views: 195,
    wish_base: 22,
    preorder: false,
    created_at: daysAgo(15),
  },
  {
    id: 'p5',
    shop_id: 's2',
    name: 'พวงกุญแจลูกปัด สั่งทำชื่อได้',
    description: 'ลูกปัดพาสเทลผสมลูกปัดมุก ร้อยลวดสลิงแข็งแรง สามารถระบุตัวอักษรชื่อได้ (1-6 ตัว)',
    price: 45,
    cost: 15,
    stock: 12,
    category: 'แฟชั่น & ของสะสม',
    emoji: '✨',
    color: 'blue',
    views: 290,
    wish_base: 38,
    preorder: true,
    created_at: daysAgo(11),
  },
  {
    id: 'p6',
    shop_id: 's2',
    name: 'ที่คั่นหนังสือดอกไม้แห้งเรซิ่น',
    description: 'ดอกยิปโซและไฮเดรนเยียแท้เคลือบเรซิ่นใส พร้อมพู่ห้อยสีมินิมอล',
    price: 35,
    cost: 11,
    stock: 15,
    category: 'งานคราฟต์ & DIY',
    emoji: '🌼',
    color: 'peach',
    views: 140,
    wish_base: 19,
    preorder: false,
    created_at: daysAgo(8),
  },

  // s3: ชมรมวันดีดี Bakery
  {
    id: 'p7',
    shop_id: 's3',
    name: 'เค้กกล้วยหอมทองครีมชีส',
    description: 'กล้วยหอมทองแท้เน้น ๆ ท็อปด้วยสเวิร์ลครีมชีสสูตรเข้มข้น หอมละมุนไม่หวานเลี่ยน',
    price: 30,
    cost: 16,
    stock: 22,
    category: 'อาหาร & เบเกอรี่',
    emoji: '🧁',
    color: 'yellow',
    views: 260,
    wish_base: 36,
    preorder: false,
    created_at: daysAgo(16),
  },
  {
    id: 'p8',
    shop_id: 's3',
    name: 'คุกกี้ข้าวโอ๊ตแครนเบอร์รี่',
    description: 'ใช้เนยสดแท้ แครนเบอร์รี่เปรี้ยวหวานลงตัว ผสมข้าวโอ๊ตเต็มเมล็ด ไฟเบอร์สูง',
    price: 25,
    cost: 13,
    stock: 30,
    category: 'อาหาร & เบเกอรี่',
    emoji: '🍪',
    color: 'peach',
    views: 175,
    wish_base: 24,
    preorder: false,
    created_at: daysAgo(13),
  },
  {
    id: 'p9',
    shop_id: 's3',
    name: 'ขนมปังปิ้งสังขยาใบเตยแท้',
    description: 'ใบเตยคั้นสดกลิ่นหอมธรรมชาติ กะทิสดหอมมัน ทานคู่ขนมปังปิ้งกรอบนอกนุ่มใน',
    price: 25,
    cost: 10,
    stock: 20,
    category: 'อาหาร & เบเกอรี่',
    emoji: '🍞',
    color: 'lime',
    views: 210,
    wish_base: 30,
    preorder: false,
    created_at: daysAgo(9),
  },

  // s4: Craft & Clay โดย กานต์
  {
    id: 'p10',
    shop_id: 's4',
    name: 'จานรองแก้วเรซิ่น ลายหินอ่อนทอง',
    description: 'กันน้ำ แข็งแรงทนทาน แต่งลายประกายทองหรูหรา เหมาะสำหรับวางแก้วบนโต๊ะเรียน',
    price: 59,
    cost: 22,
    stock: 8,
    category: 'งานคราฟต์ & DIY',
    emoji: '🎨',
    color: 'blue',
    views: 165,
    wish_base: 25,
    preorder: false,
    created_at: daysAgo(14),
  },
  {
    id: 'p11',
    shop_id: 's4',
    name: 'กริ๊บต๊อก (Griptok) ลายท้องฟ้าคราม',
    description: 'ที่ติดหลังมือถือเรซิ่นเคลือบนูน 3D จับถนัดมือ ยึดติดแน่นด้วยกาว 3M แท้',
    price: 49,
    cost: 18,
    stock: 14,
    category: 'แฟชั่น & ของสะสม',
    emoji: '☁️',
    color: 'lavender',
    views: 230,
    wish_base: 34,
    preorder: false,
    created_at: daysAgo(11),
  },
  {
    id: 'p12',
    shop_id: 's4',
    name: 'พวงกุญแจชิบะดินโพลิเมอร์',
    description: 'ปั้นและอบมือทีละชิ้น เคลือบด้านกันรอยขีดข่วน น้องหมาชิบะแก้มกลมสุดน่ารัก',
    price: 65,
    cost: 20,
    stock: 10,
    category: 'งานคราฟต์ & DIY',
    emoji: '🐶',
    color: 'peach',
    views: 280,
    wish_base: 42,
    preorder: true,
    created_at: daysAgo(7),
  },

  // s5: สรุปติดสปีด (Speed Shortnote)
  {
    id: 'p13',
    shop_id: 's5',
    name: 'ชีทสรุปชีวะ ม.4: เซลล์และพันธุศาสตร์',
    description: 'สรุปพิมพ์สี 12 หน้า ภาพวาดประกอบชัดเจน สรุปจุดที่ชอบออกสอบบ่อย เข้าใจไว',
    price: 49,
    cost: 15,
    stock: 40,
    category: 'เครื่องเขียน & ชีทสรุป',
    emoji: '🧬',
    color: 'lime',
    views: 420,
    wish_base: 65,
    preorder: false,
    created_at: daysAgo(18),
  },
  {
    id: 'p14',
    shop_id: 's5',
    name: 'ชีทสรุปเคมี: ตารางธาตุและพันธะเคมี',
    description: 'เทคนิคการจำเป็นกลอนและภาพผังมโนทัศน์ สรุปเนื้อหาครบคอร์สใน 10 หน้า',
    price: 49,
    cost: 15,
    stock: 35,
    category: 'เครื่องเขียน & ชีทสรุป',
    emoji: '⚗️',
    color: 'blue',
    views: 380,
    wish_base: 58,
    preorder: false,
    created_at: daysAgo(15),
  },
  {
    id: 'p15',
    shop_id: 's5',
    name: 'แพลนเนอร์รายเดือน B5 พิมพ์สี่สี',
    description: 'แพลนเนอร์สำหรับวางแผนการเรียน ตารางสอบ และบันทึกเป้าหมาย 6 เดือนเต็ม',
    price: 59,
    cost: 25,
    stock: 25,
    category: 'เครื่องเขียน & ชีทสรุป',
    emoji: '📅',
    color: 'lavender',
    views: 290,
    wish_base: 39,
    preorder: false,
    created_at: daysAgo(10),
  },
  {
    id: 'p16',
    shop_id: 's5',
    name: 'เซ็ตกระดาษโน้ต Memo Pad ลายเบเกอรี่',
    description: 'กระดาษโน้ตฉีกได้ 50 แผ่น เขียนลื่น ไม่ซึม ลายขนมอบน่ารัก',
    price: 35,
    cost: 12,
    stock: 30,
    category: 'เครื่องเขียน & ชีทสรุป',
    emoji: '📝',
    color: 'yellow',
    views: 190,
    wish_base: 27,
    preorder: false,
    created_at: daysAgo(6),
  },

  // s6: ชาแก้วโปรด (Your Cup Café)
  {
    id: 'p17',
    shop_id: 's6',
    name: 'ชานมไต้หวันบราวน์ชูการ์ไข่มุก',
    description: 'ใบชาอัสสัมต้มสด กลิ่นหอมเป็นเอกลักษณ์ ไข่มุกเคี่ยวเนยและน้ำตาลทรายแดงนุ่มหนึบ',
    price: 40,
    cost: 18,
    stock: 30,
    category: 'เครื่องดื่ม',
    emoji: '🧋',
    color: 'peach',
    views: 450,
    wish_base: 72,
    preorder: false,
    created_at: daysAgo(17),
  },
  {
    id: 'p18',
    shop_id: 's6',
    name: 'ชาเขียวมะลิส้มยูซุสดชื่น',
    description: 'หอมกลิ่นดอกมะลิ ผสมน้ำส้มยูซุเปรี้ยวหวานสดชื่น ดื่มตอนบ่ายตื่นตาใสปิ๊ง',
    price: 35,
    cost: 14,
    stock: 25,
    category: 'เครื่องดื่ม',
    emoji: '🍊',
    color: 'lime',
    views: 320,
    wish_base: 48,
    preorder: false,
    created_at: daysAgo(12),
  },
  {
    id: 'p19',
    shop_id: 's6',
    name: 'นมสดสตอเบอร์รี่เกาหลี',
    description: 'ซอสสตรอว์เบอร์รี่สดเคี่ยวเอง เนื้อผลไม้เน้น ๆ เทผสมนมสดแท้ 100%',
    price: 38,
    cost: 17,
    stock: 20,
    category: 'เครื่องดื่ม',
    emoji: '🍓',
    color: 'pink',
    views: 295,
    wish_base: 41,
    preorder: false,
    created_at: daysAgo(8),
  },

  // s7: Crochet Club (ถักทอสุข)
  {
    id: 'p20',
    shop_id: 's7',
    name: 'เคสใส่ยาดมหงส์ไทย ไหมพรมรูปเป็ด',
    description: 'ถักไหมพรม 4ply นุ่มมือ พอดีขวดสูตร 2 ลายน้องเป็ดเหลืองแก้มชมพู',
    price: 59,
    cost: 18,
    stock: 12,
    category: 'งานคราฟต์ & DIY',
    emoji: '🦆',
    color: 'yellow',
    views: 390,
    wish_base: 62,
    preorder: false,
    created_at: daysAgo(15),
  },
  {
    id: 'p21',
    shop_id: 's7',
    name: 'พวงกุญแจดอกทิวลิปไหมพรม',
    description: 'ดอกทิวลิป 3 ดอกในก้านเดียว สีพาสเทลละมุน แขวนกระเป๋านักเรียนน่ารักมาก',
    price: 49,
    cost: 15,
    stock: 16,
    category: 'แฟชั่น & ของสะสม',
    emoji: '🌷',
    color: 'pink',
    views: 260,
    wish_base: 37,
    preorder: false,
    created_at: daysAgo(11),
  },
  {
    id: 'p22',
    shop_id: 's7',
    name: 'กระเป๋าเหรียญไหมพรมถักมีซับใน',
    description: 'กระเป๋าซิปรูด ปากกว้าง มีซับในผ้าฝ้ายกันของหล่น ใส่เหรียญหรือหูฟังได้',
    price: 69,
    cost: 24,
    stock: 10,
    category: 'แฟชั่น & ของสะสม',
    emoji: '👛',
    color: 'lavender',
    views: 220,
    wish_base: 33,
    preorder: true,
    created_at: daysAgo(7),
  },

  // s8: Snack Attack วาฟเฟิลร้อน
  {
    id: 'p23',
    shop_id: 's8',
    name: 'วาฟเฟิลช็อกโกแลตชิป กรอบนอกนุ่มใน',
    description: 'แป้งสูตรลับกรอบนาน ช็อกโกแลตชิปละลายเยิ้มตอนร้อน ทานคู่กับนมฟินสุด ๆ',
    price: 35,
    cost: 15,
    stock: 25,
    category: 'อาหาร & เบเกอรี่',
    emoji: '🧇',
    color: 'orange',
    views: 340,
    wish_base: 52,
    preorder: false,
    created_at: daysAgo(16),
  },
  {
    id: 'p24',
    shop_id: 's8',
    name: 'ซอฟต์คุกกี้สมอร์ ช็อกมาร์ชแมลโลว์',
    description: 'คุกกี้สไตล์อเมริกัน มาร์ชแมลโลว์ยืด ๆ ช็อกโกแลตเข้มข้น อุ่นไมโครเวฟ 10 วินาทีฟินมาก',
    price: 32,
    cost: 14,
    stock: 20,
    category: 'อาหาร & เบเกอรี่',
    emoji: '🍪',
    color: 'peach',
    views: 280,
    wish_base: 44,
    preorder: false,
    created_at: daysAgo(13),
  },
  {
    id: 'p25',
    shop_id: 's8',
    name: 'ปังกระเทียมครีมชีส เกาหลีโฮมเมด',
    description: 'หอมเนยกระเทียมแท้ ไส้ครีมชีสเปรี้ยวหวานกลมกล่อม อบสดใหม่ทุกเที่ยง',
    price: 40,
    cost: 20,
    stock: 18,
    category: 'อาหาร & เบเกอรี่',
    emoji: '🥖',
    color: 'yellow',
    views: 270,
    wish_base: 39,
    preorder: false,
    created_at: daysAgo(9),
  },
  {
    id: 'p26',
    shop_id: 's7',
    name: 'พวงกุญแจหัวใจไหมพรม มินิมอล',
    description: 'หัวใจฟูนุ่มสีแดงเบอร์กันดีและชมพูนม ห่วงสีทองกันสนิม ของขวัญให้เพื่อน',
    price: 39,
    cost: 12,
    stock: 22,
    category: 'แฟชั่น & ของสะสม',
    emoji: '💖',
    color: 'pink',
    views: 185,
    wish_base: 29,
    preorder: false,
    created_at: daysAgo(5),
  },
];

// ====================================================================
// 5. Orders (50+ Real Orders across past 7 days)
// ====================================================================
const locations = ['โรงอาหารกลาง', 'ศาลาหน้าเสาธง', 'หน้าห้องพักครู', 'ใต้ตึกเรียน 3'];
const times = ['10:30', '12:00', '16:00'];
const buyers = ['student1', 'student2', 'student3', 'student4', 'student5', 'student6', 'student7', 'student8', 'student9', 'student10', 'student11', 'student12'];

const orders = [];
let orderCounter = 1;

// Define specific realistic order events
const orderTemplates = [
  // Shop 1: แซนด์วิช, บราวนี่
  { shop: 's1', items: [{ p: 'p1', qty: 2 }, { p: 'p2', qty: 1 }], buyer: 'student4', day: 6 },
  { shop: 's1', items: [{ p: 'p1', qty: 1 }], buyer: 'student5', day: 6 },
  { shop: 's1', items: [{ p: 'p2', qty: 3 }], buyer: 'student7', day: 5 },
  { shop: 's1', items: [{ p: 'p3', qty: 1 }, { p: 'p1', qty: 1 }], buyer: 'student9', day: 5 },
  { shop: 's1', items: [{ p: 'p1', qty: 2 }], buyer: 'student11', day: 4 },
  { shop: 's1', items: [{ p: 'p2', qty: 2 }], buyer: 'student6', day: 3 },
  { shop: 's1', items: [{ p: 'p1', qty: 1 }, { p: 'p2', qty: 2 }], buyer: 'student8', day: 2 },
  { shop: 's1', items: [{ p: 'p1', qty: 3 }], buyer: 'student12', day: 1 },
  { shop: 's1', items: [{ p: 'p1', qty: 1 }], buyer: 'student3', day: 0, status: 'confirmed' },

  // Shop 2: แฮนด์เมด, ลูกปัด
  { shop: 's2', items: [{ p: 'p4', qty: 1 }, { p: 'p5', qty: 1 }], buyer: 'student1', day: 6 },
  { shop: 's2', items: [{ p: 'p6', qty: 2 }], buyer: 'student8', day: 5 },
  { shop: 's2', items: [{ p: 'p5', qty: 1 }], buyer: 'student7', day: 4 },
  { shop: 's2', items: [{ p: 'p4', qty: 2 }], buyer: 'student11', day: 3 },
  { shop: 's2', items: [{ p: 'p6', qty: 1 }], buyer: 'student2', day: 2 },
  { shop: 's2', items: [{ p: 'p5', qty: 2 }], buyer: 'student9', day: 1 },
  { shop: 's2', items: [{ p: 'p4', qty: 1 }], buyer: 'student5', day: 0, status: 'preparing' },

  // Shop 3: เค้กกล้วยหอม, คุกกี้
  { shop: 's3', items: [{ p: 'p7', qty: 2 }], buyer: 'student1', day: 6 },
  { shop: 's3', items: [{ p: 'p8', qty: 2 }, { p: 'p9', qty: 1 }], buyer: 'student3', day: 5 },
  { shop: 's3', items: [{ p: 'p7', qty: 3 }], buyer: 'student6', day: 4 },
  { shop: 's3', items: [{ p: 'p9', qty: 2 }], buyer: 'student10', day: 3 },
  { shop: 's3', items: [{ p: 'p7', qty: 1 }, { p: 'p8', qty: 1 }], buyer: 'student2', day: 2 },
  { shop: 's3', items: [{ p: 'p7', qty: 2 }], buyer: 'student12', day: 1 },
  { shop: 's3', items: [{ p: 'p8', qty: 3 }], buyer: 'student7', day: 0, status: 'awaiting' },

  // Shop 4: Craft & Clay
  { shop: 's4', items: [{ p: 'p10', qty: 1 }], buyer: 'student2', day: 6 },
  { shop: 's4', items: [{ p: 'p11', qty: 1 }], buyer: 'student5', day: 5 },
  { shop: 's4', items: [{ p: 'p12', qty: 1 }], buyer: 'student1', day: 4 },
  { shop: 's4', items: [{ p: 'p11', qty: 2 }], buyer: 'student8', day: 3 },
  { shop: 's4', items: [{ p: 'p10', qty: 1 }, { p: 'p11', qty: 1 }], buyer: 'student11', day: 2 },
  { shop: 's4', items: [{ p: 'p12', qty: 1 }], buyer: 'student4', day: 1 },

  // Shop 5: สรุปติดสปีด (ชีทสรุป)
  { shop: 's5', items: [{ p: 'p13', qty: 1 }, { p: 'p14', qty: 1 }], buyer: 'student1', day: 6 },
  { shop: 's5', items: [{ p: 'p13', qty: 2 }], buyer: 'student2', day: 6 },
  { shop: 's5', items: [{ p: 'p15', qty: 1 }], buyer: 'student4', day: 5 },
  { shop: 's5', items: [{ p: 'p14', qty: 2 }], buyer: 'student6', day: 4 },
  { shop: 's5', items: [{ p: 'p13', qty: 1 }, { p: 'p16', qty: 1 }], buyer: 'student3', day: 3 },
  { shop: 's5', items: [{ p: 'p15', qty: 2 }], buyer: 'student10', day: 2 },
  { shop: 's5', items: [{ p: 'p13', qty: 3 }], buyer: 'student12', day: 1 },
  { shop: 's5', items: [{ p: 'p14', qty: 1 }], buyer: 'student5', day: 0, status: 'awaiting' },

  // Shop 6: ชานมไข่มุก
  { shop: 's6', items: [{ p: 'p17', qty: 2 }], buyer: 'student1', day: 6 },
  { shop: 's6', items: [{ p: 'p18', qty: 1 }, { p: 'p17', qty: 1 }], buyer: 'student4', day: 5 },
  { shop: 's6', items: [{ p: 'p19', qty: 2 }], buyer: 'student7', day: 4 },
  { shop: 's6', items: [{ p: 'p17', qty: 3 }], buyer: 'student10', day: 3 },
  { shop: 's6', items: [{ p: 'p18', qty: 2 }], buyer: 'student2', day: 2 },
  { shop: 's6', items: [{ p: 'p17', qty: 2 }, { p: 'p19', qty: 1 }], buyer: 'student12', day: 1 },
  { shop: 's6', items: [{ p: 'p17', qty: 1 }], buyer: 'student6', day: 0, status: 'preparing' },

  // Shop 7: Crochet Club
  { shop: 's7', items: [{ p: 'p20', qty: 1 }], buyer: 'student3', day: 6 },
  { shop: 's7', items: [{ p: 'p21', qty: 2 }], buyer: 'student5', day: 5 },
  { shop: 's7', items: [{ p: 'p20', qty: 2 }], buyer: 'student9', day: 4 },
  { shop: 's7', items: [{ p: 'p22', qty: 1 }], buyer: 'student1', day: 3 },
  { shop: 's7', items: [{ p: 'p26', qty: 2 }], buyer: 'student8', day: 2 },
  { shop: 's7', items: [{ p: 'p20', qty: 1 }, { p: 'p21', qty: 1 }], buyer: 'student4', day: 1 },
  { shop: 's7', items: [{ p: 'p20', qty: 1 }], buyer: 'student2', day: 0, status: 'confirmed' },

  // Shop 8: วาฟเฟิลร้อน
  { shop: 's8', items: [{ p: 'p23', qty: 2 }], buyer: 'student2', day: 6 },
  { shop: 's8', items: [{ p: 'p24', qty: 2 }, { p: 'p25', qty: 1 }], buyer: 'student6', day: 5 },
  { shop: 's8', items: [{ p: 'p23', qty: 3 }], buyer: 'student9', day: 4 },
  { shop: 's8', items: [{ p: 'p25', qty: 2 }], buyer: 'student11', day: 3 },
  { shop: 's8', items: [{ p: 'p23', qty: 1 }, { p: 'p24', qty: 1 }], buyer: 'student1', day: 2 },
  { shop: 's8', items: [{ p: 'p24', qty: 3 }], buyer: 'student4', day: 1 },
  { shop: 's8', items: [{ p: 'p23', qty: 2 }], buyer: 'student7', day: 0, status: 'awaiting' },
];

orderTemplates.forEach((tpl, idx) => {
  const mappedItems = tpl.items.map(it => {
    const prod = products.find(p => p.id === it.p);
    return {
      productId: prod.id,
      name: prod.name,
      price: prod.price,
      cost: prod.cost,
      qty: it.qty,
    };
  });

  orders.push({
    id: `ord_${idx + 1}_${Date.now().toString(36)}`,
    buyer_id: tpl.buyer,
    shop_id: tpl.shop,
    items: mappedItems,
    status: tpl.status || 'delivered',
    pickup: locations[idx % locations.length],
    time: times[idx % times.length],
    is_demo: false,
    created_at: daysAgo(tpl.day, (idx * 3) % 10),
  });
});

// ====================================================================
// 6. Reviews (32 Real Feedback Entries)
// ====================================================================
const reviews = [
  { id: 'rev_1', product_id: 'p1', user_id: 'student4', rating: 5, text: 'ขนมปังนุ่มมาก ไส้ไข่แน่นจุก ๆ กินอันเดียวอิ่มถึงคาบบ่ายเลยครับ!', created_at: daysAgo(5) },
  { id: 'rev_2', product_id: 'p1', user_id: 'student5', rating: 5, text: 'น้ำสลัดโบราณอร่อยมาก หวานอมเปรี้ยวกำลังดี ไม่เลี่ยนเลย ชอบมาก', created_at: daysAgo(4) },
  { id: 'rev_3', product_id: 'p2', user_id: 'student7', rating: 5, text: 'ช็อกโกแลตเข้มข้นถึงใจมาก หน้าฟิล์มกรอบ เนื้อข้างในหนึบจริงสมชื่อ', created_at: daysAgo(3) },
  { id: 'rev_4', product_id: 'p3', user_id: 'student9', rating: 5, text: 'สติกเกอร์น่ารักมาก ลายเส้นกวนดี กันน้ำได้จริง แปะกระติกน้ำไม่หลุดเลย', created_at: daysAgo(2) },
  { id: 'rev_5', product_id: 'p4', user_id: 'student1', rating: 5, text: 'ผ้าซาตินลื่นนุ่มมาก รัดผมแล้วไม่เจ็บหัว สีพาสเทลตรงปกสุด ๆ', created_at: daysAgo(4) },
  { id: 'rev_6', product_id: 'p5', user_id: 'student8', rating: 5, text: 'พวงกุญแจสั่งชื่อตัวเองได้ รอของไม่นาน งานละเอียดมาก สวยคุ้มราคา', created_at: daysAgo(3) },
  { id: 'rev_7', product_id: 'p6', user_id: 'student2', rating: 4, text: 'ดอกไม้แห้งข้างในสวยมาก พู่ห้อยดูมินิมอล ใช้คั่นหนังสือเรียนเพลินตาดี', created_at: daysAgo(2) },
  { id: 'rev_8', product_id: 'p7', user_id: 'student1', rating: 5, text: 'เค้กกล้วยหอมกลิ่นหอมฟุ้ง ครีมชีสเปรี้ยวนิด ๆ เข้ากันดีมาก สั่งซ้ำแน่นอน', created_at: daysAgo(5) },
  { id: 'rev_9', product_id: 'p8', user_id: 'student3', rating: 5, text: 'คุกกี้ข้าวโอ๊ตกรอบกำลังดี ไม่หวานเกิน แครนเบอร์รี่ให้เยอะ เคี้ยวเพลิน', created_at: daysAgo(4) },
  { id: 'rev_10', product_id: 'p9', user_id: 'student6', rating: 5, text: 'สังขยาใบเตยแท้จริง ๆ กลิ่นหอมธรรมชาติมาก ขนมปังปิ้งกรอบนอกนุ่มใน', created_at: daysAgo(3) },
  { id: 'rev_11', product_id: 'p10', user_id: 'student2', rating: 5, text: 'จานรองแก้วเรซิ่นสวยหรูมาก วางบนโต๊ะแล้วดูมีสไตล์ เพื่อนทักกันใหญ่', created_at: daysAgo(4) },
  { id: 'rev_12', product_id: 'p11', user_id: 'student5', rating: 4, text: 'Griptok กาวเหนียวแน่นดี ลายท้องฟ้าสีสวย จับถนัดมือขึ้นเยอะ', created_at: daysAgo(3) },
  { id: 'rev_13', product_id: 'p12', user_id: 'student1', rating: 5, text: 'น้องชิบะน่ารักใจละลาย ปั้นได้เนียนมาก งานแฮนด์เมดคุณภาพเกินราคา', created_at: daysAgo(2) },
  { id: 'rev_14', product_id: 'p13', user_id: 'student1', rating: 5, text: 'ชีทสรุปดีมาก! สรุปสั้นกระชับเข้าใจง่าย มีภาพประกอบช่วยจำ สอบย่อยได้ท็อปห้องเลย', created_at: daysAgo(5) },
  { id: 'rev_15', product_id: 'p14', user_id: 'student6', rating: 5, text: 'กลอนจำตารางธาตุช่วยได้เยอะมาก จากที่ไม่ชอบเคมีตอนนี้เข้าใจขึ้นเยอะเลย', created_at: daysAgo(4) },
  { id: 'rev_16', product_id: 'p15', user_id: 'student4', rating: 5, text: 'แพลนเนอร์กระดาษหนา ไม่ซึม ลายน่ารักช่วยให้อยากจดการบ้านทุกวัน', created_at: daysAgo(3) },
  { id: 'rev_17', product_id: 'p17', user_id: 'student1', rating: 5, text: 'ชานมแก้วโปรดจริง ๆ หอมกลิ่นชา ไข่มุกอุ่น ๆ หนึบหนับ หวานกำลังดี ฟินมาก', created_at: daysAgo(5) },
  { id: 'rev_18', product_id: 'p18', user_id: 'student4', rating: 5, text: 'ชาเขียวมะลิยูซุคือที่สุดของความสดชื่น ดื่มตอนบ่ายหลังเรียนพละคือดีมากกก', created_at: daysAgo(4) },
  { id: 'rev_19', product_id: 'p19', user_id: 'student7', rating: 5, text: 'นมสดสตอเบอร์รี่เกาหลี ซอสเนื้อผลไม้เยอะมาก อร่อยไม่แพ้ร้านดัง', created_at: daysAgo(3) },
  { id: 'rev_20', product_id: 'p20', user_id: 'student3', rating: 5, text: 'เคสยาดมน้องเป็ดน่ารักสุดในโลก! ถือไปไหนใครก็ขอดู ใส่ขวดหงส์ไทยพอดีเป๊ะ', created_at: daysAgo(5) },
  { id: 'rev_21', product_id: 'p21', user_id: 'student5', rating: 5, text: 'ดอกทิวลิปไหมพรมสีหวานมาก แขวนกระเป๋านักเรียนแล้วมุ้งมิ้งสุด ๆ', created_at: daysAgo(4) },
  { id: 'rev_22', product_id: 'p23', user_id: 'student2', rating: 5, text: 'วาฟเฟิลกรอบนอกนุ่มใน ช็อกชิปเยิ้ม ๆ กลิ่นหอมฟุ้งตั้งแต่เดินเข้าร้าน', created_at: daysAgo(5) },
  { id: 'rev_23', product_id: 'p24', user_id: 'student6', rating: 5, text: 'ซอฟต์คุกกี้มาร์ชแมลโลว์ยืดได้ใจ ช็อกโกแลตเข้มข้น ไม่หวานแสบคอ อร่อยมาก', created_at: daysAgo(4) },
  { id: 'rev_24', product_id: 'p25', user_id: 'student11', rating: 5, text: 'ปังกระเทียมครีมชีสอร่อยลืม! ไส้แน่นเนยฉ่ำ กัดคำแรกฟินเลย', created_at: daysAgo(3) },
];

// ====================================================================
// 7. Student Progress
// ====================================================================
const progress = {
  student1: ['cost', 'demand', 'stock'],
  student2: ['cost', 'demand'],
  student3: ['cost', 'demand', 'stock'],
  student4: ['cost', 'demand'],
  student5: ['cost'],
  student6: ['cost', 'demand'],
  student7: ['cost', 'demand', 'stock'],
  student8: ['cost', 'demand'],
  student9: ['cost', 'demand', 'stock'],
  student10: ['cost'],
  student11: ['cost', 'demand'],
  student12: ['cost', 'demand', 'stock'],
};

// ====================================================================
// 8. Assignments & Contents
// ====================================================================
const assignments = [
  {
    id: 'a1',
    class_id: 'c1',
    teacher_id: 'teacher1',
    title: 'ภารกิจที่ 1: วิเคราะห์ต้นทุนและจุดคุ้มทุนของสินค้า',
    body: 'เลือกสินค้าของร้าน 1 ชิ้น แยกต้นทุนคงที่และต้นทุนผันแปร พร้อมระบุจำนวนชิ้นที่ต้องขายให้ถึงจุดคุ้มทุน (Break-even Point)',
    due: '2026-11-20',
  },
  {
    id: 'a2',
    class_id: 'c2',
    teacher_id: 'teacher2',
    title: 'ภารกิจที่ 2: ออกแบบโปรโมชั่นช่วงพักกลางวัน',
    body: 'วางแผนโปรโมชั่นดึงดูดใจเพื่อนนักเรียน เช่น ซื้อคู่ลดราคา หรือสะสมแต้ม พร้อมคำนวณกำไรสุทธิหลังหักส่วนลด',
    due: '2026-11-25',
  },
  {
    id: 'a3',
    class_id: 'c3',
    teacher_id: 'teacher3',
    title: 'ภารกิจที่ 3: สรุปรายงานการเงินและยอดขายประจำสัปดาห์',
    body: 'จัดทำงบกำไรขาดทุน (P&L) รายงานยอดขาย ต้นทุน และกำไรสุทธิที่ได้จากตลาดนัดในโรงเรียน',
    due: '2026-11-28',
  },
];

const contents = [
  {
    id: 'ct1',
    class_id: 'c1',
    title: 'คิดแบบผู้ประกอบการรุ่นใหม่ (Entrepreneur Mindset)',
    category: 'แนวคิดธุรกิจ',
    body: 'เริ่มจากปัญหาเล็ก ๆ รอบตัว สังเกตว่าเพื่อนต้องการอะไรในโรงเรียน แล้วทดลองทำในจำนวนน้อยก่อน (MVP) การทดลองแต่ละครั้งจะทำให้เราได้เรียนรู้ความต้องการจริงของลูกค้า',
  },
  {
    id: 'ct2',
    class_id: 'c1',
    title: 'สูตรลับการตั้งราคา: ไม่ใช่แค่บวกกำไร แต่ต้องเข้าใจคุณค่า',
    category: 'การเงิน & การตั้งราคา',
    body: 'สูตรราคาขาย = ต้นทุนผันแปร + (ต้นทุนคงที่เฉลี่ย) + กำไรที่ต้องการ อย่าลืมคิดค่าแรงของตัวเราเองเข้าไปในต้นทุนด้วยเสมอ!',
  },
  {
    id: 'ct3',
    class_id: 'c2',
    title: 'เทคนิคการบริการและนัดรับสินค้าที่ประทับใจ',
    category: 'การบริการลูกค้า',
    body: 'การนัดรับของตรงเวลา ยิ้มแย้ม และแพ็กเกจจิ้งที่สะอาดเรียบร้อย จะเปลี่ยนลูกค้าขาจรให้กลายเป็นลูกค้าประจำที่กลับมาซื้อซ้ำ',
  },
  {
    id: 'ct4',
    class_id: 'c3',
    title: 'พลังของการตลาดปากต่อปาก (Word of Mouth)',
    category: 'การตลาด',
    body: 'ในสังคมโรงเรียน เสียงบอกต่อจากเพื่อนมีพลังมากกว่าป้ายโฆษณา ให้ความสำคัญกับคุณภาพสินค้าชิ้นแรกที่ส่งมอบให้เพื่อน ๆ เสมอ',
  },
];

// ====================================================================
// Execute Seeding into Supabase
// ====================================================================
async function runSeed() {
  console.log('🚀 Starting Rich Dataset Seeding to Supabase...');
  console.log('Target Project:', SUPABASE_URL);

  try {
    // 1. Classes
    console.log('Seeding classes...');
    for (const c of classes) {
      await supabase.from('classes').upsert(c, { onConflict: 'id' });
    }

    // 2. Users
    console.log('Seeding users...');
    for (const u of users) {
      await supabase.from('users').upsert(u, { onConflict: 'id' });
    }

    // 3. Shops
    console.log('Seeding shops...');
    for (const s of shops) {
      await supabase.from('shops').upsert(s, { onConflict: 'id' });
    }

    // 4. Products
    console.log('Seeding products...');
    for (const p of products) {
      await supabase.from('products').upsert(p, { onConflict: 'id' });
    }

    // 5. Orders
    console.log('Seeding orders...');
    for (const o of orders) {
      await supabase.from('orders').upsert(o, { onConflict: 'id' });
    }

    // 6. Reviews
    console.log('Seeding reviews...');
    for (const r of reviews) {
      await supabase.from('reviews').upsert(r, { onConflict: 'id' });
    }

    // 7. Assignments & Contents
    console.log('Seeding assignments & contents...');
    for (const a of assignments) {
      await supabase.from('assignments').upsert(a, { onConflict: 'id' });
    }
    for (const ct of contents) {
      await supabase.from('contents').upsert(ct, { onConflict: 'id' });
    }

    // 8. Student Progress
    console.log('Seeding student progress...');
    for (const [student_id, modules] of Object.entries(progress)) {
      await supabase.from('student_progress').upsert({ student_id, modules }, { onConflict: 'student_id' });
    }

    console.log('====================================================');
    console.log('✅ ALL RICH DATA SEEDED SUCCESSFULLY TO SUPABASE!');
    console.log(`- Classes: ${classes.length}`);
    console.log(`- Users: ${users.length} (Teachers & Students)`);
    console.log(`- Shops: ${shops.length}`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Orders: ${orders.length}`);
    console.log(`- Reviews: ${reviews.length}`);
    console.log(`- Assignments: ${assignments.length}`);
    console.log('====================================================');

    // Also update local fallback cache so everything stays 100% in sync
    const db = require('../db/supabase');
    const fullState = await db.getState();
    db.saveLocalState(fullState);
    console.log('✅ Updated data/local-db.json fallback cache as well!');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  }
}

runSeed();

