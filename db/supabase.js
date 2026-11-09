require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const rawUrl = (process.env.SUPABASE_URL || '').trim();
// Strip trailing /rest/v1/ or / if accidentally included
const SUPABASE_URL = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '').trim();

const isCloudConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY && SUPABASE_URL.startsWith('https://'));

let supabase = null;
if (isCloudConfigured) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('[Database] Connecting to Supabase Cloud at:', SUPABASE_URL);
  } catch (err) {
    console.error('[Database] Supabase initialization failed, falling back to local:', err.message);
  }
} else {
  console.log('[Database] No Supabase credentials detected. Running in Local Storage Mode (data/local-db.json).');
  console.log('[Database] -> Set SUPABASE_URL and SUPABASE_ANON_KEY in .env to connect to Cloud Database.');
}

// Local Fallback Storage
const DATA_DIR = path.join(__dirname, '..', 'data');
const LOCAL_DB_PATH = path.join(DATA_DIR, 'local-db.json');

function getSeedData() {
  const js = fs.readFileSync(path.join(__dirname, '..', 'app-decoded.js'), 'utf8');
  const end = js.indexOf('function Xu(');
  const code = js.substring(0, end);
  const fn = new Function(code + '; return Mn();');
  return fn();
}

function getLocalState() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    const seed = getSeedData();
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(seed, null, 2), 'utf8');
    return seed;
  }
  try {
    const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    const seed = getSeedData();
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(seed, null, 2), 'utf8');
    return seed;
  }
}

function saveLocalState(state) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(state, null, 2), 'utf8');
}

/**
 * Fetch full state from Supabase or Local Storage
 */
