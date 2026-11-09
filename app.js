import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// ====================================================================
// 1. INITIAL SEED DATA (High-Fidelity Sample Dataset)
// ====================================================================
const INITIAL_CLASSES = [
  { id: 'c1', name: 'ผู้ประกอบการรุ่นจิ๋ว · ม.4/1', code: 'BIZ401', teacher: 'ครูพลอย', teacherAvatar: '👩🏻‍🏫' },
  { id: 'c2', name: 'โครงงานธุรกิจสร้างสรรค์ · ม.4/2', code: 'BIZ402', teacher: 'ครูนนท์', teacherAvatar: '👨🏻‍🏫' }
];

const INITIAL_STORES = [
  {
    id: 's1',
    name: 'มินต์กับเพื่อน (Mint & Friends)',
    ownerId: 'student1',
    ownerName: 'มินต์',
    ownerAvatar: '👩🏻',
    classId: 'c1',
    category: 'อาหาร & เบเกอรี่',
    tagline: 'ของอร่อย ทำสดใหม่ทุกเช้า คัดสรรจากพวกเรา ม.4/1',
    emoji: '🥪',
    color: 'emerald',
    isVerified: true,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 's2',
    name: 'ฟ้าทำเอง Handmade Studio',
    ownerId: 'student3',
    ownerName: 'ฟ้า',
    ownerAvatar: '👩🏽',
    classId: 'c1',
    category: 'งานคราฟต์ & DIY',
    tagline: 'งานแฮนด์เมดเล็ก ๆ ที่ตั้งใจทำด้วยความประณีต',
    emoji: '🌸',
    color: 'purple',
    isVerified: true,
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: 's3',
    name: 'ชมรมวันดีดี Bakery',
    ownerId: 'student4',
    ownerName: 'ต้น',
    ownerAvatar: '👨🏻',
    classId: 'c2',
    category: 'อาหาร & เบเกอรี่',
    tagline: 'ขนมอบสดใหม่ทุกเช้า เติมพลังใจก่อนเข้าแถว',
    emoji: '🧁',
    color: 'amber',
    isVerified: true,
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 's4',
    name: 'Craft & Clay โดย กานต์',
    ownerId: 'student6',
    ownerName: 'กานต์',
    ownerAvatar: '👦🏼',
    classId: 'c2',
    category: 'งานคราฟต์ & DIY',
    tagline: 'พวงกุญแจและจานรองเรซิ่น ปั้นมือทุกชิ้นไม่มีซ้ำ',
    emoji: '🎨',
    color: 'blue',
    isVerified: false,
    rating: 4.6,
    reviewCount: 12
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    storeId: 's1',
    storeName: 'มินต์กับเพื่อน',
    title: 'แซนด์วิชไข่โบราณไส้ทะลัก',
    category: 'อาหาร & เบเกอรี่',
    price: 35,
    cost: 18,
    stock: 18,
    emoji: '🥪',
    isPreorder: false,
    isVerified: true,
    pickupWindow: 'พักกลางวัน 12:15 - 12:45',
    description: 'ขนมปังฟูนุ่ม ไข่ต้มและน้ำสลัดโบราณสูตรเด็ด ไส้แน่นเต็มคำ ทำสดตอนเช้า'
  },
  {
    id: 'p2',
    storeId: 's1',
    storeName: 'มินต์กับเพื่อน',
    title: 'มินิบราวนี่หนึบหนับ ดาร์กช็อก 70%',
    category: 'อาหาร & เบเกอรี่',
    price: 25,
    cost: 12,
    stock: 24,
    emoji: '🍫',
    isPreorder: false,
    isVerified: true,
    pickupWindow: 'พักกลางวัน 12:15 - 12:45',
    description: 'เข้มข้น หวานน้อย หน้าฟิล์มกรอบ เนื้อชุ่มฉ่ำ ทานเย็นยิ่งอร่อย'
  },
  {
    id: 'p3',
    storeId: 's1',
    storeName: 'มินต์กับเพื่อน',
    title: 'สติกเกอร์แมวส้มไดคัทกันน้ำ (A6)',
    category: 'งานคราฟต์ & DIY',
    price: 39,
    cost: 14,
    stock: 35,
    emoji: '🐱',
    isPreorder: false,
    isVerified: true,
    pickupWindow: 'หลังเลิกเรียน 16:00 - 16:30',
    description: 'สติกเกอร์เนื้อ PP ด้าน กันน้ำ 100% ติดเคสมือถือหรือไอแพดไม่ลอก'
  },
  {
    id: 'p4',
    storeId: 's2',
    storeName: 'ฟ้าทำเอง Handmade',
    title: 'ยางรัดผมผ้าซาติน สีพาสเทล',
    category: 'แฟชั่น & ของสะสม',
    price: 29,
    cost: 9,
    stock: 2, // low stock for warning indicator
    emoji: '🎀',
    isPreorder: false,
    isVerified: true,
    pickupWindow: 'พักกลางวัน 12:15 - 12:45',
    description: 'เย็บมือทุกชิ้น ถนอมเส้นผม ไม่ทำให้ผมหักงอ ลายคลาวด์พาสเทล'
  },
  {
    id: 'p5',
    storeId: 's2',
    storeName: 'ฟ้าทำเอง Handmade',
    title: 'พวงกุญแจลูกปัด สั่งทำชื่อได้',
    category: 'แฟชั่น & ของสะสม',
    price: 45,
    cost: 15,
    stock: 15,
    emoji: '✨',
    isPreorder: true,
    isVerified: true,
    pickupWindow: 'หลังเลิกเรียน 16:00 - 16:30',
    description: 'ลูกปัดพาสเทลผสมลูกปัดมุก ระบุตัวอักษรชื่อได้ (1-6 ตัวอักษร)'
  },
  {
    id: 'p6',
    storeId: 's3',
    storeName: 'ชมรมวันดีดี Bakery',
    title: 'เค้กกล้วยหอมทองครีมชีส',
    category: 'อาหาร & เบเกอรี่',
    price: 30,
    cost: 16,
    stock: 22,
    emoji: '🧁',
    isPreorder: false,
    isVerified: true,
    pickupWindow: 'พักกลางวัน 12:15 - 12:45',
    description: 'กล้วยหอมทองแท้เน้น ๆ ท็อปด้วยสเวิร์ลครีมชีสสูตรเข้มข้น หอมละมุน'
  },
  {
    id: 'p7',
    storeId: 's3',
    storeName: 'ชมรมวันดีดี Bakery',
    title: 'คุกกี้ข้าวโอ๊ตแครนเบอร์รี่ หวานน้อย',
    category: 'อาหาร & เบเกอรี่',
    price: 25,
    cost: 13,
    stock: 0, // sold out
    emoji: '🍪',
    isPreorder: true,
    isVerified: true,
    pickupWindow: 'พักกลางวัน 12:15 - 12:45',
    description: 'ใช้เนยสดแท้ แครนเบอร์รี่เปรี้ยวหวานลงตัว ไฟเบอร์สูง'
  },
  {
    id: 'p8',
    storeId: 's4',
    storeName: 'Craft & Clay โดย กานต์',
    title: 'จานรองแก้วเรซิ่น ลายหินอ่อนทอง',
    category: 'งานคราฟต์ & DIY',
    price: 59,
    cost: 22,
    stock: 8,
    emoji: '🎨',
    isPreorder: false,
    isVerified: false,
    pickupWindow: 'หลังเลิกเรียน 16:00 - 16:30',
    description: 'กันน้ำ แข็งแรงทนทาน แต่งลายประกายทองหรูหรา วางบนโต๊ะเรียนเก๋ ๆ'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-1001',
    code: '7829',
    buyerId: 'student2',
    buyerName: 'ปัน (ม.4/1)',
    storeId: 's1',
    storeName: 'มินต์กับเพื่อน',
    items: [{ id: 'p1', title: 'แซนด์วิชไข่โบราณไส้ทะลัก', price: 35, cost: 18, qty: 2 }],
    total: 70,
    status: 'ready', // pending | preparing | ready | completed
    isPreorder: false,
    pickupLocation: 'โรงอาหารกลาง (เสาต้นที่ 4)',
    pickupWindow: 'พักกลางวัน 12:15 - 12:45',
    date: '2026-11-09T10:30:00Z'
  },
  {
    id: 'ORD-1002',
    code: '4512',
    buyerId: 'student4',
    buyerName: 'ต้น (ม.4/2)',
    storeId: 's1',
    storeName: 'มินต์กับเพื่อน',
    items: [{ id: 'p2', title: 'มินิบราวนี่หนึบหนับ ดาร์กช็อก 70%', price: 25, cost: 12, qty: 1 }],
    total: 25,
    status: 'preparing',
    isPreorder: false,
    pickupLocation: 'โรงอาหารกลาง (เสาต้นที่ 4)',
    pickupWindow: 'พักกลางวัน 12:15 - 12:45',
    date: '2026-11-09T10:45:00Z'
  },
  {
    id: 'ORD-1003',
    code: '9034',
    buyerId: 'student1',
    buyerName: 'มินต์ (ม.4/1)',
    storeId: 's2',
    storeName: 'ฟ้าทำเอง Handmade',
    items: [{ id: 'p4', title: 'ยางรัดผมผ้าซาติน สีพาสเทล', price: 29, cost: 9, qty: 1 }],
    total: 29,
    status: 'completed',
    isPreorder: false,
    pickupLocation: 'อาคาร 3 ชั้น 1 (ใต้ตึกเรียน)',
    pickupWindow: 'หลังเลิกเรียน 16:00 - 16:30',
    date: '2026-11-08T16:15:00Z'
  }
];

