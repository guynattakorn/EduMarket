const fs = require('fs');
const path = require('path');
const { sb, getState } = require('./supabase');

const DATA_DIR = path.join(__dirname, '..', 'data');
const AUTH_FILE = path.join(DATA_DIR, 'auth-credentials.json');

// Default credentials for existing users
const DEFAULT_ACCOUNTS = [
  // Students
  { id: 'student1', username: 'mint', password: 'password123', name: 'มินต์', role: 'student', avatar: '👩🏻', classId: 'c1' },
  { id: 'student2', username: 'pun', password: 'password123', name: 'ปัน', role: 'student', avatar: '👦🏻', classId: 'c1' },
  { id: 'student3', username: 'fah', password: 'password123', name: 'ฟ้า', role: 'student', avatar: '👩🏽', classId: 'c1' },
  { id: 'student4', username: 'ton', password: 'password123', name: 'ต้น', role: 'student', avatar: '👨🏻', classId: 'c2' },
  { id: 'student5', username: 'namfon', password: 'password123', name: 'น้ำฝน', role: 'student', avatar: '👧🏻', classId: 'c2' },
  { id: 'student6', username: 'karn', password: 'password123', name: 'กานต์', role: 'student', avatar: '👦🏼', classId: 'c2' },
  { id: 'student7', username: 'praew', password: 'password123', name: 'แพรว', role: 'student', avatar: '👩🏼', classId: 'c3' },
  { id: 'student8', username: 'peem', password: 'password123', name: 'ภีม', role: 'student', avatar: '🧑🏻', classId: 'c3' },
  { id: 'student9', username: 'khaohom', password: 'password123', name: 'ข้าวหอม', role: 'student', avatar: '👧🏼', classId: 'c3' },
  { id: 'student10', username: 'new', password: 'password123', name: 'นิว', role: 'student', avatar: '👦🏽', classId: 'c4' },
  { id: 'student11', username: 'bella', password: 'password123', name: 'เบลล่า', role: 'student', avatar: '👩🏻', classId: 'c4' },
  { id: 'student12', username: 'joe', password: 'password123', name: 'โจ้', role: 'student', avatar: '🧑🏽', classId: 'c4' },
  // Teachers
  { id: 'teacher1', username: 'ploy', password: 'password123', name: 'ครูพลอย', role: 'teacher', avatar: '👩🏻‍🏫', classId: 'c1' },
  { id: 'teacher2', username: 'nont', password: 'password123', name: 'ครูนนท์', role: 'teacher', avatar: '👨🏻‍🏫', classId: 'c2' },
  { id: 'teacher3', username: 'may', password: 'password123', name: 'ครูเมย์', role: 'teacher', avatar: '👩🏼‍🏫', classId: 'c3' },
  { id: 'teacher4', username: 'ek', password: 'password123', name: 'ครูเอก', role: 'teacher', avatar: '👨🏽‍🏫', classId: 'c4' },
  // Admin
  { id: 'admin1', username: 'admin', password: 'admin123', name: 'ผู้ดูแลระบบ', role: 'admin', avatar: '🧑🏻‍💻', classId: null },
];

function loadCredentials() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(AUTH_FILE)) {
    fs.writeFileSync(AUTH_FILE, JSON.stringify(DEFAULT_ACCOUNTS, null, 2), 'utf8');
    return DEFAULT_ACCOUNTS;
  }
  try {
    return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
  } catch (e) {
    return DEFAULT_ACCOUNTS;
  }
}

function saveCredentials(creds) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(AUTH_FILE, JSON.stringify(creds, null, 2), 'utf8');
}

/**
 * Perform login check
 */