async function getState() {
  if (!supabase) {
    return getLocalState();
  }

  try {
    const [
      { data: users, error: errUsers },
      { data: classes, error: errClasses },
      { data: shops, error: errShops },
      { data: products, error: errProducts },
      { data: orders, error: errOrders },
      { data: reviews, error: errReviews },
      { data: progressRows, error: errProgress },
      { data: assignments, error: errAssignments },
      { data: contents, error: errContents },
      { data: logs, error: errLogs },
      { data: notifications, error: errNotifs },
      { data: messages, error: errMessages },
    ] = await Promise.all([
      supabase.from('users').select('*'),
      supabase.from('classes').select('*'),
      supabase.from('shops').select('*'),
      supabase.from('products').select('*'),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').order('created_at', { ascending: false }),
      supabase.from('student_progress').select('*'),
      supabase.from('assignments').select('*'),
      supabase.from('contents').select('*'),
      supabase.from('logs').select('*'),
      supabase.from('notifications').select('*').order('created_at', { ascending: false }),
      supabase.from('messages').select('*').order('created_at', { ascending: true }),
    ]);

    if (errUsers || errProducts || errOrders) {
      console.warn('[Supabase] Warning fetching tables, falling back to local:', errUsers || errProducts || errOrders);
      return getLocalState();
    }

    // Convert progress table to dictionary { studentId: [modules] }
    const progressDict = {};
    if (progressRows) {
      progressRows.forEach(row => {
        progressDict[row.student_id] = row.modules || [];
      });
    }

    // Map database snake_case back to camelCase frontend schema
    const mappedUsers = (users || []).map(u => ({
      id: u.id,
      name: u.name,
      role: u.role,
      avatar: u.avatar,
      classId: u.class_id,
    }));

    const mappedClasses = (classes || []).map(c => ({
      id: c.id,
      name: c.name,
      code: c.code,
      teacherId: c.teacher_id,
    }));

    const mappedShops = (shops || []).map(s => ({
      id: s.id,
      name: s.name,
      tagline: s.tagline,
      emoji: s.emoji,
      color: s.color,
      classId: s.class_id,
      members: s.members || [],
    }));

    const shopMap = {};
    (shops || []).forEach(s => {
      shopMap[s.id] = s.name;
    });

    const mappedProducts = (products || []).map(p => ({
      id: p.id,
      shopId: p.shop_id,
      storeId: p.shop_id,
      storeName: shopMap[p.shop_id] || 'มินต์กับเพื่อน',
      name: p.name,
      title: p.name,
      description: p.description || '',
      price: Number(p.price) || 0,
      cost: Number(p.cost) || 0,
      stock: Number(p.stock) || 0,
      category: p.category || 'อาหาร & เบเกอรี่',
      emoji: p.emoji || '🥪',
      color: p.color || 'emerald',
      image: p.image,
      views: Number(p.views) || 0,
      wishBase: Number(p.wish_base) || 0,
      wishedBy: p.wished_by || [],
      preorder: Boolean(p.preorder),
      isPreorder: Boolean(p.preorder),
      isVerified: true,
      pickupWindow: 'พักกลางวัน 12:15 - 12:45',
      createdAt: p.created_at,
    }));

    const statusMapFromSupabase = {
      awaiting: 'pending',
      preparing: 'preparing',
      confirmed: 'ready',
      delivered: 'completed'
    };

    const mappedOrders = (orders || []).map(o => {
      const itemsList = Array.isArray(o.items) ? o.items : [];
      const meta = itemsList.find(i => i && i._meta) || {};
      const cleanItems = itemsList.filter(i => i && !i._meta).map(it => ({
        id: it.productId || it.id || 'p1',
        title: it.name || it.title || 'สินค้า',
        name: it.name || it.title || 'สินค้า',
        price: Number(it.price) || 0,
        cost: Number(it.cost) || 0,
        qty: Number(it.qty) || 1
      }));

      const total = Number(meta.total) || cleanItems.reduce((sum, it) => sum + it.price * it.qty, 0);

      return {
        id: o.id,
        code: meta.code || (o.id.replace(/\D/g, '').slice(-4) || '1234'),
        buyerId: o.buyer_id || 'student2',
        buyerName: meta.buyerName || 'ปัน (ม.4/1)',
        buyer: o.buyer_id,
        storeId: o.shop_id,
        shopId: o.shop_id,
        storeName: meta.storeName || shopMap[o.shop_id] || 'มินต์กับเพื่อน',
        items: cleanItems,
        total: total,
        status: statusMapFromSupabase[o.status] || o.status || 'pending',
        isPreorder: Boolean(meta.isPreorder),
        pickupLocation: o.pickup || 'โรงอาหารกลาง (เสาต้นที่ 4)',
        pickup: o.pickup,
        pickupWindow: o.time || 'พักกลางวัน 12:15 - 12:45',
        time: o.time,
        date: o.created_at,
        demo: Boolean(o.is_demo),
      };
    });

    const mappedReviews = (reviews || []).map(r => ({
      id: r.id,
      productId: r.product_id,
      userId: r.user_id,
      rating: r.rating,
      text: r.text,
      date: r.created_at,
    }));

    const mappedNotifications = (notifications || []).map(n => ({
      id: n.id,
      to: n.user_id,
      title: n.title,
      text: n.text,
      type: n.type,
      read: Boolean(n.is_read),
      date: n.created_at,
    }));

    const mappedMessages = (messages || []).map(m => ({
      id: m.id,
      from: m.from_user_id,
      to: m.to_user_id,
      text: m.text,
      date: m.created_at,
    }));

    const mappedAssignments = (assignments || []).map(a => ({
      id: a.id,
      classId: a.class_id || 'c1',
      teacherId: a.teacher_id,
      title: a.title,
      description: a.body || '',
      body: a.body || '',
      due: a.due || '2026-11-30',
      submissionsCount: 4,
      totalStudents: 12
    }));

    const mappedStores = (shops || []).map(s => ({
      id: s.id,
      name: s.name,
      ownerId: s.members?.[0] || 'student1',
      ownerName: s.name.split(' ')[0] || 'มินต์',
      ownerAvatar: '👩🏻',
      classId: s.class_id || 'c1',
      category: 'อาหาร & เบเกอรี่',
      tagline: s.tagline || '',
      emoji: s.emoji || '🥪',
      color: s.color || 'emerald',
      isVerified: true,
      rating: 4.8,
      reviewCount: 20
    }));

    const mappedContents = (contents || []).map(c => ({
      id: c.id,
      classId: c.class_id,
      title: c.title,
      category: c.category,
      body: c.body,
    }));

    const mappedLogs = (logs || []).map(l => ({
      id: l.id,
      shopId: l.shop_id,
      productId: l.product_id,
      type: l.type,
      before: l.before_val,
      after: l.after_val,
      reason: l.reason,
      actor: l.actor,
      date: l.created_at,
    }));

    const student1Modules = progressDict['student1'] || [];
    const mappedLessons = {
      costLesson: {
        completed: student1Modules.includes('costLesson'),
        batchCost: 350,
        producedUnits: 20,
        wastedUnits: 2,
        unitCost: 19.44
      },
      pricingLesson: {
        completed: student1Modules.includes('pricingLesson'),
        fixedCost: 120,
        unitCost: 19.44,
        sellingPrice: 35,
        breakEvenUnits: 8
      }
    };

    return {
      schema: 2,
      users: mappedUsers,
      classes: mappedClasses,
      shops: mappedShops,
      stores: mappedStores,
      products: mappedProducts,
      orders: mappedOrders,
      reviews: mappedReviews,
      progress: progressDict,
      lessons: mappedLessons,
      assignments: mappedAssignments,
      submissions: [],
      contents: mappedContents,
      logs: mappedLogs,
      notifications: mappedNotifications,
      messages: mappedMessages,
      feedback: [],
    };
  } catch (err) {
    console.error('[Supabase] Error loading from cloud:', err.message);
    return getLocalState();
  }
}