const INITIAL_TELEMETRY = [
  {
    studentId: 'student1',
    studentName: 'มินต์',
    avatar: '👩🏻',
    storeName: 'มินต์กับเพื่อน',
    classId: 'c1',
    priceAdjustments: 3,
    adjustmentHistory: [
      { date: '7 พ.ย.', oldPrice: 30, newPrice: 35, reason: 'ต้นทุนไข่และแพ็กเกจจิ้งเพิ่มขึ้น' },
      { date: '5 พ.ย.', oldPrice: 20, newPrice: 25, reason: 'ปรับขนาดบราวนี่ใหญ่ขึ้น' }
    ],
    stockAccuracy: 95,
    deadStockCount: 1,
    riskProfile: 'Balanced Growth', // 'Aggressive Pricing' | 'Risk Averse' | 'Balanced Growth'
    totalRevenue: 2840,
    netProfit: 1320
  },
  {
    studentId: 'student3',
    studentName: 'ฟ้า',
    avatar: '👩🏽',
    storeName: 'ฟ้าทำเอง Handmade',
    classId: 'c1',
    priceAdjustments: 5,
    adjustmentHistory: [
      { date: '8 พ.ย.', oldPrice: 35, newPrice: 45, reason: 'เพิ่มคัสตอมตัวอักษรชื่อ' },
      { date: '6 พ.ย.', oldPrice: 25, newPrice: 29, reason: 'เปลี่ยนใช้ผ้าซาตินเกรดหนา' }
    ],
    stockAccuracy: 88,
    deadStockCount: 3,
    riskProfile: 'Aggressive Pricing',
    totalRevenue: 1780,
    netProfit: 940
  },
  {
    studentId: 'student4',
    studentName: 'ต้น',
    avatar: '👨🏻',
    storeName: 'ชมรมวันดีดี Bakery',
    classId: 'c2',
    priceAdjustments: 1,
    adjustmentHistory: [
      { date: '6 พ.ย.', oldPrice: 28, newPrice: 30, reason: 'เพิ่มท็อปปิ้งครีมชีสแท้' }
    ],
    stockAccuracy: 98,
    deadStockCount: 0,
    riskProfile: 'Risk Averse',
    totalRevenue: 2200,
    netProfit: 860
  },
  {
    studentId: 'student6',
    studentName: 'กานต์',
    avatar: '👦🏼',
    storeName: 'Craft & Clay',
    classId: 'c2',
    priceAdjustments: 4,
    adjustmentHistory: [
      { date: '7 พ.ย.', oldPrice: 65, newPrice: 59, reason: 'ลดราคาดึงดูดลูกค้าช่วงเปิดร้าน' }
    ],
    stockAccuracy: 80,
    deadStockCount: 5,
    riskProfile: 'Aggressive Pricing',
    totalRevenue: 1250,
    netProfit: 450
  }
];

const INITIAL_ASSIGNMENTS = [
  {
    id: 'a1',
    classId: 'c1',
    title: 'ภารกิจที่ 1: วิเคราะห์ต้นทุนและจุดคุ้มทุนสินค้าตัวแรก',
    description: 'คำนวณต้นทุนการผลิตจริงและของเสีย พร้อมระบุจำนวนชิ้นที่ต้องขายเพื่อให้ถึงจุดคุ้มทุน (Break-even Point)',
    due: '2026-11-20',
    submissionsCount: 8,
    totalStudents: 12
  },
  {
    id: 'a2',
    classId: 'c1',
    title: 'ภารกิจที่ 2: วางแผนโปรโมชั่นลดของเสียช่วงท้ายสัปดาห์',
    description: 'ออกแบบส่วนลดสำหรับสินค้าค้างสต็อกหรือจัดชุดคู่ เพื่อป้องกัน Dead Stock ในโรงเรียน',
    due: '2026-11-25',
    submissionsCount: 4,
    totalStudents: 12
  }
];

// ====================================================================
// 2. GLOBAL STATE CONTEXT & PROVIDER
// ====================================================================
const AppContext = createContext();