async function login(username, password) {
  if (!username || !password) {
    return { success: false, error: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' };
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  // 1. Check local credential registry
  const creds = loadCredentials();
  const matched = creds.find(
    c => (c.username.toLowerCase() === cleanUser || c.id.toLowerCase() === cleanUser) && c.password === cleanPass
  );

  if (!matched) {
    // Also check Supabase users table if columns exist
    if (sb) {
      try {
        const { data: su } = await sb.from('users').select('*').or(`username.eq.${cleanUser},id.eq.${cleanUser}`).single();
        if (su && su.password && su.password === cleanPass) {
          return {
            success: true,
            user: {
              id: su.id,
              name: su.name,
              role: su.role,
              avatar: su.avatar,
              classId: su.class_id,
            },
            token: `token_${su.id}_${Date.now()}`
          };
        }
      } catch (e) {}
    }
    return { success: false, error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
  }

  // Fetch full user record from database to get latest classId / avatar
  let userRecord = {
    id: matched.id,
    name: matched.name,
    role: matched.role,
    avatar: matched.avatar,
    classId: matched.classId,
  };

  if (sb) {
    try {
      const { data: dbUser } = await sb.from('users').select('*').eq('id', matched.id).single();
      if (dbUser) {
        userRecord = {
          id: dbUser.id,
          name: dbUser.name,
          role: dbUser.role,
          avatar: dbUser.avatar,
          classId: dbUser.class_id,
        };
      }
    } catch (e) {}
  }

  return {
    success: true,
    user: userRecord,
    token: `token_${userRecord.id}_${Date.now()}`
  };
}

/**
 * Register a new user
 */
async function register({ name, username, password, role = 'student', classId = 'c1', avatar = '🧑🏻' }) {
  if (!name || !username || !password) {
    return { success: false, error: 'กรุณากรอกข้อมูลให้ครบถ้วน' };
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  const creds = loadCredentials();
  if (creds.some(c => c.username.toLowerCase() === cleanUser || c.id.toLowerCase() === cleanUser)) {
    return { success: false, error: 'ชื่อผู้ใช้นี้มีคนใช้แล้ว กรุณาเลือกชื่ออื่น' };
  }

  const newId = `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  const newUser = {
    id: newId,
    name: name.trim(),
    role: role === 'teacher' ? 'teacher' : 'student',
    avatar: avatar || (role === 'teacher' ? '👩🏻‍🏫' : '🧑🏻'),
    classId: classId || 'c1',
  };

  // 1. Save credentials
  creds.push({
    ...newUser,
    username: cleanUser,
    password: cleanPass,
  });
  saveCredentials(creds);

  // 2. Insert into Supabase users table
  if (sb) {
    try {
      await sb.from('users').insert({
        id: newUser.id,
        name: newUser.name,
        role: newUser.role,
        avatar: newUser.avatar,
        class_id: newUser.classId,
      });
      console.log('✅ Registered new user in Supabase:', newUser.name, `(${cleanUser})`);
    } catch (err) {
      console.error('Error inserting user into Supabase:', err.message);
    }
  }

  return {
    success: true,
    user: newUser,
    token: `token_${newUser.id}_${Date.now()}`
  };
}

/**
 * List sample quick login accounts
 */
function getQuickAccounts() {
  return [
    { username: 'mint', password: 'password123', name: 'มินต์', role: 'student', label: 'นักเรียน ม.4/1 (ร้านมินต์กับเพื่อน)', avatar: '👩🏻' },
    { username: 'fah', password: 'password123', name: 'ฟ้า', role: 'student', label: 'นักเรียน ม.4/1 (ร้านฟ้าทำเอง)', avatar: '👩🏽' },
    { username: 'ton', password: 'password123', name: 'ต้น', role: 'student', label: 'นักเรียน ม.4/2 (ชมรมวันดีดี Bakery)', avatar: '👨🏻' },
    { username: 'karn', password: 'password123', name: 'กานต์', role: 'student', label: 'นักเรียน ม.4/2 (Craft & Clay)', avatar: '👦🏼' },
    { username: 'ploy', password: 'password123', name: 'ครูพลอย', role: 'teacher', label: 'คุณครูประจำชั้น ม.4/1', avatar: '👩🏻‍🏫' },
    { username: 'admin', password: 'admin123', name: 'ผู้ดูแลระบบ', role: 'admin', label: 'ผู้ดูแลระบบ (Admin)', avatar: '🧑🏻‍💻' },
  ];
}

module.exports = {
  login,
  register,
  getQuickAccounts,
  loadCredentials,
};