/**
 * Handle state sync or action dispatch
 */
async function syncAction(action, currentState) {
  // Always update local cache for instant resilience
  saveLocalState(currentState);

  if (!supabase) {
    return { success: true, mode: 'local' };
  }

  try {
    switch (action.type) {
      case 'ORDER': {
        const o = action.order;
        await supabase.from('orders').insert({
          id: o.id,
          buyer_id: o.buyer,
          shop_id: o.shopId,
          items: o.items,
          status: o.status || 'awaiting',
          pickup: o.pickup,
          time: o.time,
          is_demo: Boolean(o.demo),
          created_at: o.date || new Date().toISOString(),
        });
        // Decrement stock for ordered items
        for (const it of o.items) {
          const { data: p } = await supabase.from('products').select('stock').eq('id', it.productId).single();
          if (p && p.stock !== undefined) {
            await supabase.from('products').update({ stock: Math.max(0, p.stock - it.qty) }).eq('id', it.productId);
          }
        }
        break;
      }
      case 'DELIVER': {
        await supabase.from('orders').update({ status: action.status }).eq('id', action.id);
        break;
      }
      case 'PRODUCT': {
        const p = action.item;
        await supabase.from('products').upsert({
          id: p.id,
          shop_id: p.shopId,
          name: p.name,
          description: p.description,
          price: p.price,
          cost: p.cost,
          stock: p.stock,
          category: p.category,
          emoji: p.emoji,
          color: p.color,
          image: p.image,
          preorder: p.preorder,
        });
        break;
      }
      case 'SHOP': {
        const s = action.item;
        await supabase.from('shops').upsert({
          id: s.id,
          name: s.name,
          tagline: s.tagline,
          emoji: s.emoji,
          color: s.color,
          class_id: s.classId,
          members: s.members,
        });
        break;
      }
      case 'REVIEW': {
        const r = action.item;
        await supabase.from('reviews').insert({
          id: r.id,
          product_id: r.productId,
          user_id: r.userId,
          rating: r.rating,
          text: r.text,
          created_at: r.date || new Date().toISOString(),
        });
        break;
      }
      case 'MESSAGE': {
        const m = action.item;
        await supabase.from('messages').insert({
          id: m.id,
          from_user_id: m.from,
          to_user_id: m.to,
          text: m.text,
          created_at: m.date || new Date().toISOString(),
        });
        break;
      }
      case 'READ': {
        await supabase.from('notifications').update({ is_read: true }).eq('user_id', action.user);
        break;
      }
      case 'COMPLETE': {
        const { user, moduleId } = action;
        const { data } = await supabase.from('student_progress').select('modules').eq('student_id', user).single();
        const current = data?.modules || [];
        if (!current.includes(moduleId)) {
          await supabase.from('student_progress').upsert({
            student_id: user,
            modules: [...current, moduleId],
            updated_at: new Date().toISOString(),
          });
        }
        break;
      }
      case 'VIEW': {
        // Increment view count
        const { data: p } = await supabase.from('products').select('views').eq('id', action.id).single();
        if (p) {
          await supabase.from('products').update({ views: (p.views || 0) + 1 }).eq('id', action.id);
        }
        break;
      }
      default:
        break;
    }
    return { success: true, mode: 'cloud' };
  } catch (err) {
    console.error('[Supabase Sync Error]:', err.message);
    return { success: false, error: err.message, mode: 'fallback' };
  }
}

/**
 * Sync entire state (products, orders, reviews, shops, progress) to Supabase Cloud and local cache
 */