export function AppProvider({ children }) {
  const STORAGE_KEY = 'edumarket_v2_hifi_state';

  // Load from LocalStorage or default
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load from localStorage:', e);
    }
    return {
      mode: 'buyer', // 'buyer' | 'seller' | 'teacher'
      selectedClassId: 'c1',
      products: INITIAL_PRODUCTS,
      stores: INITIAL_STORES,
      orders: INITIAL_ORDERS,
      telemetry: INITIAL_TELEMETRY,
      assignments: INITIAL_ASSIGNMENTS,
      cart: [],
      lessons: {
        // Quest 1: Cost & Waste
        costLesson: {
          completed: false,
          batchCost: 350,
          producedUnits: 20,
          wastedUnits: 2,
          unitCost: 19.44
        },
        // Quest 2: Break-Even
        pricingLesson: {
          completed: false,
          fixedCost: 120,
          unitCost: 19.44,
          sellingPrice: 35,
          breakEvenUnits: 8
        }
      }
    };
  });

  const [toasts, setToasts] = useState([]);

  // Save to LocalStorage on state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }, [state]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  // Switch Role Mode
  const setMode = (mode) => {
    setState(prev => ({ ...prev, mode }));
    const titles = {
      buyer: 'สลับสู่โหมด 🧑‍🎓 นักเรียน (ผู้ซื้อ)',
      seller: 'สลับสู่โหมด 🏪 นักเรียน (ผู้ขาย / เจ้าของร้าน)',
      teacher: 'สลับสู่โหมด 👨‍🏫 คุณครู (Educator Telemetry)'
    };
    showToast(titles[mode] || 'สลับโหมดแล้ว', 'info');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    const freshState = {
      mode: 'buyer',
      selectedClassId: 'c1',
      products: INITIAL_PRODUCTS,
      stores: INITIAL_STORES,
      orders: INITIAL_ORDERS,
      telemetry: INITIAL_TELEMETRY,
      assignments: INITIAL_ASSIGNMENTS,
      cart: [],
      lessons: {
        costLesson: {
          completed: false,
          batchCost: 350,
          producedUnits: 20,
          wastedUnits: 2,
          unitCost: 19.44
        },
        pricingLesson: {
          completed: false,
          fixedCost: 120,
          unitCost: 19.44,
          sellingPrice: 35,
          breakEvenUnits: 8
        }
      }
    };
    setState(freshState);
    localStorage.removeItem(STORAGE_KEY);
    showToast('รีเซ็ตข้อมูลทดสอบทั้งหมดเรียบร้อยแล้ว ✨', 'info');
  };

  // Cart Actions
  const addToCart = (product) => {
    setState(prev => {
      const existing = prev.cart.find(item => item.product.id === product.id);
      let updated;
      if (existing) {
        updated = prev.cart.map(item =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updated = [...prev.cart, { product, qty: 1 }];
      }
      return { ...prev, cart: updated };
    });
    showToast(`เพิ่ม "${product.title}" ลงตะกร้าแล้ว 🛒`);
  };

  const updateCartQty = (productId, delta) => {
    setState(prev => {
      const updated = prev.cart
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
      return { ...prev, cart: updated };
    });
  };

  const clearCart = () => {
    setState(prev => ({ ...prev, cart: [] }));
  };

  // Place Order Action
  const placeOrder = ({ isPreorder, pickupLocation, pickupWindow }) => {
    if (state.cart.length === 0) return null;

    // Generate random 4-digit verification code
    const pickupCode = Math.floor(1000 + Math.random() * 9000).toString();
    const orderId = `ORD-${Date.now().toString().slice(-4)}`;

    const items = state.cart.map(i => ({
      id: i.product.id,
      title: i.product.title,
      price: i.product.price,
      cost: i.product.cost,
      qty: i.qty
    }));

    const total = state.cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
    const primaryStore = state.stores.find(s => s.id === state.cart[0].product.storeId) || state.stores[0];

    const newOrder = {
      id: orderId,
      code: pickupCode,
      buyerId: 'student2',
      buyerName: 'ปัน (ม.4/1)',
      storeId: primaryStore.id,
      storeName: primaryStore.name,
      items,
      total,
      status: 'pending', // pending -> preparing -> ready -> completed
      isPreorder,
      pickupLocation,
      pickupWindow,
      date: new Date().toISOString()
    };

    // Auto-deduct inventory
    setState(prev => {
      const updatedProducts = prev.products.map(p => {
        const ordered = state.cart.find(ci => ci.product.id === p.id);
        if (ordered && !isPreorder) {
          return { ...p, stock: Math.max(0, p.stock - ordered.qty) };
        }
        return p;
      });

      return {
        ...prev,
        orders: [newOrder, ...prev.orders],
        products: updatedProducts,
        cart: []
      };
    });

    showToast(`สั่งซื้อสำเร็จ! รหัสรับของ: #${pickupCode} 🎟️`, 'success');
    return newOrder;
  };

  // Update Order Status (Seller Lifecycle)
  const updateOrderStatus = (orderId, status) => {
    setState(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === orderId ? { ...o, status } : o)
    }));
    const statusLabels = {
      preparing: 'กำลังเตรียมสินค้า 🍳',
      ready: 'พร้อมให้รับของแล้ว 📦',
      completed: 'ลูกค้ารับของสำเร็จแล้ว ✅'
    };
    showToast(statusLabels[status] || 'อัปเดตสถานะคำสั่งซื้อแล้ว');
  };

  // Verify Pickup Code by Seller
  const verifyPickupCode = (orderId, enteredCode) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'ไม่พบคำสั่งซื้อ' };

    if (order.code === enteredCode.trim()) {
      updateOrderStatus(orderId, 'completed');
      showToast(`ยืนยันรหัสถูกต้อง! คำสั่งซื้อ #${order.id} ส่งมอบเรียบร้อย 🎉`, 'success');
      return { success: true };
    } else {
      showToast('รหัสรับของไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง ❌', 'error');
      return { success: false, message: 'รหัสรับของไม่ถูกต้อง' };
    }
  };

  // Save Lessons Progress (Learn-to-Unlock)
  const saveLesson1 = ({ batchCost, producedUnits, wastedUnits, unitCost }) => {
    setState(prev => ({
      ...prev,
      lessons: {
        ...prev.lessons,
        costLesson: {
          completed: true,
          batchCost,
          producedUnits,
          wastedUnits,
          unitCost
        },
        pricingLesson: {
          ...prev.lessons.pricingLesson,
          unitCost // Sync variable cost to Lesson 2!
        }
      }
    }));
    showToast('บันทึกบทเรียนที่ 1: คำนวณต้นทุนต่อชิ้นเรียบร้อย! 🪙');
  };

  const saveLesson2 = ({ fixedCost, unitCost, sellingPrice, breakEvenUnits }) => {
    setState(prev => ({
      ...prev,
      lessons: {
        ...prev.lessons,
        pricingLesson: {
          completed: true,
          fixedCost,
          unitCost,
          sellingPrice,
          breakEvenUnits
        }
      }
    }));
    showToast('ผ่านบทเรียนที่ 2! ปลดล็อกการสร้างสินค้าในร้านค้าแล้ว 🎉');
  };

  // Add Product (Seller)
  const addProduct = (productData) => {
    const newProduct = {
      id: `p_${Date.now()}`,
      storeId: 's1', // current student store (Mint & Friends)
      storeName: 'มินต์กับเพื่อน',
      isVerified: true,
      ...productData
    };

    setState(prev => ({
      ...prev,
      products: [newProduct, ...prev.products]
    }));

    // Record Telemetry: price decision
    setState(prev => ({
      ...prev,
      telemetry: prev.telemetry.map(t => {
        if (t.studentId === 'student1') {
          return {
            ...t,
            priceAdjustments: t.priceAdjustments + 1,
            adjustmentHistory: [
              {
                date: 'วันนี้',
                oldPrice: 0,
                newPrice: productData.price,
                reason: `เปิดขายสินค้าใหม่: ${productData.title} (ต้นทุนคำนวณ ${productData.cost}฿)`
              },
              ...t.adjustmentHistory
            ]
          };
        }
        return t;
      })
    }));

    showToast(`เพิ่มสินค้า "${newProduct.title}" เปิดขายในตลาดแล้ว 🚀`);
  };

  // Teacher Create Assignment
  const createAssignment = ({ title, description, due, classId }) => {
    const newAssign = {
      id: `a_${Date.now()}`,
      classId: classId || state.selectedClassId,
      title,
      description,
      due,
      submissionsCount: 0,
      totalStudents: 12
    };

    setState(prev => ({
      ...prev,
      assignments: [newAssign, ...prev.assignments]
    }));
    showToast(`มอบหมายภารกิจใหม่ "${title}" ให้ห้องเรียนแล้ว 📋`);
  };

  const isStoreUnlocked = state.lessons.costLesson.completed && state.lessons.pricingLesson.completed;

  return (
    <AppContext.Provider
      value={{
        ...state,
        setMode,
        resetDemoData,
        addToCart,
        updateCartQty,
        clearCart,
        placeOrder,
        updateOrderStatus,
        verifyPickupCode,
        saveLesson1,
        saveLesson2,
        addProduct,
        createAssignment,
        isStoreUnlocked,
        showToast,
        setSelectedClassId: (id) => setState(p => ({ ...p, selectedClassId: id }))
      }}
    >
      {children}

      {/* Global Toast Container */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-xl border text-sm font-medium flex items-center gap-3 animate-pop-in ${
              toast.type === 'error'
                ? 'bg-red-900/90 text-red-100 border-red-700 backdrop-blur-md'
                : toast.type === 'info'
                ? 'bg-slate-900/90 text-cyan-200 border-cyan-800 backdrop-blur-md'
                : 'bg-slate-900/95 text-emerald-300 border-emerald-500/40 backdrop-blur-md'
            }`}
          >
            <span className="text-base">
              {toast.type === 'error' ? '⚠️' : toast.type === 'info' ? 'ℹ️' : '✨'}
            </span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useEdu() {
  return useContext(AppContext);
}

// ====================================================================
// 3. QR CODE SVG GENERATOR COMPONENT (Zero-dependency Visual QR)
// ====================================================================
function QRCodeSVG({ value = '', size = 140 }) {
  // Deterministic pseudo QR matrix generator based on value hash
  const modules = useMemo(() => {
    const N = 21; // 21x21 QR Version 1
    const matrix = Array(N).fill(null).map(() => Array(N).fill(false));

    // Corner Finder Patterns (7x7)
    const placeFinder = (r, c) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (
            i === 0 || i === 6 || j === 0 || j === 6 || // Outer ring
            (i >= 2 && i <= 4 && j >= 2 && j <= 4)      // Center box
          ) {
            matrix[r + i][c + j] = true;
          }
        }
      }
    };

    placeFinder(0, 0);         // Top-left
    placeFinder(0, N - 7);     // Top-right
    placeFinder(N - 7, 0);     // Bottom-left

    // Simple hash fill for data modules
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        // Skip finders
        if (
          (r < 8 && c < 8) ||
          (r < 8 && c >= N - 8) ||
          (r >= N - 8 && c < 8)
        ) continue;

        // Pseudo data pattern
        const seed = (r * 31 + c * 17 + hash) & 0xff;
        if (seed % 3 === 0 || (r + c) % 4 === 0) {
          matrix[r][c] = true;
        }
      }
    }

    return matrix;
  }, [value]);

  const N = 21;
  const cellSize = size / N;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="bg-white p-2 rounded-xl shadow-inner border border-slate-200">
      {modules.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize + 0.3}
              height={cellSize + 0.3}
              fill="#0f172a"
            />
          ) : null
        )
      )}
    </svg>
  );
}

// ====================================================================
// 4. TOP FLOATING QUICK ROLE SWITCHER
// ====================================================================
function TopRoleSwitcher() {
  const { mode, setMode, resetDemoData, cart } = useEdu();
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  return (
    <>
      <aside aria-label="แถบควบคุมบทบาทและสถานะระบบ" className="sticky top-0 z-50 w-full glass-nav border-b border-slate-800 text-slate-100 shadow-xl px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Brand Logo & Mode Badge */}
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-brand-lime text-slate-950 font-black flex items-center justify-center text-sm tracking-tighter shadow-sm">
              em
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                EduMarket
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Prototype
                </span>
              </span>
              <span className="text-[11px] text-slate-400">
                {mode === 'buyer' && 'โหมดนักเรียน: สั่งซื้อและนัดรับของ'}
                {mode === 'seller' && 'โหมดนักเรียน: เจ้าของร้าน & บทเรียนธุรกิจ'}
                {mode === 'teacher' && 'โหมดคุณครู: Telemetry & สถิติความเสี่ยง'}
              </span>
            </div>
          </div>

          {/* Quick Role Switcher Buttons */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 shadow-inner">
            <button
              onClick={() => setMode('buyer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                mode === 'buyer'
                  ? 'bg-brand-500 text-white shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>🧑‍🎓</span>
              <span>นักเรียน (ผู้ซื้อ)</span>
            </button>

            <button
              onClick={() => setMode('seller')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                mode === 'seller'
                  ? 'bg-brand-lime text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>🏪</span>
              <span>นักเรียน (ผู้ขาย)</span>
            </button>

            <button
              onClick={() => setMode('teacher')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                mode === 'teacher'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>👨‍🏫</span>
              <span>คุณครู (Telemetry)</span>
            </button>
          </div>

          {/* Reset Demo Data Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfirmReset(true)}
              title="รีเซ็ตข้อมูลตัวอย่างทั้งหมดกลับสู่ค่าเริ่มต้น"
              className="text-xs text-slate-400 hover:text-red-300 hover:bg-red-500/10 px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-red-500/40 transition-colors flex items-center gap-1.5"
            >
              <span>🔄</span>
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>

        </div>
      </aside>

      {/* Confirm Reset Dialog */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-pop-in">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl mb-4">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-slate-900">รีเซ็ตข้อมูลทดสอบทั้งหมด?</h3>
            <p className="text-sm text-slate-600 mt-1 mb-6">
              ระบบจะรีเซ็ตสินค้า ออเดอร์ บทเรียนที่เรียนจบ และสถิติ Telemetry ทั้งหมดกลับสู่ค่าเริ่มต้น
            </p>
            <div className="flex gap-2.5 justify-end">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setShowConfirmReset(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors"
              >
                ยืนยันการรีเซ็ต
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ====================================================================
// 5. VIEW 1: STUDENT BUYER (Marketplace & School Pickup Engine)
// ====================================================================
function StudentBuyerView() {
  const { products, addToCart, cart, orders } = useEdu();
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);
  const [showMyOrdersModal, setShowMyOrdersModal] = useState(false);
  const [newlyCreatedOrder, setNewlyCreatedOrder] = useState(null);

  const categories = ['ทั้งหมด', 'อาหาร & เบเกอรี่', 'เครื่องดื่ม', 'งานคราฟต์ & DIY', 'แฟชั่น & ของสะสม'];

  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === 'ทั้งหมด' || p.category === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.storeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 w-full animate-fade-in">
      
      {/* Marketplace Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-8 border border-slate-700/60">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
            <span>✨</span>
            <span>ตลาดนัดจำลองในโรงเรียน · เทอม 2/2569</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            อุดหนุนไอเดียสร้างสรรค์ <br />
            <span className="text-brand-lime">จากเพื่อน ๆ ในโรงเรียน</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
            เลือกสินค้า ขนม งานแฮนด์เมด และชีทสรุป พร้อมนัดรับของที่โรงอาหารหรือใต้ตึกเรียนช่วงพักกลางวัน
          </p>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setShowMyOrdersModal(true)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-600 transition-colors shadow-sm"
            >
              <span>🎟️</span>
              <span>คำสั่งซื้อและรหัสรับของ ({orders.length})</span>
            </button>
          </div>
        </div>

        {/* Decorative Mascot Art */}
        <div className="hidden md:block absolute right-8 -bottom-4 w-52 opacity-95 pointer-events-none">
          <img src="/assets/student-mascot.webp" alt="Mascot" className="w-full h-auto drop-shadow-2xl" />
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อสินค้าหรือร้านค้า..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/40 text-slate-800"
          />
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div>
              {/* Product Visual Box */}
              <div className="w-full h-36 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-5xl relative mb-3 overflow-hidden border border-slate-100">
                <span className="transform group-hover:scale-110 transition-transform duration-200">
                  {product.emoji || '📦'}
                </span>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isVerified && (
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                      <span>✓</span>
                      <span>Verified</span>
                    </span>
                  )}
                  {product.isPreorder && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      พรีออเดอร์
                    </span>
                  )}
                </div>

                {/* Stock Indicator */}
                <div className="absolute bottom-2 right-2">
                  {product.stock === 0 ? (
                    <span className="bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      สินค้าหมด
                    </span>
                  ) : product.stock <= 3 ? (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-300">
                      เหลือ {product.stock} ชิ้น
                    </span>
                  ) : (
                    <span className="bg-slate-900/70 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-xs">
                      สต็อก {product.stock}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="text-[11px] text-slate-500 font-medium mb-1">
                {product.storeName}
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5 line-clamp-1 group-hover:text-brand-600 transition-colors">
                {product.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                {product.description}
              </p>
            </div>

            {/* Price & Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-base font-extrabold text-slate-900">
                  ฿{product.price}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  จุดรับ: พักเที่ยง
                </span>
              </div>

              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0 && !product.isPreorder}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                  product.stock === 0 && !product.isPreorder
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 hover:bg-brand-500 text-white hover:text-white'
                }`}
              >
                <span>+</span>
                <span>เพิ่ม</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Pill */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-pop-in">
          <button
            onClick={() => setShowCartModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-3 transition-transform hover:scale-105"
          >
            <span className="text-base">🛒</span>
            <span className="text-xs font-bold">ตะกร้าของคุณ ({cartItemCount} ชิ้น)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime"></span>
            <span className="text-xs font-extrabold text-brand-lime">
              ฿{cart.reduce((s, i) => s + i.product.price * i.qty, 0)}
            </span>
          </button>
        </div>
      )}

      {/* Cart & Checkout Modal */}
      {showCartModal && (
        <CartCheckoutModal
          onClose={() => setShowCartModal(false)}
          onOrderSuccess={(order) => {
            setShowCartModal(false);
            setNewlyCreatedOrder(order);
            setShowMyOrdersModal(true);
          }}
        />
      )}

      {/* My Orders & Pickup Verification QR Modal */}
      {showMyOrdersModal && (
        <MyOrdersModal
          highlightOrder={newlyCreatedOrder}
          onClose={() => {
            setShowMyOrdersModal(false);
            setNewlyCreatedOrder(null);
          }}
        />
      )}

    </div>
  );
}

// ====================================================================
// 5.1 CART & CHECKOUT MODAL
// ====================================================================
function CartCheckoutModal({ onClose, onOrderSuccess }) {
  const { cart, updateCartQty, clearCart, placeOrder } = useEdu();
  const [isPreorder, setIsPreorder] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('โรงอาหารกลาง (เสาต้นที่ 4)');
  const [pickupWindow, setPickupWindow] = useState('พักกลางวัน 12:15 - 12:45');

  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const locations = [
    { name: 'โรงอาหารกลาง (เสาต้นที่ 4)', icon: '🏫', desc: 'โต๊ะประจำกลุ่ม ม.4' },
    { name: 'อาคาร 3 ชั้น 1 (ใต้ตึกเรียน)', icon: '🏢', desc: 'ม้านั่งหน้าสหกรณ์' },
    { name: 'ร้านสหกรณ์โรงเรียน', icon: '🏪', desc: 'จุดวางของฝากส่ง' },
    { name: 'ศาลาหน้าเสาธง', icon: '🚩', desc: 'นัดรับช่วงเลิกเรียน' }
  ];

  const handleConfirm = () => {
    const order = placeOrder({
      isPreorder,
      pickupLocation,
      pickupWindow
    });
    if (order) {
      onOrderSuccess(order);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-pop-in max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h2 className="text-lg font-bold text-slate-900">ตะกร้าสินค้า & นัดรับของ</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Cart Item List */}
        <div className="divide-y divide-slate-100 mb-6">
          {cart.map(item => (
            <div key={item.product.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  {item.product.emoji}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.product.title}</h4>
                  <span className="text-[11px] text-slate-500">฿{item.product.price} / ชิ้น</span>
                </div>
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => updateCartQty(item.product.id, -1)}
                  className="w-6 h-6 rounded-lg bg-white shadow-xs text-xs font-bold text-slate-700 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-xs font-bold text-slate-900 px-1">{item.qty}</span>
                <button
                  onClick={() => updateCartQty(item.product.id, 1)}
                  className="w-6 h-6 rounded-lg bg-white shadow-xs text-xs font-bold text-slate-700 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Mode Toggle (Buy Now vs Pre-order) */}
        <div className="mb-5">
          <label className="text-xs font-bold text-slate-800 block mb-2">
            รูปแบบการสั่งซื้อ
          </label>
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setIsPreorder(false)}
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                !isPreorder ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚡ ซื้อทันที (ของพร้อมส่ง)
            </button>
            <button
              onClick={() => setIsPreorder(true)}
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                isPreorder ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📅 พรีออเดอร์ (สั่งล่วงหน้า)
            </button>
          </div>
        </div>

        {/* Pickup Location Selector */}
        <div className="mb-5">
          <label className="text-xs font-bold text-slate-800 block mb-2">
            เลือกจุดนัดรับของในโรงเรียน
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {locations.map(loc => (
              <button
                key={loc.name}
                type="button"
                onClick={() => setPickupLocation(loc.name)}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  pickupLocation === loc.name
                    ? 'border-brand-500 bg-brand-50/70 text-slate-900 ring-2 ring-brand-500/30'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <span className="text-lg">{loc.icon}</span>
                <div>
                  <div className="text-xs font-bold">{loc.name}</div>
                  <div className="text-[10px] text-slate-500">{loc.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pickup Time Window */}
        <div className="mb-6">
          <label className="text-xs font-bold text-slate-800 block mb-2">
            ช่วงเวลานัดรับของ
          </label>
          <select
            value={pickupWindow}
            onChange={(e) => setPickupWindow(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          >
            <option value="พักกลางวัน 12:15 - 12:45">พักกลางวัน (12:15 - 12:45 น.)</option>
            <option value="ช่วงพักบ่าย 14:30 - 14:45">ช่วงพักบ่าย (14:30 - 14:45 น.)</option>
            <option value="หลังเลิกเรียน 16:00 - 16:30">หลังเลิกเรียน (16:00 - 16:30 น.)</option>
          </select>
        </div>

        {/* Total & Submit */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">ยอดรวมทั้งสิ้น</span>
            <span className="text-xl font-extrabold text-slate-900">฿{total}</span>
          </div>

          <button
            onClick={handleConfirm}
            className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors text-xs flex items-center gap-2"
          >
            <span>ยืนยันคำสั่งซื้อ</span>
            <span>➔</span>
          </button>
        </div>

      </div>
    </div>
  );
}

// ====================================================================
// 5.2 MY ORDERS & QR PICKUP VERIFICATION MODAL
// ====================================================================
function MyOrdersModal({ highlightOrder, onClose }) {
  const { orders } = useEdu();
  const [selectedOrder, setSelectedOrder] = useState(highlightOrder || orders[0] || null);

  const statusMap = {
    pending: { label: 'รอยืนยันคำสั่งซื้อ', bg: 'bg-amber-100 text-amber-800 border-amber-300' },
    preparing: { label: 'กำลังเตรียมสินค้า', bg: 'bg-blue-100 text-blue-800 border-blue-300' },
    ready: { label: 'พร้อมรับของแล้ว!', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    completed: { label: 'รับของสำเร็จแล้ว', bg: 'bg-slate-100 text-slate-700 border-slate-200' }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-pop-in max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎟️</span>
            <div>
              <h2 className="text-base font-bold text-slate-900">คำสั่งซื้อและรหัสรับของ (Pickup Code)</h2>
              <p className="text-xs text-slate-500">แสดงรหัส 4 หลักหรือ QR Code ให้ร้านค้าสแกนเพื่อรับของ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <span className="text-4xl block mb-2">📦</span>
            <p className="text-sm">ยังไม่มีคำสั่งซื้อ</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Orders Sidebar List */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {orders.map(order => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    selectedOrder?.id === order.id
                      ? 'border-brand-500 bg-brand-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{order.storeName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusMap[order.status]?.bg}`}>
                      {statusMap[order.status]?.label}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mb-1.5">
                    {order.items.map(i => `${i.title} x${i.qty}`).join(', ')}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>รหัส: <b className="text-slate-800 font-mono">#{order.code}</b></span>
                    <span className="font-bold text-slate-900">฿{order.total}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Order Detail & QR Code Card */}
            {selectedOrder && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col items-center justify-center text-center">
                
                {/* 4-Digit Pickup Code */}
                <span className="text-xs text-slate-500 font-medium">รหัสยืนยันการรับของ (Pickup Code)</span>
                <div className="text-3xl font-black font-mono tracking-widest text-slate-900 bg-white px-5 py-1.5 rounded-xl border border-slate-200 shadow-sm mt-1 mb-4 text-emerald-600">
                  #{selectedOrder.code}
                </div>

                {/* QR Code SVG */}
                <div className="mb-4">
                  <QRCodeSVG value={`EDUMARKET:${selectedOrder.id}:${selectedOrder.code}`} size={140} />
                </div>

                {/* Order Meta */}
                <div className="w-full bg-white p-3 rounded-xl border border-slate-200 text-left text-xs space-y-1 mb-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">ร้านค้า:</span>
                    <span className="font-bold text-slate-900">{selectedOrder.storeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">จุดรับของ:</span>
                    <span className="font-semibold text-slate-900">{selectedOrder.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">เวลานัดรับ:</span>
                    <span className="font-semibold text-slate-900">{selectedOrder.pickupWindow}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  ยื่นรหัสนี้หรือให้เจ้าของร้านสแกน QR ตอนรับสินค้า
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

// ====================================================================
// 6. VIEW 2: STUDENT SELLER (Store Quests, Lessons, & Fulfilling Engine)
// ====================================================================
function StudentSellerView() {
  const {
    stores,
    products,
    orders,
    lessons,
    isStoreUnlocked,
    updateOrderStatus,
    verifyPickupCode
  } = useEdu();

  // Active student store: Mint & Friends (s1)
  const currentStore = stores[0];
  const myProducts = products.filter(p => p.storeId === currentStore.id);
  const myOrders = orders.filter(o => o.storeId === currentStore.id);

  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' | 'orders' | 'products'
  const [showCostLessonModal, setShowCostLessonModal] = useState(false);
  const [showPricingLessonModal, setShowPricingLessonModal] = useState(false);
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [verifyingOrder, setVerifyingOrder] = useState(null);
  const [enteredCode, setEnteredCode] = useState('');

  // Store Analytics
  const totalRevenue = myOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = myOrders.filter(o => o.status !== 'completed').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 w-full animate-fade-in">
      
      {/* Store Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-3xl shadow-inner">
            {currentStore.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{currentStore.name}</h1>
              {currentStore.isVerified && (
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ✓ Verified Store
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{currentStore.tagline}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
              <span>เจ้าของ: <b className="text-slate-800">{currentStore.ownerName} (ม.4/1)</b></span>
              <span>•</span>
              <span>⭐ {currentStore.rating} ({currentStore.reviewCount} รีวิว)</span>
            </div>
          </div>
        </div>

        {/* Store KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">รายได้สำเร็จ</span>
            <span className="text-base font-extrabold text-emerald-600">฿{totalRevenue}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">ออเดอร์รอจัดส่ง</span>
            <span className="text-base font-extrabold text-amber-600">{pendingOrders}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">สินค้าในสต็อก</span>
            <span className="text-base font-extrabold text-slate-800">{myProducts.length} รายการ</span>
          </div>
        </div>
      </div>

      {/* Seller Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-2">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`pb-3 px-4 text-xs font-bold transition-all relative ${
            activeTab === 'lessons'
              ? 'text-slate-900 border-b-2 border-brand-500'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>🎯 บทเรียนธุรกิจ & ปลดล็อกร้าน</span>
          {(!lessons.costLesson.completed || !lessons.pricingLesson.completed) && (
            <span className="ml-1.5 w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-xs font-bold transition-all relative ${
            activeTab === 'orders'
              ? 'text-slate-900 border-b-2 border-brand-500'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>📦 คำสั่งซื้อลูกค้า ({myOrders.length})</span>
          {pendingOrders > 0 && (
            <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-brand-500 text-white text-[10px]">
              {pendingOrders}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-4 text-xs font-bold transition-all relative ${
            activeTab === 'products'
              ? 'text-slate-900 border-b-2 border-brand-500'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>🛍️ จัดการสินค้า ({myProducts.length})</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE LESSONS & QUESTS (Gating System) */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          
          {/* Unlock Gating Status Banner */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isStoreUnlocked
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{isStoreUnlocked ? '🎉' : '🔒'}</span>
              <div>
                <h4 className="text-sm font-bold">
                  {isStoreUnlocked
                    ? 'ปลดล็อกร้านค้าสำเร็จ! คุณพร้อมเปิดขายสินค้าแล้ว'
                    : 'ระบบ Learn-to-Unlock: ทำภารกิจเพื่อปลดล็อกการลงขายสินค้า'}
                </h4>
                <p className="text-xs opacity-80 mt-0.5">
                  {isStoreUnlocked
                    ? 'ต้นทุนที่คำนวณได้จากบทเรียนจะถูกซิงก์เข้าสู่ฟอร์มสร้างสินค้าโดยอัตโนมัติ'
                    : 'นักเรียนต้องเรียนจบบทเรียนที่ 1 และ 2 เพื่อเข้าใจต้นทุนจริงและไม่ตั้งราคาขายขาดทุน'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (isStoreUnlocked) {
                  setShowCreateProductModal(true);
                } else {
                  setShowCostLessonModal(true);
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm transition-all ${
                isStoreUnlocked
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              {isStoreUnlocked ? '➕ สร้างสินค้าใหม่ (Auto-Cost)' : 'เริ่มทำบทเรียนทันที'}
            </button>
          </div>

          {/* Lessons Quest Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Quest 1: Cost & Waste */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                    🪙
                  </span>
                  {lessons.costLesson.completed ? (
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                      <span>✓</span>
                      <span>ผ่านแล้ว</span>
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                      ยังไม่ผ่าน
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  บทเรียนที่ 1: คิดต้นทุนและของเสีย (Cost & Waste)
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  ฝึกคำนวณต้นทุนต่อชิ้นจริง เมื่อเกิดของเสียจากการผลิต (เช่น ขนมปังปิ้งไหม้, แก้วแตก) เพื่อไม่ให้ขาดทุนโดยไม่รู้ตัว
                </p>

                {lessons.costLesson.completed && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 mb-4">
                    <div className="flex justify-between text-slate-600">
                      <span>ต้นทุนรวมที่คำนวณ:</span>
                      <span className="font-bold text-slate-800">฿{lessons.costLesson.batchCost}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>ผลิตได้สุทธิ:</span>
                      <span className="font-bold text-slate-800">{lessons.costLesson.producedUnits - lessons.costLesson.wastedUnits} ชิ้น</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-slate-200">
                      <span>ต้นทุนจริงต่อชิ้น:</span>
                      <span>฿{lessons.costLesson.unitCost.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowCostLessonModal(true)}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{lessons.costLesson.completed ? 'แก้ไขการคำนวณ ✏️' : 'เข้าสู่แบบจำลองต้นทุน ➔'}</span>
              </button>
            </div>

            {/* Quest 2: Break-Even & Pricing */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                    📈
                  </span>
                  {lessons.pricingLesson.completed ? (
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                      <span>✓</span>
                      <span>ผ่านแล้ว</span>
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                      ยังไม่ผ่าน
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  บทเรียนที่ 2: จุดคุ้มทุนและการตั้งราคา (Break-Even)
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  เรียนรู้จุดตัดระหว่างรายได้และต้นทุนรวม เพื่อหาว่าต้องขายให้ได้กี่ชิ้นจึงจะเริ่มมีกำไรเข้ากระเป๋า
                </p>

                {lessons.pricingLesson.completed && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 mb-4">
                    <div className="flex justify-between text-slate-600">
                      <span>ต้นทุนคงที่ (Fixed Cost):</span>
                      <span className="font-bold text-slate-800">฿{lessons.pricingLesson.fixedCost}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>ราคาขายที่ตั้งไว้:</span>
                      <span className="font-bold text-slate-800">฿{lessons.pricingLesson.sellingPrice}</span>
                    </div>
                    <div className="flex justify-between text-purple-700 font-bold pt-1 border-t border-slate-200">
                      <span>จุดคุ้มทุน (Break-Even):</span>
                      <span>ต้องขายได้ {lessons.pricingLesson.breakEvenUnits} ชิ้น</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowPricingLessonModal(true)}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{lessons.pricingLesson.completed ? 'แก้ไขการตั้งราคา ✏️' : 'เข้าสู่กราฟจุดคุ้มทุน ➔'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: LIVE ORDERS FULFILLING ENGINE */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              รายการคำสั่งซื้อของร้าน ({myOrders.length})
            </h3>
            <span className="text-xs text-slate-500">
              ผู้ซื้อจะนำรหัส 4 หลักหรือ QR Code มาแสดงตอนรับของ
            </span>
          </div>

          <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {myOrders.map(order => (
              <div key={order.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg mt-0.5">
                    🛍️
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-sm">#{order.id}</span>
                      <span className="text-xs text-slate-500">โดย {order.buyerName}</span>
                      <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Code: #{order.code}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 font-medium mb-1">
                      {order.items.map(i => `${i.title} (${i.qty} ชิ้น)`).join(', ')}
                    </div>
                    <div className="text-[11px] text-slate-400 flex flex-wrap gap-2">
                      <span>📍 จุดรับ: <b>{order.pickupLocation}</b></span>
                      <span>⏰ เวลา: <b>{order.pickupWindow}</b></span>
                    </div>
                  </div>
                </div>

                {/* Actions & Verification */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold border border-blue-200 transition-colors"
                    >
                      เริ่มเตรียมของ 🍳
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold border border-emerald-200 transition-colors"
                    >
                      แจ้งพร้อมรับของ 📦
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => {
                        setVerifyingOrder(order);
                        setEnteredCode('');
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-brand-lime rounded-xl text-xs font-extrabold shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <span>🔑</span>
                      <span>สแกน / กรอกรหัสรับของ</span>
                    </button>
                  )}
                  {order.status === 'completed' && (
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                      ✓ ส่งมอบสำเร็จ
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">
              สินค้าทั้งหมดในร้าน ({myProducts.length})
            </h3>
            <button
              onClick={() => {
                if (isStoreUnlocked) {
                  setShowCreateProductModal(true);
                } else {
                  setShowCostLessonModal(true);
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                isStoreUnlocked
                  ? 'bg-slate-900 hover:bg-slate-800 text-white'
                  : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
              }`}
            >
              <span>{isStoreUnlocked ? '➕ เพิ่มสินค้าใหม่' : '🔒 ปลดล็อกด้วยบทเรียน'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myProducts.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                    {p.emoji}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                    <span className="text-[11px] text-slate-500">
                      ราคา ฿{p.price} (ต้นทุน ฿{p.cost})
                    </span>
                    <div className="text-[10px] text-emerald-600 font-semibold">
                      กำไร ฿{p.price - p.cost} / ชิ้น
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 block">
                    คงเหลือ {p.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: LESSON 1 (Cost & Waste Simulator) */}
      {showCostLessonModal && (
        <Lesson1CostModal
          initialData={lessons.costLesson}
          onClose={() => setShowCostLessonModal(false)}
        />
      )}

      {/* MODAL: LESSON 2 (Break-Even & Pricing Simulator) */}
      {showPricingLessonModal && (
        <Lesson2PricingModal
          initialData={lessons.pricingLesson}
          syncedCost={lessons.costLesson.unitCost}
          onClose={() => setShowPricingLessonModal(false)}
        />
      )}

      {/* MODAL: PRODUCT CREATION (Auto-Filled with Lesson Cost) */}
      {showCreateProductModal && (
        <CreateProductModal
          defaultCost={lessons.costLesson.unitCost}
          onClose={() => setShowCreateProductModal(false)}
        />
      )}

      {/* MODAL: VERIFY PICKUP CODE (Seller Input) */}
      {verifyingOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-pop-in">
            <div className="text-center mb-4">
              <span className="text-3xl block mb-1">🔑</span>
              <h3 className="text-base font-bold text-slate-900">ตรวจรหัสรับสินค้า</h3>
              <p className="text-xs text-slate-500">
                กรอกรหัส 4 หลักที่ปรากฏบนหน้าจอมือถือของผู้ซื้อ ({verifyingOrder.buyerName})
              </p>
            </div>

            <div className="mb-4">
              <input
                type="text"
                maxLength={4}
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                placeholder="กรอกรหัส 4 หลัก (เช่น 7829)"
                className="w-full text-center text-2xl font-black font-mono tracking-widest py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
                autoFocus
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setVerifyingOrder(null)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => {
                  const res = verifyPickupCode(verifyingOrder.id, enteredCode);
                  if (res.success) {
                    setVerifyingOrder(null);
                  }
                }}
                disabled={enteredCode.length !== 4}
                className="w-1/2 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 text-white font-bold text-xs shadow-md transition-colors"
              >
                ยืนยันการส่งมอบ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ====================================================================
// 6.1 LESSON 1: COST & WASTE SIMULATOR MODAL
// ====================================================================
function Lesson1CostModal({ initialData, onClose }) {
  const { saveLesson1 } = useEdu();

  const [batchCost, setBatchCost] = useState(initialData.batchCost || 350);
  const [producedUnits, setProducedUnits] = useState(initialData.producedUnits || 20);
  const [wastedUnits, setWastedUnits] = useState(initialData.wastedUnits || 2);

  // Calculations
  const usableUnits = Math.max(0, producedUnits - wastedUnits);
  const isAllWaste = usableUnits === 0;
  const trueCostPerUnit = isAllWaste ? 0 : batchCost / usableUnits;
  const baseCostPerUnit = producedUnits > 0 ? batchCost / producedUnits : 0;
  const wastePenalty = trueCostPerUnit - baseCostPerUnit;
  const wastePercentage = producedUnits > 0 ? (wastedUnits / producedUnits) * 100 : 0;

  const handleSave = () => {
    if (isAllWaste) return;
    saveLesson1({
      batchCost,
      producedUnits,
      wastedUnits,
      unitCost: Number(trueCostPerUnit.toFixed(2))
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-pop-in max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
              🪙
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                แบบจำลอง: ต้นทุนจริงหลังรวมของเสีย (Cost & Waste)
              </h3>
              <p className="text-xs text-slate-500">ปรับตัวเลื่อนเพื่อดูผลกระทบของของเสียที่มีต่อต้นทุนต่อชิ้น</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Sliders Container */}
        <div className="space-y-4 mb-6">
          
          {/* Slider 1: Total Batch Cost */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-slate-700">1. เงินทุนรวมที่ใช้ผลิตทั้งก้อน (Batch Cost)</span>
              <span className="font-extrabold text-emerald-600 text-sm">฿{batchCost}</span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={batchCost}
              onChange={(e) => setBatchCost(Number(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>฿100</span>
              <span>฿1,000</span>
              <span>฿2,000</span>
            </div>
          </div>

          {/* Slider 2: Produced Units */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-slate-700">2. จำนวนที่ทำออกมาได้ทั้งหมด (Produced Units)</span>
              <span className="font-extrabold text-slate-900 text-sm">{producedUnits} ชิ้น</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={producedUnits}
              onChange={(e) => setProducedUnits(Number(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>5 ชิ้น</span>
              <span>30 ชิ้น</span>
              <span>60 ชิ้น</span>
            </div>
          </div>

          {/* Slider 3: Wasted Units */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-slate-700">3. จำนวนของเสีย / ตกหล่น / ไหม้ (Wasted Units)</span>
              <span className="font-extrabold text-coral-500 text-sm">{wastedUnits} ชิ้น ({wastePercentage.toFixed(0)}%)</span>
            </div>
            <input
              type="range"
              className="slider-coral"
              min="0"
              max={producedUnits}
              step="1"
              value={wastedUnits}
              onChange={(e) => setWastedUnits(Number(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0 ชิ้น (ไม่มีของเสีย)</span>
              <span>เสียครึ่งหนึ่ง</span>
              <span>เสียทั้งหมด</span>
            </div>
          </div>

        </div>

        {/* Edge Case Warning: 100% Waste */}
        {isAllWaste && (
          <div className="p-3.5 mb-5 rounded-2xl bg-coral-50 border border-coral-200 text-coral-800 text-xs flex items-center gap-2 animate-pop-in">
            <span className="text-lg">⚠️</span>
            <div>
              <b>ของเสีย 100%! ไม่สามารถผลิตเพื่อขายได้</b>
              <div className="text-[11px] opacity-90">ของเสียเท่ากับจำนวนผลิต ทำให้ไม่มีสินค้าขายและคำนวณต้นทุนไม่ได้</div>
            </div>
          </div>
        )}

        {/* Real-time Calculation Result Card & Visual Chart */}
        {!isAllWaste && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl mb-6 shadow-md border border-slate-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  ต้นทุนจริงที่ต้องใช้ตั้งราคา (True Unit Cost)
                </span>
                <div className="text-3xl font-extrabold text-white mt-0.5">
                  ฿{trueCostPerUnit.toFixed(2)}
                  <span className="text-xs text-slate-300 font-normal ml-2">/ ชิ้น</span>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-300 space-y-0.5">
                <div>จำนวนที่ขายได้จริง: <b className="text-white">{usableUnits} ชิ้น</b></div>
                <div>ต้นทุนส่วนเพิ่มจากของเสีย: <b className="text-coral-400">+฿{wastePenalty.toFixed(2)} / ชิ้น</b></div>
              </div>
            </div>

            {/* Visual Bar Comparison */}
            <div className="space-y-1.5 pt-3 border-t border-slate-700/80">
              <div className="text-[11px] text-slate-300 flex justify-between">
                <span>สัดส่วนต้นทุนฐาน vs ส่วนของเสีย:</span>
                <span className="text-emerald-300 font-semibold">{baseCostPerUnit.toFixed(1)}฿ + {wastePenalty.toFixed(1)}฿</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-700 flex overflow-hidden">
                <div
                  style={{ width: `${Math.max(10, 100 - wastePercentage)}%` }}
                  className="bg-emerald-500 h-full transition-all duration-200"
                  title="ต้นทุนการผลิตปกติ"
                ></div>
                <div
                  style={{ width: `${wastePercentage}%` }}
                  className="bg-coral-500 h-full transition-all duration-200"
                  title="ภาระต้นทุนจากของเสีย"
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            ปิด
          </button>
          <button
            onClick={handleSave}
            disabled={isAllWaste}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-md transition-colors"
          >
            บันทึกผล & ซิงก์ต้นทุนสู่ฟอร์มขาย ➔
          </button>
        </div>

      </div>
    </div>
  );
}

// ====================================================================
// 6.2 LESSON 2: BREAK-EVEN & PRICING SIMULATOR MODAL
// ====================================================================
function Lesson2PricingModal({ initialData, syncedCost = 19.44, onClose }) {
  const { saveLesson2 } = useEdu();

  const [fixedCost, setFixedCost] = useState(initialData.fixedCost || 120);
  const [unitCost, setUnitCost] = useState(syncedCost || 19.44);
  const [sellingPrice, setSellingPrice] = useState(initialData.sellingPrice || 35);

  // Calculations
  const marginPerUnit = sellingPrice - unitCost;
  const isLossPrice = marginPerUnit <= 0;
  const breakEvenUnits = isLossPrice ? 0 : Math.ceil(fixedCost / marginPerUnit);
  const marginRatio = sellingPrice > 0 ? (marginPerUnit / sellingPrice) * 100 : 0;

  const handleSave = () => {
    if (isLossPrice) return;
    saveLesson2({
      fixedCost,
      unitCost,
      sellingPrice,
      breakEvenUnits
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-pop-in max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
              📈
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                แบบจำลอง: จุดคุ้มทุนและการตั้งราคา (Break-Even)
              </h3>
              <p className="text-xs text-slate-500">จำลองจุดตัดระหว่างรายได้และต้นทุนรวมเพื่อปลดล็อกการสร้างสินค้า</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Sliders */}
        <div className="space-y-4 mb-5">
          
          {/* Slider 1: Fixed Cost */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-slate-700">1. ต้นทุนคงที่ (ค่าเช่าโต๊ะ ค่าอุปกรณ์ ป้ายร้าน)</span>
              <span className="font-extrabold text-slate-900 text-sm">฿{fixedCost}</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={fixedCost}
              onChange={(e) => setFixedCost(Number(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>฿50</span>
              <span>฿250</span>
              <span>฿500</span>
            </div>
          </div>

          {/* Slider 2: Unit Variable Cost (synced) */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-slate-700">
                2. ต้นทุนผันแปรต่อชิ้น (Variable Cost)
                <span className="text-[10px] text-emerald-600 ml-1.5 font-semibold">✨ ซิงก์จากบทเรียน 1</span>
              </span>
              <span className="font-extrabold text-slate-900 text-sm">฿{unitCost.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={unitCost}
              onChange={(e) => setUnitCost(Number(e.target.value))}
            />
          </div>

          {/* Slider 3: Selling Price */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-bold text-slate-700">3. ราคาขายต่อชิ้นที่ตั้งไว้ (Selling Price)</span>
              <span className="font-extrabold text-emerald-600 text-sm">฿{sellingPrice}</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>฿10</span>
              <span>฿50</span>
              <span>฿100</span>
            </div>
          </div>

        </div>

        {/* Edge Case Warning: Price <= Unit Cost */}
        {isLossPrice && (
          <div className="p-3.5 mb-5 rounded-2xl bg-coral-50 border border-coral-200 text-coral-800 text-xs flex items-center gap-2 animate-pop-in">
            <span className="text-lg">⚠️</span>
            <div>
              <b>ราคาขายต่ำกว่าหรือเท่ากับต้นทุน! (Margin ติดลบ)</b>
              <div className="text-[11px] opacity-90">ขายยิ่งเยอะยิ่งขาดทุน จะไม่มีวันคุ้มทุนได้ กรุณาปรับราคาขายให้สูงกว่า ฿{unitCost.toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* Live Break-Even Chart (SVG Coordinate Graph) */}
        {!isLossPrice && (
          <div className="bg-slate-900 text-white p-4 rounded-2xl mb-6 shadow-inner border border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-slate-300">
                กราฟจุดคุ้มทุน (Revenue vs Total Cost)
              </span>
              <span className="text-xs font-extrabold text-brand-lime bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                จุดคุ้มทุน: {breakEvenUnits} ชิ้น
              </span>
            </div>

            {/* SVG Break-Even Visual */}
            <svg viewBox="0 0 340 160" className="w-full h-36 bg-slate-950/60 rounded-xl p-2">
              {/* Axes */}
              <line x1="30" y1="130" x2="320" y2="130" stroke="#475569" strokeWidth="1.5" />
              <line x1="30" y1="130" x2="30" y2="20" stroke="#475569" strokeWidth="1.5" />
              <text x="310" y="145" fill="#94a3b8" fontSize="9">จำนวนชิ้น (Q)</text>
              <text x="10" y="16" fill="#94a3b8" fontSize="9">บาท (฿)</text>

              {/* Fixed Cost Line (horizontal) */}
              <line x1="30" y1="95" x2="320" y2="95" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.2" />
              <text x="35" y="90" fill="#94a3b8" fontSize="8">Fixed Cost ({fixedCost}฿)</text>

              {/* Total Cost Line (Orange) */}
              <line x1="30" y1="95" x2="300" y2="35" stroke="#f97316" strokeWidth="2.5" />

              {/* Revenue Line (Green) */}
              <line x1="30" y1="130" x2="300" y2="25" stroke="#10b981" strokeWidth="2.5" />

              {/* Break-even Intersection Point */}
              <circle cx="160" cy="65" r="5" fill="#c8ff00" stroke="#0f172a" strokeWidth="2" />
              <text x="168" y="62" fill="#c8ff00" fontSize="10" fontWeight="bold">จุดคุ้มทุน ({breakEvenUnits} ชิ้น)</text>
            </svg>

            <div className="flex justify-between items-center text-[11px] text-slate-300 mt-2 px-1">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> รายได้รวม</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span> ต้นทุนรวม</span>
              <span>กำไรส่วนเกิน: <b className="text-emerald-400">฿{marginPerUnit.toFixed(1)} / ชิ้น ({marginRatio.toFixed(0)}%)</b></span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            ปิด
          </button>
          <button
            onClick={handleSave}
            disabled={isLossPrice}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-md transition-colors"
          >
            บันทึกผล & ปลดล็อกสร้างสินค้า 🚀
          </button>
        </div>

      </div>
    </div>
  );
}

// ====================================================================
// 6.3 CREATE PRODUCT MODAL (Auto-Filled with Lesson Baseline Cost)
// ====================================================================
function CreateProductModal({ defaultCost = 19.44, onClose }) {
  const { addProduct } = useEdu();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('อาหาร & เบเกอรี่');
  const [cost, setCost] = useState(defaultCost || 18);
  const [price, setPrice] = useState(35);
  const [stock, setStock] = useState(20);
  const [emoji, setEmoji] = useState('🥪');
  const [pickupWindow, setPickupWindow] = useState('พักกลางวัน 12:15 - 12:45');
  const [description, setDescription] = useState('');

  const profit = price - cost;
  const isLoss = profit < 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || isLoss) return;

    addProduct({
      title,
      category,
      cost: Number(cost),
      price: Number(price),
      stock: Number(stock),
      emoji,
      pickupWindow,
      description: description || 'สินค้าคุณภาพทำสดใหม่จากนักเรียน'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-pop-in max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
              ✨
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">สร้างสินค้าใหม่ (ลงขายในตลาด)</h3>
              <p className="text-xs text-slate-500">ต้นทุนฐานถูกซิงก์จากบทเรียนที่ 1 อัตโนมัติ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Emoji & Title */}
          <div className="flex gap-3">
            <div className="w-16">
              <label className="text-xs font-bold text-slate-700 block mb-1">ไอคอน</label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className="w-full py-2 text-center text-2xl border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อสินค้า</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น แซนด์วิชทูน่า คอร์นสลัด"
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">หมวดหมู่</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs text-slate-800"
            >
              <option value="อาหาร & เบเกอรี่">อาหาร & เบเกอรี่</option>
              <option value="เครื่องดื่ม">เครื่องดื่ม</option>
              <option value="งานคราฟต์ & DIY">งานคราฟต์ & DIY</option>
              <option value="เครื่องเขียน & ชีทสรุป">เครื่องเขียน & ชีทสรุป</option>
              <option value="แฟชั่น & ของสะสม">แฟชั่น & ของสะสม</option>
            </select>
          </div>

          {/* Cost & Price with Profit Preview */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                ต้นทุนต่อชิ้น (฿)
                <span className="text-[10px] text-emerald-600 block">✨ Auto-Synced</span>
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                ราคาขายที่ตั้งไว้ (฿)
                <span className={`text-[10px] font-bold block ${isLoss ? 'text-coral-500' : 'text-emerald-600'}`}>
                  {isLoss ? '⚠️ ราคาขายต่ำกว่าทุน' : `กำไร ฿${profit.toFixed(1)} / ชิ้น`}
                </span>
              </label>
              <input
                type="number"
                step="1"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={`w-full px-3 py-1.5 border rounded-xl text-xs font-bold bg-white ${
                  isLoss ? 'border-coral-400 text-coral-600' : 'border-slate-200'
                }`}
              />
            </div>
          </div>

          {/* Stock & Pickup Window */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">จำนวนสต็อกที่พร้อมขาย</label>
              <input
                type="number"
                min="1"
                required
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">ช่วงเวลานัดรับของ</label>
              <select
                value={pickupWindow}
                onChange={(e) => setPickupWindow(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
              >
                <option value="พักกลางวัน 12:15 - 12:45">พักกลางวัน (12:15 - 12:45)</option>
                <option value="หลังเลิกเรียน 16:00 - 16:30">หลังเลิกเรียน (16:00 - 16:30)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">รายละเอียดสินค้าสั้น ๆ</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="จุดเด่นของสินค้า วัตถุดิบ ความอร่อย หรือความน่ารัก"
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isLoss || !title.trim()}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs shadow-md transition-colors"
            >
              เปิดขายในตลาดทันที 🚀
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

// ====================================================================
// 7. VIEW 3: TEACHER EDUCATOR (Telemetry & Classroom Analytics)
// ====================================================================
function TeacherEducatorView() {
  const { classes, selectedClassId, setSelectedClassId, telemetry, assignments, createAssignment } = useEdu();

  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];
  const classTelemetry = telemetry.filter(t => t.classId === selectedClassId);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedStudentLog, setSelectedStudentLog] = useState(null);

  // Overall Class Metrics
  const totalClassRevenue = classTelemetry.reduce((s, t) => s + t.totalRevenue, 0);
  const totalClassProfit = classTelemetry.reduce((s, t) => s + t.netProfit, 0);
  const avgStockAccuracy = Math.round(classTelemetry.reduce((s, t) => s + t.stockAccuracy, 0) / (classTelemetry.length || 1));

  const riskBadgeStyles = {
    'Aggressive Pricing': { bg: 'bg-coral-100 text-coral-800 border-coral-300', dot: 'bg-coral-500' },
    'Risk Averse': { bg: 'bg-amber-100 text-amber-800 border-amber-300', dot: 'bg-amber-500' },
    'Balanced Growth': { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', dot: 'bg-emerald-500' }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 w-full animate-fade-in">
      
      {/* Teacher Dashboard Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">👩🏻‍🏫</span>
            <h1 className="text-xl font-extrabold text-slate-900">แผงควบคุมคุณครู (Classroom Telemetry)</h1>
            <span className="bg-cyan-50 text-cyan-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-cyan-200">
              Class Code: {currentClass.code}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            ติดตามประวัติการตัดสินใจของนักเรียน วิเคราะห์ความเสี่ยง และมอบหมายงานธุรกิจ
          </p>
        </div>

        {/* Class Selector Dropdown & New Task Button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <button
            onClick={() => setShowTaskModal(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>➕</span>
            <span>มอบหมายภารกิจ</span>
          </button>
        </div>
      </div>

      {/* Classroom Telemetry KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 font-bold block uppercase">ร้านค้านักเรียนในห้อง</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{classTelemetry.length} ร้าน</span>
          <span className="text-[10px] text-emerald-600 font-medium">เปิดขายครบทุกกลุ่ม</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 font-bold block uppercase">ยอดขายรวมทั้งห้อง</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">฿{totalClassRevenue.toLocaleString()}</span>
          <span className="text-[10px] text-slate-500 font-medium">จากตลาดนัดในโรงเรียน</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 font-bold block uppercase">กำไรสุทธิรวม</span>
          <span className="text-2xl font-black text-brand-lime mt-1 block bg-slate-900 px-2 py-0.5 rounded-lg inline-block text-lg">
            ฿{totalClassProfit.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 font-medium block mt-1">หลังหักต้นทุนสินค้า</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 font-bold block uppercase">ความแม่นยำสต็อกเฉลี่ย</span>
          <span className="text-2xl font-black text-slate-800 mt-1 block">{avgStockAccuracy}%</span>
          <span className="text-[10px] text-slate-500 font-medium">อัตราผลิตตรงความต้องการ</span>
        </div>
      </div>

      {/* SECTION: Student Decision Telemetry Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              ประวัติการตัดสินใจและระดับความเสี่ยง (Decision Telemetry)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              ระบบบันทึกความถี่การปรับราคา ความแม่นยำในการคุมสต็อก และประเมินพฤติกรรมธุรกิจของนักเรียน
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">นักเรียน / ร้านค้า</th>
                <th className="py-3 px-4 text-center">การปรับราคา</th>
                <th className="py-3 px-4 text-center">ความแม่นยำสต็อก</th>
                <th className="py-3 px-4 text-center">สินค้าค้าง (Dead Stock)</th>
                <th className="py-3 px-4">Risk Profile (ความเสี่ยง)</th>
                <th className="py-3 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {classTelemetry.map(student => {
                const badge = riskBadgeStyles[student.riskProfile] || riskBadgeStyles['Balanced Growth'];
                return (
                  <tr key={student.studentId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{student.avatar}</span>
                        <div>
                          <div className="font-bold text-slate-900">{student.studentName}</div>
                          <div className="text-[11px] text-slate-500">{student.storeName}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full font-bold">
                        {student.priceAdjustments} ครั้ง
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-slate-900">{student.stockAccuracy}%</span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={student.deadStockCount > 2 ? 'text-coral-600 font-bold' : 'text-slate-600'}>
                        {student.deadStockCount} ชิ้น
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                        <span>{student.riskProfile}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudentLog(student)}
                        className="text-xs text-brand-600 hover:text-brand-700 font-bold hover:underline"
                      >
                        ดูประวัติ ➔
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION: Teacher Assignments List */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900">ภารกิจที่มอบหมายในห้องเรียน ({assignments.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map(a => (
            <div key={a.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900">{a.title}</span>
                <span className="text-[10px] text-slate-400">ครบกำหนด: {a.due}</span>
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                {a.description}
              </p>
              <div className="text-[11px] text-slate-500 flex justify-between items-center pt-2 border-t border-slate-200">
                <span>ส่งงานแล้ว {a.submissionsCount} / {a.totalStudents} คน</span>
                <span className="text-emerald-600 font-bold">เปิดรับการส่ง</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: Student Decision History Detail */}
      {selectedStudentLog && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-pop-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{selectedStudentLog.avatar}</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    ประวัติการตัดสินใจ: {selectedStudentLog.studentName}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedStudentLog.storeName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentLog(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-5 max-h-[300px] overflow-y-auto">
              {selectedStudentLog.adjustmentHistory.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex justify-between font-bold text-slate-900 mb-1">
                    <span>ปรับราคา: {item.oldPrice}฿ ➔ {item.newPrice}฿</span>
                    <span className="text-slate-400 font-normal">{item.date}</span>
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    <b>เหตุผลนักเรียน:</b> {item.reason}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedStudentLog(null)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Create New Assignment */}
      {showTaskModal && (
        <CreateAssignmentModal
          classId={selectedClassId}
          onClose={() => setShowTaskModal(false)}
        />
      )}

    </div>
  );
}

function CreateAssignmentModal({ classId, onClose }) {
  const { createAssignment } = useEdu();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('2026-11-30');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    createAssignment({ title, description, due, classId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-pop-in">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="text-sm font-bold text-slate-900">มอบหมายภารกิจธุรกิจใหม่</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อภารกิจ</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น ออกแบบโปรโมชั่นลดของเสียช่วงพักกลางวัน"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">รายละเอียดและสิ่งที่ต้องส่ง</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ให้นักเรียนคำนวณและอธิบายเหตุผลการตั้งราคาหรือโปรโมชั่น..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            ></textarea>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">กำหนดส่ง (Due Date)</label>
            <input
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
            >
              ยืนยันการมอบหมาย 📋
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ====================================================================
// 8. ROOT APPLICATION ENTRY COMPONENT
// ====================================================================
function App() {
  const { mode } = useEdu();

  return (
    <div className="min-h-full flex flex-col bg-slate-50">
      {/* Sticky Role Switcher Bar */}
      <TopRoleSwitcher />

      {/* Main Perspective Body */}
      <main className="flex-1 pb-16">
        {mode === 'buyer' && <StudentBuyerView />}
        {mode === 'seller' && <StudentSellerView />}
        {mode === 'teacher' && <TeacherEducatorView />}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <span className="w-5 h-5 rounded bg-brand-lime text-slate-950 flex items-center justify-center text-[10px] font-black">em</span>
            <span>EduMarket · โรงเรียนสาธิตสร้างสรรค์</span>
          </div>
          <p className="text-[11px]">
            High-Fidelity EdTech Prototype · Persistent State & Realtime Order Fulfillment
          </p>
        </div>
      </footer>
    </div>
  );
}

// Mount to DOM
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