async function syncFullState(state) {
  // Always update local cache
  saveLocalState(state);

  if (!supabase) {
    return { mode: 'local' };
  }

  const statusToSupabase = {
    pending: 'awaiting',
    preparing: 'preparing',
    ready: 'confirmed',
    completed: 'delivered',
    awaiting: 'awaiting',
    confirmed: 'confirmed',
    delivered: 'delivered'
  };

  try {
    const promises = [];

    // 1. Sync Products (upsert all products)
    if (Array.isArray(state.products) && state.products.length > 0) {
      const productRows = state.products.map(p => ({
        id: String(p.id),
        shop_id: p.shopId || p.storeId || 's1',
        name: p.title || p.name || 'สินค้าใหม่',
        description: p.description || '',
        price: Number(p.price) || 0,
        cost: Number(p.cost) || 0,
        stock: Number(p.stock) || 0,
        category: p.category || 'อาหาร & เบเกอรี่',
        emoji: p.emoji || '🥪',
        color: p.color || 'emerald',
        image: p.image || null,
        views: Number(p.views) || 0,
        wish_base: Number(p.wishBase) || 0,
        wished_by: p.wishedBy || [],
        preorder: Boolean(p.isPreorder ?? p.preorder),
      }));

      promises.push(
        supabase.from('products').upsert(productRows, { onConflict: 'id' })
          .then(({ error }) => {
            if (error) console.error('[Supabase Sync Error] Products:', error.message);
          })
      );
    }

    // 2. Sync Shops
    const shopsList = state.shops || state.stores;
    if (Array.isArray(shopsList) && shopsList.length > 0) {
      const shopRows = shopsList.map(s => ({
        id: String(s.id),
        name: s.name,
        tagline: s.tagline || '',
        emoji: s.emoji || '🏪',
        color: s.color || 'emerald',
        class_id: s.classId || 'c1',
        members: s.members || [s.ownerId || 'student1'],
      }));

      promises.push(
        supabase.from('shops').upsert(shopRows, { onConflict: 'id' })
          .then(({ error }) => {
            if (error) console.error('[Supabase Sync Error] Shops:', error.message);
          })
      );
    }

    // 3. Sync Orders
    if (Array.isArray(state.orders) && state.orders.length > 0) {
      const orderRows = state.orders.map(o => {
        const rawItems = Array.isArray(o.items) ? [...o.items] : [];
        const metaItem = {
          _meta: true,
          code: o.code || '1234',
          buyerName: o.buyerName || 'ปัน (ม.4/1)',
          storeName: o.storeName || 'มินต์กับเพื่อน',
          isPreorder: Boolean(o.isPreorder),
          total: Number(o.total) || 0
        };

        return {
          id: String(o.id),
          buyer_id: o.buyerId === 'student2' || o.buyer === 'student2' ? 'student2' : null,
          shop_id: o.storeId || o.shopId || 's1',
          items: [...rawItems.filter(i => !i._meta), metaItem],
          status: statusToSupabase[o.status] || 'awaiting',
          pickup: o.pickupLocation || o.pickup || 'โรงอาหารกลาง (เสาต้นที่ 4)',
          time: o.pickupWindow || o.time || 'พักกลางวัน 12:15 - 12:45',
          is_demo: Boolean(o.demo),
          created_at: o.date || new Date().toISOString(),
        };
      });

      promises.push(
        supabase.from('orders').upsert(orderRows, { onConflict: 'id' })
          .then(({ error }) => {
            if (error) console.error('[Supabase Sync Error] Orders:', error.message);
          })
      );
    }

    // 4. Sync Reviews
    if (Array.isArray(state.reviews) && state.reviews.length > 0) {
      const reviewRows = state.reviews.map(r => ({
        id: String(r.id),
        product_id: r.productId,
        user_id: r.userId || null,
        rating: Number(r.rating) || 5,
        text: r.text || '',
        created_at: r.date || new Date().toISOString(),
      }));

      promises.push(
        supabase.from('reviews').upsert(reviewRows, { onConflict: 'id' })
          .then(({ error }) => {
            if (error) console.error('[Supabase Sync Error] Reviews:', error.message);
          })
      );
    }

    // 5. Sync Student Progress & Lessons
    const modules = [];
    if (state.lessons?.costLesson?.completed) modules.push('costLesson');
    if (state.lessons?.pricingLesson?.completed) modules.push('pricingLesson');
    if (modules.length > 0) {
      promises.push(
        supabase.from('student_progress').upsert({
          student_id: 'student1',
          modules,
          updated_at: new Date().toISOString()
        }, { onConflict: 'student_id' })
          .then(({ error }) => {
            if (error) console.error('[Supabase Sync Error] Progress:', error.message);
          })
      );
    }

    // 6. Sync Assignments
    if (Array.isArray(state.assignments) && state.assignments.length > 0) {
      const assignRows = state.assignments.map(a => ({
        id: String(a.id),
        class_id: a.classId || 'c1',
        teacher_id: 'teacher1',
        title: a.title,
        body: a.description || a.body || '',
        due: a.due || '2026-11-30',
      }));

      promises.push(
        supabase.from('assignments').upsert(assignRows, { onConflict: 'id' })
          .then(({ error }) => {
            if (error) console.error('[Supabase Sync Error] Assignments:', error.message);
          })
      );
    }

    await Promise.all(promises);
    return { mode: 'cloud', synced: true };
  } catch (err) {
    console.error('[Supabase Full Sync Exception]:', err.message);
    return { mode: 'cloud', error: err.message };
  }
}

module.exports = {
  supabase,
  sb: supabase,
  isCloudConfigured,
  getState,
  syncAction,
  syncFullState,
  saveLocalState,
  getLocalState,
};

