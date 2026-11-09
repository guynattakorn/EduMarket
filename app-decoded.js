var Gu = "edu-marketplace-classroom-v2",
  Ea = [
    {
      id: "cost",
      title: "ต้นทุน & จุดคุ้มทุน",
      subtitle: "ตั้งราคาให้เข้าใจ ไม่ใช่แค่เดา",
      icon: "🪙",
      color: "lime",
    },
    {
      id: "demand",
      title: "เข้าใจความต้องการตลาด",
      subtitle: "รู้ใจคนซื้อ ก่อนเริ่มลงมือขาย",
      icon: "📈",
      color: "peach",
    },
    {
      id: "stock",
      title: "สต็อกอย่างชาญฉลาด",
      subtitle: "มีของพอดี เงินทุนไม่จม",
      icon: "📦",
      color: "lavender",
    },
  ],
  vl = ["โรงอาหารกลาง", "ศาลาหน้าเสาธง", "หน้าห้องพักครู", "ใต้ตึกเรียน 3"],
  ls = ["10:30", "12:00", "16:00"],
  Nt = (t) =>
    new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(t),
  St = (t) =>
    `${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
  ct = () => new Date().toISOString(),
  Pt = (t) =>
    new Date(t).toLocaleDateString("th-TH", { day: "numeric", month: "short" });
function Mn() {
  let t = [
      {
        id: "student1",
        name: "มินต์",
        role: "student",
        avatar: "👩🏻",
        classId: "c1",
      },
      {
        id: "student2",
        name: "ปัน",
        role: "student",
        avatar: "👦🏻",
        classId: "c1",
      },
      {
        id: "student3",
        name: "ฟ้า",
        role: "student",
        avatar: "👩🏽",
        classId: "c1",
      },
      {
        id: "student4",
        name: "ต้น",
        role: "student",
        avatar: "👨🏻",
        classId: "c2",
      },
      { id: "teacher1", name: "ครูพลอย", role: "teacher", avatar: "👩🏻‍🏫" },
      { id: "teacher2", name: "ครูนนท์", role: "teacher", avatar: "👨🏻‍🏫" },
      { id: "admin1", name: "ผู้ดูแลระบบ", role: "admin", avatar: "🧑🏻‍💻" },
    ],
    e = [
      {
        id: "s1",
        name: "มินต์กับเพื่อน",
        tagline: "ของอร่อย ของน่ารัก จากพวกเรา ม.4/1",
        members: ["student1", "student2"],
        classId: "c1",
        emoji: "🥑",
        color: "lime",
      },
      {
        id: "s2",
        name: "ฟ้าทำเอง",
        tagline: "งานแฮนด์เมดเล็ก ๆ ที่ตั้งใจทำ",
        members: ["student3"],
        classId: "c1",
        emoji: "🌸",
        color: "lavender",
      },
      {
        id: "s3",
        name: "ชมรมวันดีดี",
        tagline: "เติมความสดใสให้ทุกวันเรียน",
        members: ["student4"],
        classId: "c2",
        emoji: "🍊",
        color: "peach",
      },
    ],
    a = [
      {
        id: "p1",
        shopId: "s1",
        name: "แซนด์วิชไข่ อิ่มก่อนเรียน",
        price: 35,
        cost: 22,
        stock: 12,
        category: "อาหาร & เครื่องดื่ม",
        emoji: "🥪",
        color: "lime",
        description:
          "ขนมปังนุ่ม ไข่ต้มเต็มคำ ทำสดตอนเช้า • มีไข่ นม และแป้งสาลี",
        views: 124,
        wishBase: 18,
        wishedBy: [],
        preorder: !1,
      },
      {
        id: "p2",
        shopId: "s2",
        name: "กำไลลูกปัด สีของเธอ",
        price: 49,
        cost: 24,
        stock: 8,
        category: "แฮนด์เมด",
        emoji: "📿",
        color: "lavender",
        description: "กำไลลูกปัดทำมือ เลือกโทนสีได้ ทักมาคุยกันได้เลย",
        views: 86,
        wishBase: 24,
        wishedBy: [],
        preorder: !0,
      },
      {
        id: "p3",
        shopId: "s1",
        name: "สมุดโน้ต ไอเดียเล็ก ๆ",
        price: 29,
        cost: 18,
        stock: 3,
        category: "เครื่องเขียน",
        emoji: "📒",
        color: "pink",
        description: "สมุดพกขนาด A6 กระดาษถนอมสายตา สำหรับไอเดียใหม่ของทุกวัน",
        views: 65,
        wishBase: 9,
        wishedBy: [],
        preorder: !1,
      },
      {
        id: "p4",
        shopId: "s3",
        name: "ส้มสดใส น้ำส้มคั้น",
        price: 25,
        cost: 17,
        stock: 15,
        category: "อาหาร & เครื่องดื่ม",
        emoji: "🍊",
        color: "peach",
        description:
          "น้ำส้มคั้นสดขวดเล็ก แช่เย็นพร้อมดื่ม รับที่โรงอาหารช่วงพัก",
        views: 152,
        wishBase: 21,
        wishedBy: ["student1"],
        preorder: !1,
      },
      {
        id: "p5",
        shopId: "s2",
        name: "สติกเกอร์ วันเรียนแสนดี",
        price: 20,
        cost: 9,
        stock: 20,
        category: "เครื่องเขียน",
        emoji: "🌼",
        color: "yellow",
        description: "สติกเกอร์วาดเอง 1 ชุด 8 ชิ้น แต่งสมุดให้น่าเปิดทุกวัน",
        views: 74,
        wishBase: 12,
        wishedBy: [],
        preorder: !1,
      },
      {
        id: "p6",
        shopId: "s3",
        name: "บราวนี ช็อกเต็มคำ",
        price: 30,
        cost: 34,
        stock: 6,
        category: "อาหาร & เครื่องดื่ม",
        emoji: "🍫",
        color: "sky",
        description:
          "ช็อกโกแลตเข้มข้น อบสด รับจองสำหรับวันพรุ่งนี้ • มีไข่ นม แป้งสาลี",
        views: 98,
        wishBase: 15,
        wishedBy: [],
        preorder: !0,
      },
    ];
  a.forEach(
    (i) => (i.createdAt = new Date(Date.now() - 20 * 864e5).toISOString()),
  );
  let l = [];
  a.forEach((i, c) => {
    for (let u = 0; u < 5; u++)
      l.push({
        id: `seed-o-${c}-${u}`,
        buyer: "student2",
        shopId: i.shopId,
        items: [
          {
            productId: i.id,
            name: i.name,
            price: i.price,
            cost: i.cost,
            qty: 1 + ((c + u) % 3),
          },
        ],
        status: u === 4 ? "awaiting" : "delivered",
        pickup: vl[c % 4],
        time: ls[u % 3],
        date: new Date(
          Date.now() - ((c === 1 ? 18 : 5) - u) * 864e5,
        ).toISOString(),
        demo: !0,
      });
  });
  let n = a.flatMap((i, c) => [
    {
      id: `r${c}a`,
      productId: i.id,
      userId: "student2",
      rating: c === 5 ? 3 : 5,
      text:
        c === 5
          ? "รสชาติดี แต่อยากให้นัดรับตรงเวลาขึ้นค่ะ"
          : "น่ารักมาก รับของสะดวก ไว้มาอุดหนุนอีกนะ",
      date: ct(),
    },
    {
      id: `r${c}b`,
      productId: i.id,
      userId: "student3",
      rating: 4,
      text: "ของตรงปก ร้านตอบเร็วค่ะ",
      date: ct(),
    },
  ]);
  return {
    schema: 2,
    users: t,
    classes: [
      {
        id: "c1",
        name: "ผู้ประกอบการรุ่นจิ๋ว \xB7 ม.4/1",
        code: "BIZ401",
        teacherId: "teacher1",
      },
      {
        id: "c2",
        name: "ธุรกิจสร้างสรรค์ \xB7 ม.4/2",
        code: "BIZ402",
        teacherId: "teacher2",
      },
    ],
    shops: e,
    products: a,
    orders: l,
    reviews: n,
    progress: {
      student1: [],
      student2: ["cost"],
      student3: ["cost", "demand"],
      student4: ["cost"],
    },
    assignments: [
      {
        id: "a1",
        classId: "c1",
        teacherId: "teacher1",
        title: "ตั้งราคาสินค้าชิ้นแรกของเรา",
        body: "เลือกสินค้า 1 ชิ้น แยกต้นทุนคงที่และต้นทุนผันแปร แล้วอธิบายเหตุผลในการตั้งราคา พร้อมคำนวณจำนวนที่ต้องขายให้คุ้มทุน",
        due: "2026-10-12",
      },
    ],
    submissions: [],
    contents: [
      {
        id: "ct1",
        classId: "c1",
        title: "คิดแบบผู้ประกอบการ",
        category: "แนวคิดธุรกิจ",
        body: "เริ่มจากปัญหาเล็ก ๆ รอบตัว สังเกตว่าเพื่อนต้องการอะไร แล้วทดลองทำในจำนวนน้อยก่อน การทดลองแต่ละครั้งควรมีคำถามและสิ่งที่อยากเรียนรู้",
      },
      {
        id: "ct2",
        classId: "c1",
        title: "การตลาดที่เริ่มจากการฟัง",
        category: "การตลาด",
        body: "ลองถามเพื่อน 5 คนว่าอยากได้สินค้าประเภทไหนและยินดีจ่ายเท่าไร บันทึกคำตอบ แล้วเปรียบเทียบกับยอดขายจริง ความสนใจยังไม่เท่ากับการซื้อ",
      },
      {
        id: "ct3",
        classId: "c1",
        title: "โปสเตอร์หนึ่งใบต้องมีอะไร",
        category: "ภาพ & โปสเตอร์",
        body: "ใช้ภาพสินค้าที่ชัดเจน บอกชื่อ จุดเด่น ราคา และจุดนัดรับ อ่านง่ายบนหน้าจอเล็ก หลีกเลี่ยงการอ้างผลเกินจริง",
      },
      {
        id: "ct4",
        classId: "c1",
        title: "หยุดคิด แล้วลองใหม่",
        category: "วิเคราะห์ & สะท้อนผล",
        body: "หลังขายแต่ละครั้ง เขียนสิ่งที่คาดการณ์ ผลที่เกิดขึ้น และสิ่งที่จะเปลี่ยนในครั้งหน้า อย่าดูแค่ยอดขาย ให้ดูต้นทุน สินค้าเหลือ และความคิดเห็นของลูกค้าด้วย",
      },
    ],
    logs: [
      {
        id: "l1",
        shopId: "s1",
        productId: "p1",
        date: new Date(Date.now() - 864e5).toISOString(),
        type: "ราคา",
        before: 30,
        after: 35,
        reason: "เพิ่มไส้ไข่และคำนวณค่าบรรจุภัณฑ์แล้ว",
        actor: "student1",
      },
      {
        id: "l2",
        shopId: "s1",
        productId: "p3",
        date: ct(),
        type: "สต็อก",
        before: 10,
        after: 3,
        reason: "ขายในช่วงพักกลางวัน 7 เล่ม",
        actor: "student1",
      },
    ],
    notifications: [
      {
        id: "n1",
        to: "student1",
        title: "ครูพลอยมอบหมายงานใหม่",
        text: "ตั้งราคาสินค้าชิ้นแรกของเรา \xB7 ส่งภายใน 12 ต.ค.",
        type: "teacher",
        date: ct(),
        read: !1,
      },
      {
        id: "n2",
        to: "student1",
        title: "เริ่มต้นเล็ก ๆ เรียนรู้ได้ทุกวัน",
        text: "เลือกเรียนบทไหนก็ได้ แล้วนำไปลองใช้กับร้านของเรา",
        type: "lesson",
        date: ct(),
        read: !1,
      },
    ],
    messages: [
      {
        id: "m1",
        from: "student3",
        to: "student1",
        text: "รับแซนด์วิชที่โรงอาหารช่วง 12:00 ได้ไหมคะ?",
        date: ct(),
      },
    ],
    feedback: [],
  };
}
var bl = (t) => t.wishBase + t.wishedBy.length;
function Xu(t, e) {
  let a = t.reviews.filter((l) => l.productId === e);
  return a.length ? a.reduce((l, n) => l + n.rating, 0) / a.length : 0;
}
function na(t, e) {
  let a = t.orders
      .filter((d) => d.shopId === e && d.status === "delivered")
      .flatMap((d) => d.items),
    l = a.reduce((d, g) => d + g.price * g.qty, 0),
    n = a.filter((d) => d.cost !== null && d.cost !== void 0),
    i = n.reduce((d, g) => d + g.cost * g.qty, 0),
    c = n.reduce((d, g) => d + (g.price - g.cost) * g.qty, 0),
    u = t.products.filter((d) => d.shopId === e),
    o = t.reviews.filter((d) => u.some((g) => g.id === d.productId));
  return {
    revenue: l,
    cost: i,
    profit: c,
    unknownCost: a.length !== n.length,
    sold: a.reduce((d, g) => d + g.qty, 0),
    views: u.reduce((d, g) => d + g.views, 0),
    wishes: u.reduce((d, g) => d + bl(g), 0),
    rating: o.length ? o.reduce((d, g) => d + g.rating, 0) / o.length : 0,
  };
}
var Qu = (t, e, a = 100, l = 20) => ({
  profit: (t - l) * e - a,
  revenue: t * e,
  cost: a + l * e,
  unit: l + a / e,
  breakeven: t > l ? Math.ceil(a / (t - l)) : null,
});
function Up(t, e) {
  let a = structuredClone(t),
    l = (c, u, o, d = "teacher") =>
      a.notifications.unshift({
        id: St("n"),
        to: c,
        title: u,
        text: o,
        type: d,
        date: ct(),
        read: !1,
      }),
    n = (c) => a.users.filter((u) => u.role === "student" && u.classId === c),
    i = (c) => {
      let u = a.shops.find((o) => o.id === c);
      return a.classes.find((o) => o.id === u?.classId)?.teacherId;
    };
  switch (e.type) {
    case "WISH": {
      let c = a.products.find((u) => u.id === e.id);
      if (!c) return t;
      c.wishedBy = c.wishedBy.includes(e.user)
        ? c.wishedBy.filter((u) => u !== e.user)
        : [...c.wishedBy, e.user];
      break;
    }
    case "VIEW": {
      let c = a.products.find((u) => u.id === e.id);
      c && c.views++;
      break;
    }
    case "COMPLETE":
      a.progress[e.user] = [
        ...new Set([...(a.progress[e.user] || []), e.module]),
      ];
      break;
    case "GRANT":
      ((a.progress[e.user] = Ea.map((c) => c.id)),
        l(
          e.user,
          "ได้รับเหรียญครบ 3 บทเรียน",
          "ผู้ดูแลมอบเหรียญสำหรับการสาธิตระบบ",
          "lesson",
        ));
      break;
    case "CONTENT":
      (a.contents.unshift(e.item),
        n(e.item.classId).forEach((c) =>
          l(c.id, "ครูเพิ่มบทเรียนใหม่", e.item.title),
        ));
      break;
    case "ASSIGN":
      (a.assignments.unshift(e.item),
        n(e.item.classId).forEach((c) =>
          l(c.id, "มีภารกิจใหม่จากครู", e.item.title),
        ));
      break;
    case "SUBMIT": {
      let c = a.assignments.find((u) => u.id === e.item.assignmentId);
      if (!c) return t;
      ((a.submissions = a.submissions.filter(
        (u) =>
          !(
            u.assignmentId === e.item.assignmentId && u.userId === e.item.userId
          ),
      )),
        a.submissions.push(e.item),
        l(
          c.teacherId,
          "นักเรียนส่งงานแล้ว",
          `${a.users.find((u) => u.id === e.item.userId)?.name} \xB7 ${c.title}`,
          "submission",
        ));
      break;
    }
    case "GRADE": {
      let c = a.submissions.find((u) => u.id === e.id);
      if (!c) return t;
      ((c.score = e.score),
        (c.feedback = e.feedback),
        l(
          c.userId,
          "ครูตรวจงานของเราแล้ว",
          `${e.score}/100 คะแนน \xB7 ${e.feedback}`,
        ));
      break;
    }
    case "FEEDBACK":
      (a.feedback.unshift(e.item),
        a.shops
          .find((c) => c.id === e.item.shopId)
          ?.members.forEach((c) =>
            l(
              c,
              "ข้อเสนอแนะสำหรับร้านของเรา",
              `${e.item.score}/100 \xB7 ${e.item.text}`,
            ),
          ));
      break;
    case "PRODUCT": {
      let c = a.products.find((u) => u.id === e.item.id);
      if (c) {
        for (let [u, o] of [
          ["price", "ราคา"],
          ["stock", "สต็อก"],
        ])
          c[u] !== e.item[u] &&
            a.logs.unshift({
              id: St("log"),
              shopId: c.shopId,
              productId: c.id,
              type: o,
              before: c[u],
              after: e.item[u],
              reason: e.reason || "ปรับแผนการขาย",
              actor: e.user,
              date: ct(),
            });
        Object.assign(c, e.item);
      } else
        (a.products.unshift({ ...e.item, views: 0, wishBase: 0, wishedBy: [] }),
          a.logs.unshift({
            id: St("log"),
            shopId: e.item.shopId,
            productId: e.item.id,
            type: "เปิดขาย",
            before: 0,
            after: e.item.stock,
            reason: "เริ่มขายสินค้าใหม่",
            actor: e.user,
            date: ct(),
          }));
      break;
    }
    case "SHOP": {
      let c = a.shops.find((u) => u.id === e.item.id);
      c ? Object.assign(c, e.item) : a.shops.push(e.item);
      break;
    }
    case "ORDER": {
      if (!e.cart.length || !vl.includes(e.pickup) || !ls.includes(e.time))
        return t;
      let c = new Map();
      for (let o of e.cart) {
        if (!Number.isInteger(o.qty) || o.qty < 1) return t;
        c.set(o.productId, (c.get(o.productId) || 0) + o.qty);
      }
      for (let [o, d] of c) {
        let g = a.products.find((h) => h.id === o);
        if (
          !g ||
          g.stock < d ||
          a.shops.find((h) => h.id === g.shopId)?.members.includes(e.user)
        )
          return t;
      }
      let u = {};
      for (let [o, d] of c) {
        let g = a.products.find((h) => h.id === o);
        ((g.stock -= d),
          (u[g.shopId] ??= []).push({
            productId: g.id,
            name: g.name,
            price: g.price,
            cost: g.cost ?? null,
            qty: d,
          }));
      }
      for (let [o, d] of Object.entries(u))
        (a.orders.unshift({
          id: St("order"),
          buyer: e.user,
          shopId: o,
          items: d,
          status: "awaiting",
          pickup: e.pickup,
          time: e.time,
          date: ct(),
        }),
          a.shops
            .find((g) => g.id === o)
            ?.members.forEach((g) =>
              l(
                g,
                "มีคำสั่งซื้อใหม่",
                `${e.pickup} \xB7 ${e.time} น.`,
                "order",
              ),
            ));
      break;
    }
    case "DELIVER": {
      let c = a.orders.find((u) => u.id === e.id);
      c &&
        ((c.status = "delivered"),
        l(
          c.buyer,
          "ร้านค้าส่งมอบสินค้าแล้ว",
          "ขอบคุณที่อุดหนุน แวะให้รีวิวได้เลย",
          "order",
        ));
      break;
    }
    case "REVIEW": {
      let c = a.reviews.find(
        (o) => o.productId === e.item.productId && o.userId === e.item.userId,
      );
      c ? Object.assign(c, e.item) : a.reviews.unshift(e.item);
      let u = a.products.find((o) => o.id === e.item.productId);
      a.shops
        .find((o) => o.id === u?.shopId)
        ?.members.forEach((o) =>
          l(
            o,
            "มีรีวิวใหม่ให้ร้านของเรา",
            `${e.item.rating} ดาว \xB7 ${e.item.text}`,
            "review",
          ),
        );
      break;
    }
    case "MESSAGE":
      (a.messages.push(e.item),
        l(e.item.to, "ได้รับข้อความใหม่", e.item.text, "message"));
      break;
    case "READ":
      a.notifications
        .filter((c) => c.to === e.user)
        .forEach((c) => (c.read = !0));
      break;
    case "CLASS": {
      let c = a.classes.find((u) => u.id === e.item.id);
      c ? Object.assign(c, e.item) : a.classes.push(e.item);
      break;
    }
    case "JOIN": {
      let c = e.code.trim().split("join=").pop().split("&")[0].toUpperCase(),
        u = a.classes.find((d) => d.code === c),
        o = a.users.find((d) => d.id === e.user);
      if (!u || !o) return t;
      ((o.classId = u.id),
        a.shops
          .filter((d) => d.members.includes(o.id) && d.members.length === 1)
          .forEach((d) => (d.classId = u.id)),
        l(o.id, "เข้าร่วมห้องเรียนแล้ว", u.name));
      break;
    }
    case "USER": {
      let c = a.users.find((u) => u.id === e.item.id);
      c
        ? Object.assign(c, e.item)
        : (a.users.push(e.item), (a.progress[e.item.id] = []));
      break;
    }
    case "DELETE_USER": {
      if (e.id === "admin1" || a.classes.some((u) => u.teacherId === e.id))
        return t;
      ((a.users = a.users.filter((u) => u.id !== e.id)),
        a.shops.forEach(
          (u) => (u.members = u.members.filter((o) => o !== e.id)),
        ),
        delete a.progress[e.id]);
      break;
    }
    case "DELETE_CLASS":
      ((a.classes = a.classes.filter((c) => c.id !== e.id)),
        a.users.forEach((c) => {
          c.classId === e.id && (c.classId = null);
        }),
        a.shops.forEach((c) => {
          c.classId === e.id && (c.classId = null);
        }));
      break;
    case "MOCK": {
      let c = a.products.find((u) => u.id === e.productId);
      if (!c || c.stock < 1) return t;
      (c.stock--,
        a.orders.unshift({
          id: St("demo"),
          buyer: "student2",
          shopId: c.shopId,
          items: [
            {
              productId: c.id,
              name: c.name,
              price: c.price,
              cost: c.cost ?? null,
              qty: 1,
            },
          ],
          status: "delivered",
          pickup: vl[0],
          time: "12:00",
          date: ct(),
          demo: !0,
        }),
        a.reviews.unshift({
          id: St("r"),
          productId: c.id,
          userId: "student2",
          rating: 5,
          text: "[ข้อมูลทดลอง] สินค้าดี นัดรับสะดวก",
          date: ct(),
        }));
      break;
    }
    default:
      return t;
  }
  return a;
}
var s = An(Zu(), 1),
  Yp = (0, T.createContext)(),
  Q = () => (0, T.useContext)(Yp),
  Bp = {
    market: "M3 7h18l-2 7H6L3 3H1 M7 20h.01M17 20h.01",
    learn: "M4 4h7l1 2 1-2h7v15h-7l-1 2-1-2H4z M12 6v15",
    bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
    shop: "M3 10v11h18V10M2 10l2-7h16l2 7M2 10c2 3 4 3 5 0 1 3 4 3 5 0 1 3 4 3 5 0 1 3 4 3 5 0M9 21v-7h6v7",
    chart: "M4 3v18h18M8 17v-5M13 17V8M18 17V4",
    search: "m21 21-6-6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
    arrow: "M5 12h14m-5-5 5 5-5 5",
    heart: "M20 4c-3-3-6-1-8 1-2-2-5-4-8-1-6 6 8 16 8 16S26 10 20 4",
    plus: "M12 5v14M5 12h14",
    logout: "M9 4H3v16h6M9 12h13m-5-5 5 5-5 5",
    close: "m6 6 12 12M6 18 18 6",
    check: "m5 12 4 4L20 5",
    users:
      "M16 21v-2c0-4-12-4-12 0v2M10 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8M17 4c5 0 5 8 0 8M19 15c4 0 4 4 4 6",
    chat: "M21 3H3v14h4v4l5-4h9z",
    back: "M19 12H5m7-7-7 7 7 7",
    star: "m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z",
    bag: "M4 7h16l1 14H3zM8 8V6a4 4 0 0 1 8 0v2",
  };
function _t({ name: t, size: e = 20 }) {
  return (0, s.jsx)("svg", {
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: (0, s.jsx)("path", { d: Bp[t] || Bp.star }),
  });
}
function A({ children: t, variant: e = "", icon: a, ...l }) {
  return (0, s.jsxs)("button", {
    className: "btn " + e,
    ...l,
    children: [a && (0, s.jsx)(_t, { name: a }), " ", t],
  });
}
function dt({ children: t, color: e = "" }) {
  return (0, s.jsx)("span", { className: "chip " + e, children: t });
}
function Xt({ children: t }) {
  return (0, s.jsxs)("div", {
    className: "empty",
    children: [
      (0, s.jsx)("span", { children: "✦" }),
      (0, s.jsx)("p", { children: t }),
    ],
  });
}
function pe({ eyebrow: t, title: e, children: a }) {
  return (0, s.jsxs)("div", {
    className: "section-title",
    children: [
      (0, s.jsxs)("div", {
        children: [
          t && (0, s.jsx)("div", { className: "eyebrow", children: t }),
          (0, s.jsx)("h2", { children: e }),
        ],
      }),
      a,
    ],
  });
}
function P({ label: t, value: e, icon: a, color: l = "" }) {
  return (0, s.jsxs)("div", {
    className: "stat " + l,
    children: [
      (0, s.jsx)("span", { className: "stat-icon", children: a }),
      (0, s.jsx)("span", { children: t }),
      (0, s.jsx)("strong", { children: e }),
    ],
  });
}
function U({ label: t, children: e }) {
  return (0, s.jsxs)("label", {
    className: "field",
    children: [(0, s.jsx)("span", { children: t }), e],
  });
}
function Xh({ title: t, children: e, onClose: a, wide: l = !1 }) {
  let n = (0, T.useRef)();
  return (
    (0, T.useEffect)(() => {
      let i = document.activeElement,
        c = n.current;
      return (
        c?.showModal?.(),
        c?.querySelector("input,button,select,textarea")?.focus(),
        () => {
          i?.focus?.();
        }
      );
    }, []),
    (0, s.jsxs)("dialog", {
      ref: n,
      open: typeof HTMLDialogElement > "u",
      className: "modal " + (l ? "wide" : ""),
      onCancel: (i) => {
        (i.preventDefault(), a());
      },
      onClick: (i) => {
        i.target === i.currentTarget && a();
      },
      children: [
        (0, s.jsxs)("div", {
          className: "modal-head",
          children: [
            (0, s.jsx)("h2", { children: t }),
            (0, s.jsx)("button", {
              className: "icon-btn",
              "aria-label": "ปิดหน้าต่าง",
              onClick: a,
              children: (0, s.jsx)(_t, { name: "close" }),
            }),
          ],
        }),
        (0, s.jsx)("div", { className: "modal-body", children: e }),
      ],
    })
  );
}
function Qh(t) {
  if (!t.visualVersion) return t;
  let e = Mn();
  for (let l of t.users) {
    let n = e.users.find((i) => i.id === l.id);
    n &&
      ["student1", "student2", "student3", "student4"].includes(l.id) &&
      Object.assign(l, { name: n.name, classId: n.classId });
  }
  for (let l of t.shops) {
    let n = e.shops.find((i) => i.id === l.id);
    n &&
      (Object.assign(l, {
        name: n.name,
        members: n.members,
        classId: n.classId,
      }),
      delete l.photo);
  }
  for (let l of t.products) {
    let n = e.products.find((i) => i.id === l.id);
    if (n) for (let i of ["name", "description", "category"]) l[i] = n[i];
    l.image?.startsWith("/assets/photos/") && delete l.image;
  }
  let a = t.orders.find((l) => l.id === "demo-visual-pickup");
  if (a?.status === "awaiting")
    for (let l of a.items) {
      let n = t.products.find((i) => i.id === l.productId);
      n && (n.stock += l.qty);
    }
  t.orders = t.orders.filter((l) => l.id !== "demo-visual-pickup");
  for (let l of t.orders)
    if (l.demo)
      for (let n of l.items) {
        let i = e.products.find((c) => c.id === n.productId);
        i && (n.name = i.name);
      }
  return (delete t.visualVersion, t);
}
function Zh() {
  let [t, e] = (0, T.useReducer)(Up, null, () => {
      try {
        let N = JSON.parse(localStorage.getItem(Gu));
        return N?.schema === 2 ? Qh(N) : Mn();
      } catch {
        return Mn();
      }
    }),
    [a, l] = (0, T.useState)(null),
    [n, i] = (0, T.useState)("admin"),
    [c, u] = (0, T.useState)("market"),
    [o, d] = (0, T.useState)(null),
    [g, h] = (0, T.useState)(""),
    [p, r] = (0, T.useState)([]),
    [v, b] = (0, T.useState)(null);
  ((0, T.useEffect)(() => {
    try {
      localStorage.setItem(Gu, JSON.stringify(t));
    } catch {
      h(
        "พื้นที่จัดเก็บเต็ม ข้อมูลล่าสุดยังไม่ถูกบันทึก ลองใช้ไฟล์แนบขนาดเล็กลง",
      );
    }
  }, [t]),
    (0, T.useEffect)(() => {
      if (!g) return;
      let N = setTimeout(() => h(""), 4200);
      return () => clearTimeout(N);
    }, [g]));
  let z = a?.role === "admin" ? n : a?.role,
    m =
      (a?.role === "admin" && n !== "admin"
        ? t.users.find(
            (N) => N.id === (n === "student" ? "student1" : "teacher1"),
          ) || t.users.find((N) => N.role === n)
        : t.users.find((N) => N.id === a?.id)) || a,
    x = {
      data: t,
      dispatch: e,
      user: m,
      role: z,
      tab: c,
      setTab: u,
      modal: o,
      setModal: d,
      toast: h,
      cart: p,
      setCart: r,
      lesson: v,
      setLesson: b,
    },
    y = (N) => {
      if (!["student", "teacher", "admin"].includes(N)) return;
      let Z =
          N === "teacher" ? "teacher1" : N === "admin" ? "admin1" : "student1",
        M = t.users.find((nt) => nt.id === Z) ||
          t.users.find((nt) => nt.role === N) || {
            ...Mn().users.find((nt) => nt.id === Z),
            classId: (N === "student" && t.classes[0]?.id) || null,
          };
      (t.users.some((nt) => nt.id === M.id) || e({ type: "USER", item: M }),
        l(M),
        i("admin"),
        u(N === "teacher" ? "classroom" : "market"),
        r([]),
        N === "student" &&
          new URLSearchParams(location.search).has("join") &&
          d({ type: "join" }));
    },
    E = () => {
      (l(null), d(null), b(null), r([]), u("market"));
    },
    O =
      z === "student"
        ? [
            ["market", "ตลาดนัด", "market"],
            ["lessons", "บทเรียน", "learn"],
            ["messages", "แจ้งเตือน", "bell"],
            ["shop", "ร้านของฉัน", "shop"],
          ]
        : [
            ["market", "ตลาดนัด", "market"],
            ["classroom", "ห้องเรียน", "learn"],
            ["messages", "แจ้งเตือน", "bell"],
            ["analytics", "ร้านนักเรียน", "chart"],
          ],
    w = t.notifications.filter((N) => N.to === m?.id && !N.read).length;
  return (0, s.jsxs)(Yp.Provider, {
    value: x,
    children: [
      a
        ? (0, s.jsxs)("div", {
            className: "app-shell",
            children: [
              (0, s.jsxs)("header", {
                className: "topbar",
                children: [
                  (0, s.jsxs)("a", {
                    href: "#",
                    className: "brand",
                    onClick: (N) => {
                      (N.preventDefault(), u("market"));
                    },
                    children: [
                      (0, s.jsxs)("span", {
                        className: "brand-mark",
                        children: ["e", (0, s.jsx)("span", { children: "m" })],
                      }),
                      (0, s.jsxs)("span", {
                        children: [
                          "edu",
                          (0, s.jsx)("span", {
                            className: "brand-thin",
                            children: "market",
                          }),
                          (0, s.jsx)("small", {
                            children: "โรงเรียนสาธิตสร้างสรรค์",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsxs)("div", {
                    className: "account-area",
                    children: [
                      (0, s.jsxs)("div", {
                        className: "account-name",
                        children: [
                          (0, s.jsx)("strong", { children: m?.name }),
                          (0, s.jsx)("small", {
                            children:
                              z === "teacher"
                                ? "พื้นที่ของคุณครู"
                                : z === "admin"
                                  ? "ผู้ดูแลระบบ"
                                  : `${(t.progress[m?.id] || []).length * 100} XP \xB7 นักธุรกิจฝึกหัด`,
                          }),
                        ],
                      }),
                      (0, s.jsx)("span", {
                        className: "avatar",
                        children: m?.avatar,
                      }),
                      (0, s.jsx)("button", {
                        className: "icon-btn logout",
                        onClick: E,
                        "aria-label": "ออกจากระบบ",
                        title: "ออกจากระบบ",
                        children: (0, s.jsx)(_t, { name: "logout" }),
                      }),
                    ],
                  }),
                ],
              }),
              a.role === "admin" &&
                (0, s.jsxs)("div", {
                  className: "admin-switch",
                  children: [
                    (0, s.jsx)("strong", { children: "ผู้ดูแลระบบ" }),
                    (0, s.jsx)("div", {
                      className: "segmented",
                      children: [
                        ["admin", "จัดการระบบ"],
                        ["student", "มุมมองนักเรียน"],
                        ["teacher", "มุมมองครู"],
                      ].map(([N, Z]) =>
                        (0, s.jsx)(
                          "button",
                          {
                            className: n === N ? "selected" : "",
                            onClick: () => {
                              (i(N),
                                u(N === "teacher" ? "classroom" : "market"),
                                d(null),
                                b(null),
                                r([]));
                            },
                            children: Z,
                          },
                          N,
                        ),
                      ),
                    }),
                    n !== "admin" &&
                      (0, s.jsxs)("small", {
                        children: ["กำลังทดสอบด้วยบัญชี ", m?.id],
                      }),
                  ],
                }),
              z !== "admin" &&
                (0, s.jsx)("nav", {
                  className: "main-nav",
                  "aria-label": "เมนูหลัก",
                  children: O.map(([N, Z, M]) =>
                    (0, s.jsxs)(
                      "button",
                      {
                        className: c === N ? "active" : "",
                        onClick: () => {
                          (u(N), b(null));
                        },
                        children: [
                          (0, s.jsx)(_t, { name: M }),
                          (0, s.jsx)("span", { children: Z }),
                          N === "messages" &&
                            w > 0 &&
                            (0, s.jsx)("b", {
                              className: "nav-count",
                              children: w,
                            }),
                        ],
                      },
                      N,
                    ),
                  ),
                }),
              (0, s.jsx)("main", {
                children:
                  z === "admin"
                    ? (0, s.jsx)(n1, {})
                    : c === "market"
                      ? (0, s.jsx)(Lh, {})
                      : c === "lessons"
                        ? v
                          ? (0, s.jsx)(Fh, { moduleId: v })
                          : (0, s.jsx)(Wh, {})
                        : c === "classroom"
                          ? (0, s.jsx)(Ih, {})
                          : c === "shop"
                            ? (0, s.jsx)(Ph, {})
                            : c === "analytics"
                              ? (0, s.jsx)(t1, {})
                              : (0, s.jsx)(a1, {}),
              }),
              (0, s.jsxs)("footer", {
                className: "app-footer",
                children: [
                  (0, s.jsx)("span", {
                    children: "✦ เรียนทีละนิด ลองให้เต็มที่",
                  }),
                  (0, s.jsx)("span", {
                    children:
                      "ต้นแบบเพื่อการเรียนรู้ \xB7 ข้อมูลทดลองบันทึกในอุปกรณ์นี้",
                  }),
                ],
              }),
            ],
          })
        : (0, s.jsx)(Vh, { onLogin: y }),
      g &&
        (0, s.jsxs)("div", {
          className: "toast",
          role: "status",
          children: [(0, s.jsx)(_t, { name: "check" }), g],
        }),
      o && a && (0, s.jsx)(m1, { modal: o }),
    ],
  });
}
function Vh({ onLogin: t }) {
  let [e, a] = (0, T.useState)(null),
    [l, n] = (0, T.useState)(""),
    [i, c] = (0, T.useState)("");
  return (0, s.jsxs)("div", {
    className: "login-wrap",
    children: [
      (0, s.jsxs)("div", {
        className: "login-card",
        children: [
          (0, s.jsxs)("section", {
            className: "login-art",
            children: [
              (0, s.jsxs)("a", {
                className: "brand",
                href: "#",
                children: [
                  (0, s.jsxs)("span", {
                    className: "brand-mark",
                    children: ["e", (0, s.jsx)("span", { children: "m" })],
                  }),
                  (0, s.jsxs)("span", {
                    children: [
                      "edu",
                      (0, s.jsx)("span", {
                        className: "brand-thin",
                        children: "market",
                      }),
                    ],
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                className: "login-copy",
                children: [
                  (0, s.jsx)("span", {
                    className: "eyebrow",
                    children: "ร้านเล็ก ๆ เริ่มจากไอเดียใหญ่",
                  }),
                  (0, s.jsxs)("h1", {
                    children: [
                      "ไอเดียเล็ก ๆ",
                      (0, s.jsx)("br", {}),
                      "เติบโตได้",
                      (0, s.jsx)("span", { children: "ทุกวัน." }),
                    ],
                  }),
                  (0, s.jsxs)("p", {
                    children: [
                      "ห้องเรียนธุรกิจที่ได้คิด ได้ลอง",
                      (0, s.jsx)("br", {}),
                      "และลงมือขายจริงในโรงเรียน",
                    ],
                  }),
                ],
              }),
              (0, s.jsx)("span", {
                className: "floating-tag",
                children: "เรียนรู้ผ่านการลงมือทำ",
              }),
              (0, s.jsx)("div", { className: "mascot-circle" }),
              (0, s.jsx)("img", {
                className: "login-mascot",
                src: "/assets/student-mascot.webp",
                alt: "นักเรียนถือสมุดและถุงช็อปปิง",
              }),
            ],
          }),
          (0, s.jsxs)("section", {
            className: "login-form",
            children: [
              (0, s.jsx)(dt, {
                color: "lime",
                children: "เริ่มต้นบทใหม่ของเรา",
              }),
              (0, s.jsxs)("h2", {
                children: [
                  "เลือกพื้นที่ของคุณ",
                  (0, s.jsx)("span", { children: "ครูหรือนักเรียน?" }),
                ],
              }),
              (0, s.jsx)("p", {
                className: "muted",
                children: "เลือกบทบาทก่อนเข้าสู่ระบบทดลอง",
              }),
              (0, s.jsxs)("div", {
                className: "login-roles",
                role: "group",
                "aria-label": "เลือกประเภทผู้ใช้งาน",
                children: [
                  (0, s.jsx)("button", {
                    type: "button",
                    className:
                      "login-role " + (e === "teacher" ? "selected" : ""),
                    "aria-pressed": e === "teacher",
                    onClick: () => a("teacher"),
                    children: "ครู",
                  }),
                  (0, s.jsx)("button", {
                    type: "button",
                    className:
                      "login-role " + (e === "student" ? "selected" : ""),
                    "aria-pressed": e === "student",
                    onClick: () => a("student"),
                    children: "นักเรียน",
                  }),
                ],
              }),
              e &&
                (0, s.jsxs)("form", {
                  onSubmit: (u) => {
                    (u.preventDefault(), l.trim() && i && t(e));
                  },
                  children: [
                    (0, s.jsxs)("p", {
                      className: "login-demo-hint",
                      children: [
                        e === "admin" ? "พื้นที่ผู้ดูแลระบบ \xB7 " : "",
                        "กรอกชื่อผู้ใช้และรหัสผ่านอะไรก็ได้เพื่อทดลอง",
                      ],
                    }),
                    (0, s.jsx)(U, {
                      label: "ชื่อผู้ใช้",
                      children: (0, s.jsx)("input", {
                        name: "username",
                        autoComplete: "off",
                        value: l,
                        onChange: (u) => n(u.target.value),
                        placeholder: "ชื่อผู้ใช้สำหรับทดลอง",
                        required: !0,
                      }),
                    }),
                    (0, s.jsx)(U, {
                      label: "รหัสผ่าน",
                      children: (0, s.jsx)("input", {
                        name: "password",
                        type: "password",
                        autoComplete: "off",
                        value: i,
                        onChange: (u) => c(u.target.value),
                        placeholder: "ใส่อะไรก็ได้",
                        required: !0,
                      }),
                    }),
                    (0, s.jsx)(A, {
                      variant: "black full",
                      disabled: !l.trim() || !i,
                      children: "เข้าสู่ระบบ",
                    }),
                  ],
                }),
              (0, s.jsx)("button", {
                type: "button",
                className: "admin-login-link",
                "aria-pressed": e === "admin",
                onClick: () => a("admin"),
                children: "สำหรับผู้ดูแลระบบ",
              }),
            ],
          }),
        ],
      }),
      (0, s.jsx)("div", {
        className: "login-foot",
        children: "EDUMARKET — พื้นที่ของคนช่างคิดและกล้าลอง",
      }),
    ],
  });
}
function Lu({ p: t, large: e = !1 }) {
  return (0, s.jsx)("div", {
    className: "product-art " + t.color + (e ? " large" : ""),
    children: t.image
      ? (0, s.jsx)("img", { src: t.image, alt: t.name })
      : (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)("div", { className: "art-blob" }),
            (0, s.jsx)("span", {
              role: "img",
              "aria-label": t.name,
              children: t.emoji,
            }),
            (0, s.jsx)("i", { children: "ไอเดียจากโรงเรียน ✦" }),
          ],
        }),
  });
}
function Gp({ p: t, observer: e = !1 }) {
  let { data: a, user: l, dispatch: n, setModal: i } = Q(),
    c = a.shops.find((u) => u.id === t.shopId);
  return (0, s.jsxs)("article", {
    className: "product-card",
    children: [
      (0, s.jsxs)("div", {
        className: "product-visual",
        children: [
          (0, s.jsx)("button", {
            className: "art-button",
            onClick: () => {
              (n({ type: "VIEW", id: t.id }), i({ type: "product", id: t.id }));
            },
            "aria-label": "ดู " + t.name,
            children: (0, s.jsx)(Lu, { p: t }),
          }),
          (0, s.jsx)(dt, {
            color: t.preorder ? "orange" : "white",
            children: t.preorder ? "พรีออเดอร์" : `พร้อมรับ ${t.stock} ชิ้น`,
          }),
          !e &&
            (0, s.jsx)("button", {
              className: "wish " + (t.wishedBy.includes(l.id) ? "wished" : ""),
              "aria-label":
                (t.wishedBy.includes(l.id) ? "นำออกจาก" : "เพิ่มใน") +
                "รายการที่สนใจ " +
                t.name,
              "aria-pressed": t.wishedBy.includes(l.id),
              onClick: () => n({ type: "WISH", id: t.id, user: l.id }),
              children: (0, s.jsx)(_t, { name: "heart", size: 18 }),
            }),
        ],
      }),
      (0, s.jsxs)("div", {
        className: "product-info",
        children: [
          (0, s.jsxs)("button", {
            className: "shop-link",
            onClick: () => i({ type: "store", id: c.id }),
            children: [
              (0, s.jsx)("span", {
                className: "mini-avatar " + c.color,
                children: c.emoji,
              }),
              c.name,
              (0, s.jsx)("span", { children: "↗" }),
            ],
          }),
          (0, s.jsxs)("small", {
            className: "seller-names",
            children: [
              "โดย ",
              c.members
                .map((u) => a.users.find((o) => o.id === u)?.name)
                .filter(Boolean)
                .join(" + ") || "เพื่อนในโรงเรียน",
            ],
          }),
          (0, s.jsx)("button", {
            className: "product-name",
            onClick: () => {
              (n({ type: "VIEW", id: t.id }), i({ type: "product", id: t.id }));
            },
            children: t.name,
          }),
          (0, s.jsxs)("div", {
            className: "product-bottom",
            children: [
              (0, s.jsxs)("strong", { children: ["฿", Nt(t.price)] }),
              (0, s.jsxs)("span", {
                className: "rating",
                children: [
                  "★ ",
                  Xu(a, t.id).toFixed(1),
                  " ",
                  (0, s.jsxs)("small", {
                    children: [
                      "(",
                      a.reviews.filter((u) => u.productId === t.id).length,
                      ")",
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Lh() {
  let { data: t, user: e, role: a, cart: l, setModal: n } = Q(),
    [i, c] = (0, T.useState)(""),
    [u, o] = (0, T.useState)("ทั้งหมด"),
    [d, g] = (0, T.useState)(!1),
    h = a === "teacher",
    p = t.classes.filter((f) => f.teacherId === e.id).map((f) => f.id),
    r = t.products.filter(
      (f) =>
        (u === "ทั้งหมด" || f.category === u) &&
        `${f.name} ${t.shops.find((m) => m.id === f.shopId)?.name}`
          .toLowerCase()
          .includes(i.toLowerCase()) &&
        (!d || p.includes(t.shops.find((m) => m.id === f.shopId)?.classId)),
    ),
    v = t.shops.map((f) => {
      let m = na(t, f.id),
        x = t.orders
          .filter(
            (y) =>
              y.shopId === f.id &&
              y.status === "delivered" &&
              Date.now() - new Date(y.date).getTime() < 7 * 864e5,
          )
          .flatMap((y) => y.items);
      return {
        ...f,
        ...m,
        revenue: x.reduce((y, E) => y + E.price * E.qty, 0),
        sold: x.reduce((y, E) => y + E.qty, 0),
      };
    }),
    b = [...v].sort((f, m) => m.revenue - f.revenue)[0],
    z = [...v].sort((f, m) => m.rating - f.rating)[0];
  return (0, s.jsxs)("div", {
    className: "page-enter",
    children: [
      (0, s.jsxs)("div", {
        className: "page-intro",
        children: [
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsx)("div", {
                className: "eyebrow",
                children: "โรงเรียนของเรา ตลาดของเรา",
              }),
              (0, s.jsx)("h1", {
                children: h
                  ? "พื้นที่เรียนรู้ที่มีชีวิต"
                  : "วันนี้อยากเจออะไรดี?",
              }),
              (0, s.jsx)("p", {
                children: "อุดหนุนไอเดียดี ๆ จากเพื่อนในโรงเรียน",
              }),
            ],
          }),
          !h &&
            (0, s.jsxs)(A, {
              icon: "bag",
              variant: "white",
              onClick: () => n({ type: "cart" }),
              children: [
                "ตะกร้า ",
                (0, s.jsx)("b", {
                  className: "count",
                  children: l.reduce((f, m) => f + m.qty, 0),
                }),
              ],
            }),
        ],
      }),
      (0, s.jsxs)("div", {
        className: "market-hero",
        children: [
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsx)(dt, {
                color: "white",
                children: "✦ ตลาดนัดในโรงเรียน",
              }),
              (0, s.jsxs)("h2", {
                children: [
                  "ร้านเล็ก.",
                  (0, s.jsx)("br", {}),
                  (0, s.jsx)("span", { children: "ความเป็นไปได้ใหญ่!" }),
                ],
              }),
              (0, s.jsx)("p", {
                children: "แวะมาเลือก แวะมาลอง แล้วรับของที่โรงเรียน",
              }),
              (0, s.jsxs)("span", {
                className: "hero-event",
                children: [
                  "ทุกวันเรียน \xB7 ช่วงพักกลางวัน ",
                  (0, s.jsx)("span", { children: "↗" }),
                ],
              }),
            ],
          }),
          (0, s.jsxs)("div", {
            className: "hero-visual",
            children: [
              (0, s.jsx)("div", { className: "hero-circle" }),
              (0, s.jsx)("img", {
                src: "/assets/student-mascot.webp",
                alt: "มาสคอตนักเรียนพร้อมเริ่มธุรกิจ",
              }),
              (0, s.jsxs)("span", {
                className: "hero-sticker",
                children: [
                  "100%",
                  (0, s.jsx)("small", { children: "สร้างสรรค์โดยนักเรียน" }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, s.jsx)("div", {
        className: "leaderboards",
        children: [
          [b, "🔥 ร้านขายดีใน 7 วัน"],
          [z, "⭐ ร้านโปรดของเพื่อน ๆ"],
        ].map(
          ([f, m], x) =>
            f &&
            (0, s.jsxs)(
              "button",
              {
                className: "leader-card",
                onClick: () => n({ type: "store", id: f.id }),
                children: [
                  (0, s.jsx)("span", {
                    className: "leader-avatar " + f.color,
                    children: f.emoji,
                  }),
                  (0, s.jsxs)("div", {
                    children: [
                      (0, s.jsx)("small", { children: m }),
                      (0, s.jsx)("strong", { children: f.name }),
                      (0, s.jsx)("span", {
                        children:
                          x === 0
                            ? `${f.sold} ชิ้นที่ส่งมอบแล้ว`
                            : `${f.rating.toFixed(1)} คะแนนจากผู้ซื้อ`,
                      }),
                    ],
                  }),
                  (0, s.jsx)("b", { children: "↗" }),
                ],
              },
              x,
            ),
        ),
      }),
      (0, s.jsx)(pe, {
        eyebrow: "สิ่งดี ๆ ที่เพื่อนตั้งใจทำ",
        title: "เดินเล่นตลาดนัด",
        children:
          h &&
          (0, s.jsxs)("select", {
            "aria-label": "กรองห้องเรียน",
            value: d ? "mine" : "all",
            onChange: (f) => g(f.target.value === "mine"),
            children: [
              (0, s.jsx)("option", {
                value: "all",
                children: "สินค้าทั้งโรงเรียน",
              }),
              (0, s.jsx)("option", {
                value: "mine",
                children: "สินค้าจากห้องเรียนของฉัน",
              }),
            ],
          }),
      }),
      (0, s.jsxs)("div", {
        className: "market-controls",
        children: [
          (0, s.jsxs)("div", {
            className: "search",
            children: [
              (0, s.jsx)(_t, { name: "search" }),
              (0, s.jsx)("input", {
                value: i,
                onChange: (f) => c(f.target.value),
                placeholder: "ค้นหาสินค้าหรือร้านที่ชอบ",
                "aria-label": "ค้นหาสินค้า",
              }),
            ],
          }),
          (0, s.jsx)("div", {
            className: "pills",
            children: [
              "ทั้งหมด",
              "อาหาร & เครื่องดื่ม",
              "แฮนด์เมด",
              "เครื่องเขียน",
            ].map((f) =>
              (0, s.jsx)(
                "button",
                {
                  className: u === f ? "selected" : "",
                  onClick: () => o(f),
                  children: f,
                },
                f,
              ),
            ),
          }),
        ],
      }),
      r.length
        ? (0, s.jsx)("div", {
            className: "product-grid",
            children: r.map((f) => (0, s.jsx)(Gp, { p: f, observer: h }, f.id)),
          })
        : (0, s.jsx)(Xt, {
            children: "ยังไม่พบสินค้าที่ค้นหา ลองเปลี่ยนคำค้นหรือหมวดหมู่ดูนะ",
          }),
    ],
  });
}
function Ku({ productId: t, shopId: e }) {
  let { data: a } = Q(),
    l = e ? a.products.filter((i) => i.shopId === e).map((i) => i.id) : [t],
    n = a.reviews.filter((i) => l.includes(i.productId));
  return (0, s.jsx)("div", {
    className: "reviews",
    children: n.length
      ? n.map((i) =>
          (0, s.jsxs)(
            "div",
            {
              className: "review",
              children: [
                (0, s.jsx)("span", {
                  className: "avatar small",
                  children:
                    a.users.find((c) => c.id === i.userId)?.avatar || "🙂",
                }),
                (0, s.jsxs)("div", {
                  children: [
                    (0, s.jsx)("strong", {
                      children:
                        a.users.find((c) => c.id === i.userId)?.name ||
                        "เพื่อนในโรงเรียน",
                    }),
                    (0, s.jsxs)("span", {
                      className: "stars",
                      children: [
                        "★".repeat(i.rating),
                        "☆".repeat(5 - i.rating),
                      ],
                    }),
                    (0, s.jsx)("p", { children: i.text }),
                    (0, s.jsx)("small", { children: Pt(i.date) }),
                  ],
                }),
              ],
            },
            i.id,
          ),
        )
      : (0, s.jsx)(Xt, {
          children: "ยังไม่มีรีวิว มาเป็นกำลังใจให้ร้านแรกกัน",
        }),
  });
}
function Kh({ id: t }) {
  let {
      data: e,
      user: a,
      role: l,
      dispatch: n,
      setModal: i,
      cart: c,
      setCart: u,
      toast: o,
    } = Q(),
    d = e.products.find((f) => f.id === t),
    g = e.shops.find((f) => f.id === d?.shopId),
    [h, p] = (0, T.useState)(5),
    [r, v] = (0, T.useState)("");
  if (!d) return (0, s.jsx)(Xt, { children: "ไม่พบสินค้า" });
  let b = g.members.includes(a.id),
    z = () => {
      if ((c.find((m) => m.productId === t)?.qty || 0) >= d.stock) {
        o("จำนวนในตะกร้าถึงจำนวนที่ร้านรับได้แล้ว");
        return;
      }
      (u(
        c.some((m) => m.productId === t)
          ? c.map((m) => (m.productId === t ? { ...m, qty: m.qty + 1 } : m))
          : [...c, { productId: t, qty: 1 }],
      ),
        o("เพิ่มลงตะกร้าแล้ว"));
    };
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsxs)("div", {
        className: "detail-grid",
        children: [
          (0, s.jsx)(Lu, { p: d, large: !0 }),
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsxs)(dt, {
                color: "lime",
                children: [
                  d.preorder ? "รับจองล่วงหน้า" : "พร้อมนัดรับ",
                  " \xB7 ",
                  d.stock,
                  " ชิ้น",
                ],
              }),
              (0, s.jsx)("h2", { children: d.name }),
              (0, s.jsxs)("button", {
                className: "shop-link",
                onClick: () => i({ type: "store", id: g.id }),
                children: [g.emoji, " ", g.name, " ↗"],
              }),
              (0, s.jsx)("p", { children: d.description }),
              (0, s.jsxs)("strong", {
                className: "big-price",
                children: ["฿", Nt(d.price)],
              }),
              (0, s.jsxs)("div", {
                className: "muted",
                children: [
                  "★ ",
                  Xu(e, d.id).toFixed(1),
                  " \xB7 สนใจ ",
                  bl(d),
                  " คน \xB7 เข้าชม ",
                  d.views,
                  " ครั้ง",
                ],
              }),
              l === "student" &&
                (0, s.jsxs)("div", {
                  className: "actions",
                  children: [
                    (0, s.jsx)(A, {
                      onClick: z,
                      disabled: d.stock < 1 || b,
                      icon: "bag",
                      children: b
                        ? "สินค้าของร้านเรา"
                        : d.stock < 1
                          ? "สินค้าหมด"
                          : "เพิ่มลงตะกร้า",
                    }),
                    (0, s.jsx)(A, {
                      variant: "outline",
                      icon: "heart",
                      "aria-pressed": d.wishedBy.includes(a.id),
                      onClick: () => n({ type: "WISH", id: t, user: a.id }),
                      children: d.wishedBy.includes(a.id) ? "สนใจแล้ว" : "สนใจ",
                    }),
                  ],
                }),
              (0, s.jsxs)("p", {
                className: "hint",
                children: [
                  "📍 นัดรับภายในโรงเรียน \xB7 ไม่มีค่าจัดส่ง",
                  (0, s.jsx)("br", {}),
                  d.preorder
                    ? "ร้านจะยืนยันวันพร้อมรับผ่านข้อความก่อนนัดรับ"
                    : "เลือกจุดและช่วงเวลารับของในขั้นตอนสั่งซื้อ",
                ],
              }),
              (0, s.jsx)(A, {
                variant: "text",
                icon: "chat",
                disabled: b,
                onClick: () => i({ type: "chat", to: g.members[0] }),
                children: "สอบถามร้านค้า",
              }),
            ],
          }),
        ],
      }),
      (0, s.jsx)(pe, { title: "เสียงจากเพื่อน ๆ" }),
      (0, s.jsx)(Ku, { productId: t }),
      l === "student" &&
        !b &&
        (0, s.jsxs)("form", {
          className: "soft-panel",
          onSubmit: (f) => {
            (f.preventDefault(),
              n({
                type: "REVIEW",
                item: {
                  id: St("review"),
                  productId: t,
                  userId: a.id,
                  rating: h,
                  text: r.trim(),
                  date: ct(),
                },
              }),
              v(""),
              o("ขอบคุณสำหรับรีวิวของเรา"));
          },
          children: [
            (0, s.jsx)("h3", { children: "เล่าประสบการณ์ของคุณ" }),
            (0, s.jsx)("div", {
              className: "rating-picker",
              role: "group",
              "aria-label": "คะแนนรีวิว",
              children: [1, 2, 3, 4, 5].map((f) =>
                (0, s.jsx)(
                  "button",
                  {
                    type: "button",
                    className: f <= h ? "chosen" : "",
                    "aria-label": f + " ดาว",
                    "aria-pressed": h === f,
                    onClick: () => p(f),
                    children: "★",
                  },
                  f,
                ),
              ),
            }),
            (0, s.jsx)(U, {
              label: "ความคิดเห็น",
              children: (0, s.jsx)("textarea", {
                value: r,
                onChange: (f) => v(f.target.value),
                required: !0,
                maxLength: 500,
                placeholder: "สินค้าและการนัดรับเป็นอย่างไรบ้าง?",
              }),
            }),
            (0, s.jsx)(A, { disabled: !r.trim(), children: "ส่งรีวิว" }),
            (0, s.jsx)("small", {
              className: "hint",
              children:
                "บัญชีละ 1 รีวิวต่อสินค้า ส่งอีกครั้งเพื่อแก้ไขรีวิวเดิม",
            }),
          ],
        }),
    ],
  });
}
function Jh() {
  let {
      data: t,
      user: e,
      cart: a,
      setCart: l,
      dispatch: n,
      setModal: i,
      toast: c,
    } = Q(),
    [u, o] = (0, T.useState)(vl[0]),
    [d, g] = (0, T.useState)("12:00"),
    h = a
      .map((v) => ({ ...v, p: t.products.find((b) => b.id === v.productId) }))
      .filter((v) => v.p),
    p = h.reduce((v, b) => v + b.p.price * b.qty, 0),
    r = h.some((v) => v.qty > v.p.stock);
  return (0, s.jsx)(s.Fragment, {
    children: h.length
      ? (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)("div", {
              className: "cart-list",
              children: h.map((v) =>
                (0, s.jsxs)(
                  "div",
                  {
                    className: "cart-row",
                    children: [
                      (0, s.jsx)("span", {
                        className: "cart-emoji " + v.p.color,
                        children: v.p.emoji,
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("strong", { children: v.p.name }),
                          (0, s.jsxs)("small", {
                            children: [
                              "฿",
                              Nt(v.p.price),
                              " / ชิ้น ",
                              v.p.preorder ? "\xB7 พรีออเดอร์" : "",
                            ],
                          }),
                          v.qty > v.p.stock &&
                            (0, s.jsxs)("small", {
                              className: "error",
                              children: [
                                "เหลือ ",
                                v.p.stock,
                                " ชิ้น กรุณาลดจำนวน",
                              ],
                            }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        className: "quantity",
                        children: [
                          (0, s.jsx)("button", {
                            "aria-label": "ลดจำนวน " + v.p.name,
                            onClick: () =>
                              l(
                                a
                                  .map((b) =>
                                    b.productId === v.productId
                                      ? { ...b, qty: b.qty - 1 }
                                      : b,
                                  )
                                  .filter((b) => b.qty > 0),
                              ),
                            children: "−",
                          }),
                          (0, s.jsx)("b", { children: v.qty }),
                          (0, s.jsx)("button", {
                            "aria-label": "เพิ่มจำนวน " + v.p.name,
                            disabled: v.qty >= v.p.stock,
                            onClick: () =>
                              l(
                                a.map((b) =>
                                  b.productId === v.productId
                                    ? { ...b, qty: b.qty + 1 }
                                    : b,
                                ),
                              ),
                            children: "+",
                          }),
                        ],
                      }),
                    ],
                  },
                  v.productId,
                ),
              ),
            }),
            (0, s.jsxs)("div", {
              className: "two-col",
              children: [
                (0, s.jsx)(U, {
                  label: "จุดนัดรับ",
                  children: (0, s.jsx)("select", {
                    value: u,
                    onChange: (v) => o(v.target.value),
                    children: vl.map((v) =>
                      (0, s.jsx)("option", { children: v }, v),
                    ),
                  }),
                }),
                (0, s.jsx)(U, {
                  label: "ช่วงเวลานัดรับ",
                  children: (0, s.jsx)("select", {
                    value: d,
                    onChange: (v) => g(v.target.value),
                    children: ls.map((v) =>
                      (0, s.jsx)("option", { children: v }, v),
                    ),
                  }),
                }),
              ],
            }),
            (0, s.jsx)("p", {
              className: "hint",
              children:
                "ชำระเงินกับร้านเมื่อนัดรับ • ยืนยันวันรับสินค้าและพรีออเดอร์ผ่านแชท",
            }),
            (0, s.jsxs)("div", {
              className: "total",
              children: [
                (0, s.jsx)("span", { children: "รวมทั้งหมด" }),
                (0, s.jsxs)("strong", { children: ["฿", Nt(p)] }),
              ],
            }),
            (0, s.jsxs)(A, {
              variant: "full",
              disabled: r,
              onClick: () => {
                (n({ type: "ORDER", cart: a, user: e.id, pickup: u, time: d }),
                  l([]),
                  i({ type: "orders" }),
                  c("ส่งคำสั่งซื้อแล้ว ติดต่อร้านเพื่อยืนยันการนัดรับ"));
              },
              children: ["ยืนยันสั่งซื้อ ", (0, s.jsx)(_t, { name: "arrow" })],
            }),
          ],
        })
      : (0, s.jsx)(Xt, { children: "ตะกร้ายังว่าง ไปเดินเล่นตลาดนัดกันก่อน" }),
  });
}
function Vu({ sellerShop: t }) {
  let { data: e, user: a, dispatch: l, setModal: n } = Q(),
    i = e.orders.filter((c) => (t ? c.shopId === t : c.buyer === a.id));
  return (0, s.jsx)("div", {
    className: "stack",
    children: i.length
      ? i.map((c) =>
          (0, s.jsxs)(
            "div",
            {
              className: "order-card",
              children: [
                (0, s.jsxs)("div", {
                  className: "row-between",
                  children: [
                    (0, s.jsx)("strong", {
                      children: e.shops.find((u) => u.id === c.shopId)?.name,
                    }),
                    (0, s.jsx)(dt, {
                      color: c.status === "delivered" ? "lime" : "peach",
                      children:
                        c.status === "delivered" ? "ส่งมอบแล้ว" : "รอนัดรับ",
                    }),
                  ],
                }),
                (0, s.jsx)("p", {
                  children: c.items
                    .map((u) => `${u.name} \xD7 ${u.qty}`)
                    .join(", "),
                }),
                (0, s.jsxs)("div", {
                  className: "row-between",
                  children: [
                    (0, s.jsxs)("small", {
                      children: [
                        "📍 ",
                        c.pickup,
                        " \xB7 ",
                        c.time,
                        " น. \xB7 ",
                        Pt(c.date),
                      ],
                    }),
                    (0, s.jsxs)("b", {
                      children: [
                        "฿",
                        Nt(c.items.reduce((u, o) => u + o.price * o.qty, 0)),
                      ],
                    }),
                  ],
                }),
                (0, s.jsxs)("div", {
                  className: "actions",
                  children: [
                    t &&
                      c.status === "awaiting" &&
                      (0, s.jsx)(A, {
                        variant: "small",
                        onClick: () => l({ type: "DELIVER", id: c.id }),
                        children: "ยืนยันส่งมอบ",
                      }),
                    (0, s.jsx)(A, {
                      variant: "text small",
                      onClick: () =>
                        n({
                          type: "chat",
                          to: t
                            ? c.buyer
                            : e.shops.find((u) => u.id === c.shopId)
                                ?.members[0],
                        }),
                      children: "คุยเรื่องนัดรับ ↗",
                    }),
                  ],
                }),
              ],
            },
            c.id,
          ),
        )
      : (0, s.jsx)(Xt, { children: "ยังไม่มีคำสั่งซื้อ" }),
  });
}
function Wh() {
  let { data: t, user: e, setLesson: a, setModal: l } = Q(),
    n = t.progress[e.id] || [],
    i = t.assignments.filter((c) => c.classId === e.classId);
  return (0, s.jsxs)("div", {
    className: "page-enter",
    children: [
      (0, s.jsxs)("div", {
        className: "page-intro",
        children: [
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsx)("div", {
                className: "eyebrow",
                children: "เรียนรู้ผ่านการลงมือทำ",
              }),
              (0, s.jsx)("h1", { children: "ทุกการลอง คือการเรียนรู้ ✦" }),
              (0, s.jsx)("p", {
                children: "เลือกบทที่สนใจ เรียนสั้น ๆ แล้วลองกับร้านของเรา",
              }),
            ],
          }),
          (0, s.jsx)(A, {
            variant: "white",
            onClick: () => l({ type: "join" }),
            icon: "plus",
            children: "เข้าร่วมห้องเรียน",
          }),
        ],
      }),
      (0, s.jsxs)("div", {
        className: "learning-layout",
        children: [
          (0, s.jsx)("section", {
            children: (0, s.jsxs)("div", {
              className: "quest-panel",
              children: [
                (0, s.jsx)("div", {
                  className: "row-between",
                  children: (0, s.jsxs)("div", {
                    children: [
                      (0, s.jsx)(dt, {
                        color: "white",
                        children: "เส้นทางเจ้าของธุรกิจตัวน้อย",
                      }),
                      (0, s.jsx)("h2", {
                        children: "ก้าวเล็ก ๆ สู่เจ้าของร้าน",
                      }),
                      (0, s.jsx)("p", {
                        children: "เรียนได้ทุกบท ในจังหวะของตัวเอง",
                      }),
                    ],
                  }),
                }),
                (0, s.jsx)("div", {
                  className: "quest-map",
                  children: Ea.map((c, u) =>
                    (0, s.jsxs)(
                      "button",
                      {
                        className: "quest-node node-" + u,
                        onClick: () => a(c.id),
                        children: [
                          (0, s.jsxs)("span", {
                            className: "quest-circle " + c.color,
                            children: [
                              n.includes(c.id) ? "✓" : c.icon,
                              (0, s.jsx)("b", {
                                children: String(u + 1).padStart(2, "0"),
                              }),
                            ],
                          }),
                          (0, s.jsx)("strong", { children: c.title }),
                          (0, s.jsx)("small", {
                            children: n.includes(c.id)
                              ? "ผ่านแล้ว \xB7 กลับมาทบทวนได้"
                              : "+100 XP \xB7 เริ่มได้เลย",
                          }),
                          (0, s.jsx)("span", {
                            className: "quest-arrow",
                            children: "↗",
                          }),
                        ],
                      },
                      c.id,
                    ),
                  ),
                }),
                (0, s.jsxs)("div", {
                  className: "quest-foot",
                  children: [
                    (0, s.jsxs)("span", {
                      children: ["🎖 ", n.length, "/3 เหรียญ"],
                    }),
                    (0, s.jsxs)("span", {
                      children: ["⚡ ", n.length * 100, " XP"],
                    }),
                    (0, s.jsx)("span", {
                      children: "ทุกเครื่องมือร้านค้าใช้ได้ทันที",
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, s.jsxs)("aside", {
            className: "card assignment-panel",
            children: [
              (0, s.jsx)("div", {
                className: "eyebrow",
                children: "จากห้องเรียนของเรา",
              }),
              (0, s.jsxs)("h2", {
                children: [
                  "ภารกิจจากคุณครู ",
                  (0, s.jsx)("span", { className: "orange-dot" }),
                ],
              }),
              i.map((c) => {
                let u = t.submissions.find(
                  (o) => o.assignmentId === c.id && o.userId === e.id,
                );
                return (0, s.jsxs)(
                  "div",
                  {
                    className: "assignment-mini",
                    children: [
                      (0, s.jsx)(dt, {
                        color: u ? "lime" : "peach",
                        children: u
                          ? u.score !== void 0
                            ? `ตรวจแล้ว ${u.score}/100`
                            : "ส่งแล้ว รอตรวจ"
                          : "รอลงมือทำ",
                      }),
                      (0, s.jsx)("h3", { children: c.title }),
                      (0, s.jsxs)("small", {
                        children: ["ส่งภายใน ", Pt(c.due)],
                      }),
                      (0, s.jsxs)(A, {
                        variant: "outline full",
                        onClick: () => l({ type: "assignment", id: c.id }),
                        children: [
                          u ? "ดูงานของฉัน" : "ดูภารกิจ",
                          " ",
                          (0, s.jsx)(_t, { name: "arrow" }),
                        ],
                      }),
                    ],
                  },
                  c.id,
                );
              }),
              !i.length &&
                (0, s.jsx)(Xt, { children: "ยังไม่มีภารกิจใหม่จากครู" }),
              (0, s.jsx)("p", {
                className: "hint",
                children:
                  t.classes.find((c) => c.id === e.classId)?.name ||
                  "ยังไม่ได้เข้าร่วมห้องเรียน",
              }),
            ],
          }),
        ],
      }),
      (0, s.jsx)(pe, {
        title: "เติมไอเดียจากคุณครู",
        eyebrow: "เรียนอีกนิด เติมไอเดียอีกหน่อย",
      }),
      (0, s.jsx)("div", {
        className: "content-grid",
        children: t.contents
          .filter((c) => c.classId === e.classId)
          .map((c, u) =>
            (0, s.jsxs)(
              "button",
              {
                className: "content-card",
                onClick: () => l({ type: "content", id: c.id }),
                children: [
                  (0, s.jsx)("span", {
                    className: ["peach", "lime", "lavender", "yellow"][u % 4],
                    children: ["💡", "📣", "🎨", "🔎"][u % 4],
                  }),
                  (0, s.jsx)("small", { children: c.category }),
                  (0, s.jsx)("h3", { children: c.title }),
                  (0, s.jsxs)("div", {
                    children: [
                      "เปิดบทเรียน ",
                      (0, s.jsx)("b", { children: "↗" }),
                    ],
                  }),
                ],
              },
              c.id,
            ),
          ),
      }),
    ],
  });
}
function Fh({ moduleId: t }) {
  let { data: e, user: a, dispatch: l, setLesson: n, toast: i } = Q(),
    c = Ea.find((M) => M.id === t),
    [u, o] = (0, T.useState)(35),
    [d, g] = (0, T.useState)(15),
    [h, p] = (0, T.useState)({}),
    [r, v] = (0, T.useState)(""),
    [b, z] = (0, T.useState)(15),
    [f, m] = (0, T.useState)(!1),
    [x, y] = (0, T.useState)(""),
    E = (e.progress[a.id] || []).includes(t),
    O = Qu(u, d),
    w = Math.max(0, Math.round(52 - u * 0.6)),
    N =
      t === "cost"
        ? h.rent === "fixed" &&
          h.box === "variable" &&
          h.ingredients === "variable"
        : t === "demand"
          ? r === "drink"
          : f && Number(x) === 13,
    Z = () => {
      (l({ type: "COMPLETE", user: a.id, module: t }),
        i(
          E ? "ทบทวนเรียบร้อย เก่งมาก!" : "เรียนจบแล้ว! ได้รับเหรียญและ 100 XP",
        ),
        n(null));
    };
  return (0, s.jsxs)(
    "div",
    {
      className: "lesson-page page-enter",
      children: [
        (0, s.jsx)(A, {
          variant: "text",
          icon: "back",
          onClick: () => n(null),
          children: "กลับสู่บทเรียน",
        }),
        (0, s.jsxs)("div", {
          className: "lesson-banner " + c.color,
          children: [
            (0, s.jsx)("span", { children: c.icon }),
            (0, s.jsxs)("div", {
              children: [
                (0, s.jsx)("div", {
                  className: "eyebrow",
                  children: "ทดลอง เรียนรู้ แล้วลองใหม่",
                }),
                (0, s.jsx)("h1", { children: c.title }),
                (0, s.jsx)("p", { children: c.subtitle }),
              ],
            }),
            (0, s.jsx)(dt, {
              color: "white",
              children: E ? "🎖 ผ่านแล้ว" : "+100 XP",
            }),
          ],
        }),
        t === "cost"
          ? (0, s.jsx)(s.Fragment, {
              children: (0, s.jsxs)("div", {
                className: "two-col",
                children: [
                  (0, s.jsxs)("section", {
                    className: "card",
                    children: [
                      (0, s.jsx)("span", {
                        className: "step-label",
                        children: "01 / ลองแยกต้นทุน",
                      }),
                      (0, s.jsx)("h2", {
                        children: "ต้นทุนแต่ละอย่างต่างกันยังไง?",
                      }),
                      (0, s.jsx)("p", {
                        children:
                          "ต้นทุนคงที่ไม่เปลี่ยนตามจำนวนที่ผลิตในช่วงที่กำหนด ส่วนต้นทุนผันแปรเพิ่มตามจำนวนสินค้า",
                      }),
                      [
                        ["rent", "ค่าเช่าโต๊ะ 100 บาทต่อวัน"],
                        ["box", "กล่อง 2 บาทต่อชิ้น"],
                        ["ingredients", "วัตถุดิบ 18 บาทต่อชิ้น"],
                      ].map(([M, nt]) =>
                        (0, s.jsx)(
                          U,
                          {
                            label: nt,
                            children: (0, s.jsxs)("select", {
                              value: h[M] || "",
                              onChange: (ss) =>
                                p({ ...h, [M]: ss.target.value }),
                              children: [
                                (0, s.jsx)("option", {
                                  value: "",
                                  children: "เลือกประเภทต้นทุน",
                                }),
                                (0, s.jsx)("option", {
                                  value: "fixed",
                                  children: "ต้นทุนคงที่",
                                }),
                                (0, s.jsx)("option", {
                                  value: "variable",
                                  children: "ต้นทุนผันแปร",
                                }),
                              ],
                            }),
                          },
                          M,
                        ),
                      ),
                      Object.keys(h).length === 3 &&
                        (0, s.jsx)("p", {
                          className: "feedback " + (N ? "correct" : ""),
                          children: N
                            ? "✓ ถูกต้อง! กล่องและวัตถุดิบเพิ่มตามจำนวนที่ผลิต"
                            : "ลองอีกครั้ง: ค่าเช่าโต๊ะจ่ายเท่าเดิม แม้ผลิตมากขึ้น",
                        }),
                    ],
                  }),
                  (0, s.jsxs)("section", {
                    className: "card",
                    children: [
                      (0, s.jsx)("span", {
                        className: "step-label",
                        children: "02 / ทดลองตั้งราคา",
                      }),
                      (0, s.jsx)("h2", { children: "ขายเท่าไร ถึงจะคุ้ม?" }),
                      (0, s.jsxs)("p", {
                        className: "hint",
                        children: [
                          "ตัวอย่าง: ต้นทุนคงที่ 100 บาท + ต้นทุนผันแปร 20 บาท/ชิ้น",
                          (0, s.jsx)("br", {}),
                          "สมมติว่าขายได้ครบตามจำนวนที่ผลิต",
                        ],
                      }),
                      (0, s.jsx)(is, {
                        label: "ราคาขายต่อชิ้น",
                        value: u,
                        min: 10,
                        max: 100,
                        onChange: o,
                        unit: "บาท",
                      }),
                      (0, s.jsx)(is, {
                        label: "จำนวนที่ผลิตและขายได้",
                        value: d,
                        min: 1,
                        max: 50,
                        onChange: g,
                        unit: "ชิ้น",
                      }),
                      (0, s.jsx)(h1, { price: u, qty: d }),
                      (0, s.jsxs)("div", {
                        className: "metric-grid",
                        children: [
                          (0, s.jsx)(P, {
                            label: "ต้นทุนเฉลี่ย / ชิ้น",
                            value: O.unit.toFixed(1) + " ฿",
                          }),
                          (0, s.jsx)(P, {
                            label: "จุดคุ้มทุน",
                            value: O.breakeven
                              ? O.breakeven + " ชิ้น"
                              : "ยังคุ้มทุนไม่ได้",
                          }),
                          (0, s.jsx)(P, {
                            label: O.profit >= 0 ? "กำไรจำลอง" : "ขาดทุนจำลอง",
                            value: Nt(O.profit) + " ฿",
                            color: O.profit >= 0 ? "lime" : "peach",
                          }),
                        ],
                      }),
                      (0, s.jsxs)("p", {
                        className: "hint",
                        children: [
                          "จุดคุ้มทุน = ต้นทุนคงที่ \xF7 (ราคาขาย − ต้นทุนผันแปรต่อชิ้น) ปัดขึ้น",
                          (0, s.jsx)("br", {}),
                          "Markup จากต้นทุนเฉลี่ยตอนนี้ = ",
                          (((u - O.unit) / O.unit) * 100).toFixed(1),
                          "%",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            })
          : t === "demand"
            ? (0, s.jsx)(s.Fragment, {
                children: (0, s.jsxs)("div", {
                  className: "two-col",
                  children: [
                    (0, s.jsxs)("section", {
                      className: "card",
                      children: [
                        (0, s.jsx)("span", {
                          className: "step-label",
                          children: "01 / ทดลองเปลี่ยนราคา",
                        }),
                        (0, s.jsx)("h2", {
                          children: "ราคาขยับ คนซื้อเปลี่ยน",
                        }),
                        (0, s.jsx)("p", {
                          children:
                            "ทดลองขายน้ำผลไม้ให้เพื่อนในโรงเรียน เริ่มจากถามเพื่อนว่าชอบรสไหน ซื้อบ่อยแค่ไหน และยินดีจ่ายเท่าไร",
                        }),
                        (0, s.jsx)("div", {
                          className: "simulation-emoji",
                          children: "🧃",
                        }),
                        (0, s.jsx)(is, {
                          label: "ราคาต่อแก้ว",
                          value: u,
                          min: 10,
                          max: 80,
                          onChange: o,
                          unit: "บาท",
                        }),
                        (0, s.jsxs)("div", {
                          className: "metric-grid",
                          children: [
                            (0, s.jsx)(P, {
                              label: "ลูกค้าที่คาดว่าจะซื้อ",
                              value: w + " คน",
                              color: "lime",
                            }),
                            (0, s.jsx)(P, {
                              label: "รายรับคาดการณ์",
                              value: Nt(u * w) + " ฿",
                            }),
                          ],
                        }),
                        (0, s.jsx)("p", {
                          className: "hint",
                          children:
                            "แบบจำลองเพื่อการเรียนรู้ ใช้สมมติฐานว่าราคาสูงขึ้นแล้วคนซื้อลดลง ตัวเลขนี้ไม่ใช่การพยากรณ์ยอดขายจริง",
                        }),
                      ],
                    }),
                    (0, s.jsxs)("section", {
                      className: "card",
                      children: [
                        (0, s.jsx)("span", {
                          className: "step-label",
                          children: "02 / ดูบริบทของลูกค้า",
                        }),
                        (0, s.jsx)("h2", { children: "วันกีฬาสี ขายอะไรดี?" }),
                        (0, s.jsx)("p", {
                          children:
                            "อากาศร้อน เพื่อนแข่งกีฬากลางสนาม สินค้าไหนตอบโจทย์สถานการณ์นี้มากที่สุด?",
                        }),
                        (0, s.jsx)("div", {
                          className: "choice-stack",
                          children: [
                            ["drink", "🧃 เครื่องดื่มเย็น ดับกระหาย"],
                            ["book", "📚 สมุดเตรียมสอบ"],
                            ["scarf", "🧣 ผ้าพันคอไหมพรม"],
                          ].map(([M, nt]) =>
                            (0, s.jsxs)(
                              "button",
                              {
                                className:
                                  "choice " + (r === M ? "selected" : ""),
                                onClick: () => v(M),
                                children: [
                                  nt,
                                  (0, s.jsx)("span", {
                                    children: r === M ? "●" : "○",
                                  }),
                                ],
                              },
                              M,
                            ),
                          ),
                        }),
                        r &&
                          (0, s.jsx)("p", {
                            className: "feedback " + (N ? "correct" : ""),
                            children: N
                              ? "✓ เหมาะกับความต้องการในช่วงนั้น ลองสอบถามเพื่อนก่อนวางแผนจำนวนผลิตด้วยนะ"
                              : "ลองคิดถึงกิจกรรม อากาศ และสิ่งที่เพื่อนต้องการตอนนั้นอีกครั้ง",
                          }),
                        (0, s.jsxs)("div", {
                          className: "note",
                          children: [
                            (0, s.jsx)("strong", {
                              children: "ดู 100 ครั้ง ≠ ซื้อ 100 ชิ้น",
                            }),
                            (0, s.jsx)("p", {
                              children:
                                "ยอดเข้าชมบอกการมองเห็น Wishlist บอกความสนใจ ส่วนยอดสั่งซื้อบอกการตัดสินใจซื้อ เปรียบเทียบทั้งสามก่อนเพิ่มสต็อก",
                            }),
                            (0, s.jsx)("small", {
                              children:
                                "พรีออเดอร์ช่วยเห็นยอดจอง แต่ยังมีโอกาสยกเลิกหรือไม่มารับ",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              })
            : (0, s.jsx)(s.Fragment, {
                children: (0, s.jsxs)("div", {
                  className: "two-col",
                  children: [
                    (0, s.jsxs)("section", {
                      className: "card",
                      children: [
                        (0, s.jsx)("span", {
                          className: "step-label",
                          children: "01 / เกมวางแผนสต็อก",
                        }),
                        (0, s.jsx)("h2", {
                          children: "มีทุน 500 บาท ซื้อของเท่าไร?",
                        }),
                        (0, s.jsx)("p", {
                          children:
                            "แซนด์วิชต้นทุน 20 บาท ขาย 35 บาท เก็บข้ามวันไม่ได้ จำนวนขายจริงในสถานการณ์นี้: 18 ชิ้น",
                        }),
                        (0, s.jsx)(is, {
                          label: "จำนวนที่จะเตรียม",
                          value: b,
                          min: 0,
                          max: 25,
                          onChange: (M) => {
                            (z(M), m(!1));
                          },
                          unit: "ชิ้น",
                        }),
                        (0, s.jsxs)("div", {
                          className: "row-between",
                          children: [
                            (0, s.jsxs)("span", {
                              children: ["ใช้ทุน ", b * 20, " / 500 บาท"],
                            }),
                            (0, s.jsx)(dt, {
                              color: "lime",
                              children: "ไม่เกินงบ",
                            }),
                          ],
                        }),
                        (0, s.jsxs)(A, {
                          variant: "black full",
                          onClick: () => m(!0),
                          children: [
                            "จำลองวันขายของ ",
                            (0, s.jsx)(_t, { name: "arrow" }),
                          ],
                        }),
                        f &&
                          (0, s.jsxs)("div", {
                            className: "sim-result",
                            children: [
                              (0, s.jsxs)("div", {
                                className: "metric-grid",
                                children: [
                                  (0, s.jsx)(P, {
                                    label: "ขายได้",
                                    value: Math.min(b, 18) + " ชิ้น",
                                  }),
                                  (0, s.jsx)(P, {
                                    label:
                                      b > 18 ? "ของเหลือทิ้ง" : "พลาดโอกาสขาย",
                                    value: Math.abs(b - 18) + " ชิ้น",
                                  }),
                                  (0, s.jsx)(P, {
                                    label: "กำไรหลังหักของเสีย",
                                    value:
                                      Nt(Math.min(b, 18) * 35 - b * 20) + " ฿",
                                    color: "lime",
                                  }),
                                ],
                              }),
                              (0, s.jsx)("p", {
                                children:
                                  b === 18
                                    ? "จำนวนพอดีกับความต้องการในตัวอย่างนี้!"
                                    : b > 18
                                      ? "ของเหลือขายวันต่อไปไม่ได้ ต้นทุนที่จ่ายไปจึงลดกำไร"
                                      : "ทุนเหลือ แต่สินค้าหมดก่อนลูกค้าซื้อครบ",
                              }),
                            ],
                          }),
                      ],
                    }),
                    (0, s.jsxs)("section", {
                      className: "card",
                      children: [
                        (0, s.jsx)("span", {
                          className: "step-label",
                          children: "02 / เติมของให้ทัน",
                        }),
                        (0, s.jsx)("h2", {
                          children: "สต็อกเหลือเท่าไร ควรสั่งเพิ่ม?",
                        }),
                        (0, s.jsx)("p", {
                          children:
                            "ขายเฉลี่ยวันละ 5 ชิ้น รอของ 2 วัน และกันสำรองไว้อีก 3 ชิ้น",
                        }),
                        (0, s.jsxs)("div", {
                          className: "formula",
                          children: [
                            "จุดสั่งซื้อใหม่",
                            (0, s.jsx)("br", {}),
                            (0, s.jsx)("strong", {
                              children:
                                "(ยอดขายต่อวัน \xD7 วันรอของ) + สต็อกสำรอง",
                            }),
                          ],
                        }),
                        (0, s.jsx)(U, {
                          label: "ควรสั่งซื้อใหม่เมื่อเหลือกี่ชิ้น?",
                          children: (0, s.jsx)("input", {
                            type: "number",
                            min: "0",
                            value: x,
                            onChange: (M) => y(M.target.value),
                            placeholder: "ใส่จำนวนชิ้น",
                          }),
                        }),
                        x &&
                          (0, s.jsx)("p", {
                            className:
                              "feedback " + (Number(x) === 13 ? "correct" : ""),
                            children:
                              Number(x) === 13
                                ? "✓ ใช่เลย! (5 \xD7 2) + 3 = 13 ชิ้น"
                                : "ลองคูณยอดขายต่อวันกับเวลารอ แล้วบวกของสำรอง",
                          }),
                        (0, s.jsxs)("div", {
                          className: "note",
                          children: [
                            (0, s.jsx)("strong", {
                              children: "วางแผนจนถึงมือลูกค้า 📍",
                            }),
                            (0, s.jsx)("p", {
                              children:
                                "บันทึกวันของเข้า แยกสินค้าที่มีคนจอง ตรวจคุณภาพ และยืนยันจุดนัดรับในโรงเรียน เพื่อลดการหยิบผิดและส่งมอบล่าช้า",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
        (0, s.jsxs)("div", {
          className: "lesson-end",
          children: [
            (0, s.jsx)("p", {
              children: "เรียนแล้วลองทำ พลาดแล้วลองใหม่ได้เสมอ ✦",
            }),
            (0, s.jsxs)(A, {
              disabled: !N,
              onClick: Z,
              children: [
                E ? "บันทึกการทบทวน" : "รับเหรียญบทเรียน +100 XP",
                " ",
                (0, s.jsx)(_t, { name: "arrow" }),
              ],
            }),
          ],
        }),
      ],
    },
    t,
  );
}
function is({ label: t, value: e, min: a, max: l, onChange: n, unit: i }) {
  return (0, s.jsxs)("label", {
    className: "slider-field",
    children: [
      (0, s.jsxs)("span", {
        children: [t, (0, s.jsxs)("strong", { children: [e, " ", i] })],
      }),
      (0, s.jsx)("input", {
        "aria-label": t,
        type: "range",
        min: a,
        max: l,
        value: e,
        onChange: (c) => n(Number(c.target.value)),
      }),
      (0, s.jsxs)("span", {
        className: "range-labels",
        children: [
          (0, s.jsxs)("small", { children: [a, " ", i] }),
          (0, s.jsxs)("small", { children: [l, " ", i] }),
        ],
      }),
    ],
  });
}
function $h({ id: t }) {
  let { data: e, user: a, dispatch: l, toast: n, setModal: i } = Q(),
    c = e.assignments.find((g) => g.id === t),
    u = e.submissions.find((g) => g.assignmentId === t && g.userId === a.id),
    [o, d] = (0, T.useState)(u?.text || "");
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsxs)(dt, { color: "peach", children: ["ส่งภายใน ", Pt(c.due)] }),
      (0, s.jsx)("h2", { children: c.title }),
      (0, s.jsx)("p", { className: "pre-wrap", children: c.body }),
      u?.score !== void 0 &&
        (0, s.jsxs)("div", {
          className: "note",
          children: [
            (0, s.jsxs)("strong", {
              children: ["ครูให้ ", u.score, "/100 คะแนน"],
            }),
            (0, s.jsx)("p", { children: u.feedback }),
          ],
        }),
      (0, s.jsxs)("form", {
        onSubmit: (g) => {
          (g.preventDefault(),
            l({
              type: "SUBMIT",
              item: {
                id: St("sub"),
                assignmentId: t,
                userId: a.id,
                text: o.trim(),
                date: ct(),
              },
            }),
            n("ส่งงานให้ครูเรียบร้อย"),
            i(null));
        },
        children: [
          (0, s.jsx)(U, {
            label: "คำตอบและสิ่งที่เราได้เรียนรู้",
            children: (0, s.jsx)("textarea", {
              rows: "7",
              required: !0,
              value: o,
              onChange: (g) => d(g.target.value),
              placeholder:
                "เล่าวิธีคิด แนบตัวเลข และเหตุผลในการตัดสินใจของเรา…",
            }),
          }),
          (0, s.jsxs)(A, {
            disabled: !o.trim(),
            children: [
              u ? "ส่งงานฉบับแก้ไข" : "ส่งงานให้คุณครู",
              " ",
              (0, s.jsx)(_t, { name: "arrow" }),
            ],
          }),
          u &&
            (0, s.jsx)("p", {
              className: "hint",
              children: "ส่งฉบับแก้ไขแล้วครูจะตรวจให้คะแนนใหม่",
            }),
        ],
      }),
    ],
  });
}
function Ih() {
  let { data: t, user: e, setModal: a, toast: l } = Q(),
    n = t.classes.filter((r) => r.teacherId === e.id),
    [i, c] = (0, T.useState)(n[0]?.id || ""),
    [u, o] = (0, T.useState)("students"),
    d = n.find((r) => r.id === i) || n[0],
    g = t.users.filter((r) => r.role === "student" && r.classId === d?.id),
    h = t.shops.filter((r) => r.classId === d?.id),
    p = async () => {
      let r = `${location.origin}/?join=${d.code}`;
      try {
        (await navigator.clipboard.writeText(r), l("คัดลอกลิงก์เชิญแล้ว"));
      } catch {
        a({ type: "invite", link: r });
      }
    };
  return (0, s.jsxs)("div", {
    className: "page-enter",
    children: [
      (0, s.jsxs)("div", {
        className: "page-intro",
        children: [
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsx)("div", {
                className: "eyebrow",
                children: "วันนี้เรียนรู้อะไรไปด้วยกันดี",
              }),
              (0, s.jsxs)("h1", { children: ["ห้องเรียนของ", e.name] }),
              (0, s.jsx)("p", {
                children: "ชวนเด็ก ๆ เรียนรู้ธุรกิจ ผ่านการลงมือทำจริง",
              }),
            ],
          }),
          (0, s.jsx)(A, {
            icon: "plus",
            onClick: () => a({ type: "classForm" }),
            children: "สร้างห้องเรียน",
          }),
        ],
      }),
      d
        ? (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)("div", {
                className: "classroom-hero",
                children: (0, s.jsxs)("div", {
                  children: [
                    (0, s.jsx)(dt, {
                      color: "lime",
                      children: "พื้นที่ห้องเรียน",
                    }),
                    (0, s.jsx)("select", {
                      "aria-label": "เลือกห้องเรียน",
                      className: "class-select",
                      value: d.id,
                      onChange: (r) => c(r.target.value),
                      children: n.map((r) =>
                        (0, s.jsx)(
                          "option",
                          { value: r.id, children: r.name },
                          r.id,
                        ),
                      ),
                    }),
                    (0, s.jsx)("p", {
                      children:
                        "พื้นที่ให้ทุกไอเดียได้ลอง และทุกความพยายามได้เติบโต",
                    }),
                    (0, s.jsxs)("div", {
                      className: "actions",
                      children: [
                        (0, s.jsxs)("span", {
                          className: "invite-code",
                          children: [
                            "รหัสห้อง ",
                            (0, s.jsx)("b", { children: d.code }),
                          ],
                        }),
                        (0, s.jsx)(A, {
                          variant: "white small",
                          onClick: p,
                          children: "คัดลอกลิงก์เชิญ ↗",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, s.jsxs)("div", {
                className: "stats-row",
                children: [
                  (0, s.jsx)(P, {
                    label: "นักเรียนในห้อง",
                    value: g.length + " คน",
                    icon: "👥",
                  }),
                  (0, s.jsx)(P, {
                    label: "ร้านค้าที่ได้ลงมือทำ",
                    value: h.length + " ร้าน",
                    icon: "🏪",
                  }),
                  (0, s.jsx)(P, {
                    label: "เรียนครบ 3 บท",
                    value:
                      g.filter((r) => (t.progress[r.id] || []).length === 3)
                        .length + " คน",
                    icon: "🎖",
                    color: "lime",
                  }),
                  (0, s.jsx)(P, {
                    label: "งานรอตรวจ",
                    value:
                      t.submissions.filter(
                        (r) =>
                          r.score === void 0 &&
                          t.assignments.some(
                            (v) =>
                              v.id === r.assignmentId && v.classId === d.id,
                          ),
                      ).length + " งาน",
                    icon: "📝",
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                className: "class-controls",
                children: [
                  (0, s.jsx)("div", {
                    className: "pills",
                    children: [
                      ["students", "นักเรียน & ความก้าวหน้า"],
                      ["content", "เนื้อหาเพิ่มเติม"],
                      ["assignments", "ภารกิจ & ตรวจงาน"],
                    ].map(([r, v]) =>
                      (0, s.jsx)(
                        "button",
                        {
                          className: u === r ? "selected" : "",
                          onClick: () => o(r),
                          children: v,
                        },
                        r,
                      ),
                    ),
                  }),
                  (0, s.jsx)(A, {
                    variant: "outline small",
                    icon: "plus",
                    onClick: () =>
                      a({
                        type:
                          u === "content"
                            ? "contentForm"
                            : u === "assignments"
                              ? "assignForm"
                              : "studentForm",
                        classId: d.id,
                      }),
                    children:
                      u === "content"
                        ? "เพิ่มบทเรียน"
                        : u === "assignments"
                          ? "มอบหมายงาน"
                          : "เพิ่มนักเรียน",
                  }),
                ],
              }),
              u === "students"
                ? (0, s.jsxs)("section", {
                    className: "card",
                    children: [
                      (0, s.jsx)(pe, { title: "ทุกคนเติบโตในแบบของตัวเอง" }),
                      (0, s.jsx)("div", {
                        className: "table-scroll",
                        children: (0, s.jsxs)("table", {
                          children: [
                            (0, s.jsx)("thead", {
                              children: (0, s.jsxs)("tr", {
                                children: [
                                  (0, s.jsx)("th", {
                                    children: "นักเรียน / ร้านค้า",
                                  }),
                                  Ea.map((r) =>
                                    (0, s.jsxs)(
                                      "th",
                                      {
                                        children: [
                                          r.icon,
                                          " ",
                                          r.id === "cost"
                                            ? "ต้นทุน"
                                            : r.id === "demand"
                                              ? "ตลาด"
                                              : "สต็อก",
                                        ],
                                      },
                                      r.id,
                                    ),
                                  ),
                                  (0, s.jsx)("th", { children: "เหรียญ" }),
                                  (0, s.jsx)("th", { children: "ส่งงาน" }),
                                  (0, s.jsx)("th", {}),
                                ],
                              }),
                            }),
                            (0, s.jsx)("tbody", {
                              children: g.map((r) => {
                                let v = h.find((z) => z.members.includes(r.id)),
                                  b = t.progress[r.id] || [];
                                return (0, s.jsxs)(
                                  "tr",
                                  {
                                    children: [
                                      (0, s.jsx)("td", {
                                        children: (0, s.jsxs)("div", {
                                          className: "person",
                                          children: [
                                            (0, s.jsx)("span", {
                                              className: "avatar",
                                              children: r.avatar,
                                            }),
                                            (0, s.jsxs)("div", {
                                              children: [
                                                (0, s.jsx)("strong", {
                                                  children: r.name,
                                                }),
                                                (0, s.jsxs)("small", {
                                                  children: [
                                                    v?.name ||
                                                      "ยังไม่มีร้านค้า",
                                                    " \xB7 ",
                                                    r.id,
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                      Ea.map((z) =>
                                        (0, s.jsx)(
                                          "td",
                                          {
                                            children: (0, s.jsx)("span", {
                                              className:
                                                "completion " +
                                                (b.includes(z.id) ? "yes" : ""),
                                              children: b.includes(z.id)
                                                ? "✓"
                                                : "—",
                                            }),
                                          },
                                          z.id,
                                        ),
                                      ),
                                      (0, s.jsx)("td", {
                                        children: b.length
                                          ? `${"🎖".repeat(b.length)}`
                                          : "—",
                                      }),
                                      (0, s.jsxs)("td", {
                                        children: [
                                          t.submissions.filter(
                                            (z) =>
                                              z.userId === r.id &&
                                              t.assignments.some(
                                                (f) =>
                                                  f.id === z.assignmentId &&
                                                  f.classId === d.id,
                                              ),
                                          ).length,
                                          " งาน",
                                        ],
                                      }),
                                      (0, s.jsx)("td", {
                                        children: (0, s.jsx)(A, {
                                          variant: "text small",
                                          onClick: () =>
                                            a({
                                              type: "studentForm",
                                              id: r.id,
                                              classId: d.id,
                                            }),
                                          children: "จัดการ ↗",
                                        }),
                                      }),
                                    ],
                                  },
                                  r.id,
                                );
                              }),
                            }),
                          ],
                        }),
                      }),
                      !g.length &&
                        (0, s.jsx)(Xt, {
                          children: "แชร์รหัสห้องให้นักเรียนเข้าร่วมได้เลย",
                        }),
                      (0, s.jsxs)("div", {
                        className: "note",
                        children: [
                          (0, s.jsx)("strong", {
                            children: "ดูพัฒนาการจากวิธีคิดด้วย",
                          }),
                          (0, s.jsx)("p", {
                            children:
                              "ใช้ผลงาน เหตุผลในการตั้งราคา และการปรับสต็อกประกอบการประเมิน ยอดขายเป็นเพียงส่วนหนึ่งของการเรียนรู้",
                          }),
                        ],
                      }),
                    ],
                  })
                : u === "content"
                  ? (0, s.jsx)("div", {
                      className: "content-grid",
                      children: t.contents
                        .filter((r) => r.classId === d.id)
                        .map((r, v) =>
                          (0, s.jsxs)(
                            "button",
                            {
                              className: "content-card",
                              onClick: () => a({ type: "content", id: r.id }),
                              children: [
                                (0, s.jsx)("span", {
                                  className: ["lime", "peach", "lavender"][
                                    v % 3
                                  ],
                                  children: "📚",
                                }),
                                (0, s.jsx)("small", { children: r.category }),
                                (0, s.jsx)("h3", { children: r.title }),
                                (0, s.jsxs)("div", {
                                  children: [
                                    "อ่านบทเรียน ",
                                    (0, s.jsx)("b", { children: "↗" }),
                                  ],
                                }),
                              ],
                            },
                            r.id,
                          ),
                        ),
                    })
                  : (0, s.jsx)("div", {
                      className: "stack",
                      children: t.assignments
                        .filter((r) => r.classId === d.id)
                        .map((r) =>
                          (0, s.jsxs)(
                            "div",
                            {
                              className: "card",
                              children: [
                                (0, s.jsxs)("div", {
                                  className: "row-between",
                                  children: [
                                    (0, s.jsx)("h3", { children: r.title }),
                                    (0, s.jsxs)(dt, {
                                      color: "peach",
                                      children: ["ส่ง ", Pt(r.due)],
                                    }),
                                  ],
                                }),
                                (0, s.jsx)("p", { children: r.body }),
                                (0, s.jsxs)("div", {
                                  className: "submission-list",
                                  children: [
                                    t.submissions
                                      .filter((v) => v.assignmentId === r.id)
                                      .map((v) =>
                                        (0, s.jsxs)(
                                          "div",
                                          {
                                            className: "submission-row",
                                            children: [
                                              (0, s.jsxs)("span", {
                                                children: [
                                                  t.users.find(
                                                    (b) => b.id === v.userId,
                                                  )?.name,
                                                  " ",
                                                  (0, s.jsxs)("small", {
                                                    children: [
                                                      "\xB7 ส่ง ",
                                                      Pt(v.date),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              (0, s.jsx)(A, {
                                                variant: "outline small",
                                                onClick: () =>
                                                  a({
                                                    type: "grade",
                                                    id: v.id,
                                                  }),
                                                children:
                                                  v.score === void 0
                                                    ? "ตรวจงาน"
                                                    : `${v.score}/100 \xB7 ดูผล`,
                                              }),
                                            ],
                                          },
                                          v.id,
                                        ),
                                      ),
                                    !t.submissions.some(
                                      (v) => v.assignmentId === r.id,
                                    ) &&
                                      (0, s.jsx)("p", {
                                        className: "hint",
                                        children: "ยังไม่มีงานส่งเข้ามา",
                                      }),
                                  ],
                                }),
                              ],
                            },
                            r.id,
                          ),
                        ),
                    }),
            ],
          })
        : (0, s.jsx)(Xt, {
            children: "สร้างห้องเรียนแรก แล้วชวนนักเรียนเข้าร่วมได้เลย",
          }),
    ],
  });
}
function Ph() {
  let { data: t, user: e, setModal: a } = Q(),
    l = t.shops.find((u) => u.members.includes(e.id)),
    [n, i] = (0, T.useState)("products");
  if (!l)
    return (0, s.jsxs)("div", {
      className: "card center",
      children: [
        (0, s.jsx)("span", { className: "simulation-emoji", children: "🏪" }),
        (0, s.jsx)("h1", { children: "ร้านแรกของเราเริ่มได้เลย" }),
        (0, s.jsx)("p", {
          children: "จะขายคนเดียวหรือชวนเพื่อนมาเป็นทีมก็ได้",
        }),
        (0, s.jsx)(A, {
          onClick: () => a({ type: "shopForm" }),
          icon: "plus",
          children: "เปิดร้านของฉัน",
        }),
      ],
    });
  let c = t.products.filter((u) => u.shopId === l.id);
  return (0, s.jsxs)("div", {
    className: "page-enter",
    children: [
      (0, s.jsx)(Ju, { shop: l, editable: !0 }),
      (0, s.jsxs)("div", {
        className: "stats-row",
        children: [
          (0, s.jsx)(P, {
            label: "ยอดขายที่ส่งมอบแล้ว",
            value: "฿" + Nt(na(t, l.id).revenue),
            icon: "🛍",
          }),
          (0, s.jsx)(P, {
            label: "กำไรประมาณการ",
            value: "฿" + Nt(na(t, l.id).profit),
            icon: "🪙",
            color: "lime",
          }),
          (0, s.jsx)(P, {
            label: "เพื่อนที่สนใจสินค้า",
            value: na(t, l.id).wishes + " ครั้ง",
            icon: "♡",
          }),
          (0, s.jsx)(P, {
            label: "คะแนนรีวิว",
            value: na(t, l.id).rating.toFixed(1) + " / 5",
            icon: "⭐",
          }),
        ],
      }),
      (0, s.jsxs)("div", {
        className: "class-controls",
        children: [
          (0, s.jsx)("div", {
            className: "pills",
            children: [
              ["products", "สินค้าในร้าน"],
              ["orders", "คำสั่งซื้อ"],
              ["analytics", "ข้อมูล & การตัดสินใจ"],
              ["reviews", "รีวิว"],
            ].map(([u, o]) =>
              (0, s.jsx)(
                "button",
                {
                  className: n === u ? "selected" : "",
                  onClick: () => i(u),
                  children: o,
                },
                u,
              ),
            ),
          }),
          (0, s.jsx)(A, {
            icon: "plus",
            onClick: () => a({ type: "productForm", shopId: l.id }),
            children: "เพิ่มสินค้า",
          }),
        ],
      }),
      n === "products"
        ? (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsxs)("div", {
                className: "tools-callout",
                children: [
                  (0, s.jsxs)("div", {
                    children: [
                      (0, s.jsx)("strong", {
                        children: "คิดตัวเลขก่อน ก็อุ่นใจขึ้น 🪙",
                      }),
                      (0, s.jsx)("small", {
                        children:
                          "เครื่องคำนวณต้นทุนและจุดคุ้มทุน ใช้ได้เมื่ออยากลอง",
                      }),
                    ],
                  }),
                  (0, s.jsx)(A, {
                    variant: "white small",
                    onClick: () => a({ type: "calculator" }),
                    children: "ลองคำนวณ ↗",
                  }),
                ],
              }),
              (0, s.jsx)("div", {
                className: "shop-products",
                children: c.map((u) =>
                  (0, s.jsxs)(
                    "div",
                    {
                      className: "inventory-card",
                      children: [
                        (0, s.jsx)(Lu, { p: u }),
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("h3", { children: u.name }),
                            (0, s.jsxs)("small", {
                              children: [
                                u.category,
                                " ",
                                u.preorder ? "\xB7 พรีออเดอร์" : "",
                              ],
                            }),
                            (0, s.jsxs)("div", {
                              className: "row-between",
                              children: [
                                (0, s.jsxs)("strong", {
                                  children: ["฿", u.price],
                                }),
                                (0, s.jsxs)(dt, {
                                  color: u.stock < 5 ? "peach" : "lime",
                                  children: [
                                    u.stock < 5 ? "ใกล้หมด \xB7 " : "",
                                    u.stock,
                                    " ชิ้น",
                                  ],
                                }),
                              ],
                            }),
                            (0, s.jsxs)("div", {
                              className: "inventory-metrics",
                              children: [
                                (0, s.jsxs)("span", {
                                  children: ["◉ ", u.views, " เข้าชม"],
                                }),
                                (0, s.jsxs)("span", {
                                  children: ["♡ ", bl(u), " สนใจ"],
                                }),
                              ],
                            }),
                            (0, s.jsx)(A, {
                              variant: "outline full small",
                              onClick: () =>
                                a({
                                  type: "productForm",
                                  id: u.id,
                                  shopId: l.id,
                                }),
                              children: "แก้ราคา / สต็อก ↗",
                            }),
                          ],
                        }),
                      ],
                    },
                    u.id,
                  ),
                ),
              }),
            ],
          })
        : n === "orders"
          ? (0, s.jsx)(Vu, { sellerShop: l.id })
          : n === "analytics"
            ? (0, s.jsx)(Xp, { shop: l })
            : (0, s.jsx)("div", {
                className: "card",
                children: (0, s.jsx)(Ku, { shopId: l.id }),
              }),
      t.feedback.filter((u) => u.shopId === l.id).length > 0 &&
        (0, s.jsxs)("section", {
          className: "card teacher-feedback",
          children: [
            (0, s.jsx)("h3", { children: "💬 ข้อเสนอแนะจากคุณครู" }),
            t.feedback
              .filter((u) => u.shopId === l.id)
              .map((u) =>
                (0, s.jsx)(
                  "div",
                  {
                    className: "review",
                    children: (0, s.jsxs)("div", {
                      children: [
                        (0, s.jsxs)("strong", {
                          children: [u.score, "/100 คะแนน \xB7 ", Pt(u.date)],
                        }),
                        (0, s.jsx)("p", { children: u.text }),
                      ],
                    }),
                  },
                  u.id,
                ),
              ),
          ],
        }),
    ],
  });
}
function Ju({ shop: t, editable: e = !1 }) {
  let { data: a, setModal: l } = Q(),
    n = t.members.map((u) => a.users.find((o) => o.id === u)).filter(Boolean),
    i = n.some((u) => (a.progress[u.id] || []).length === 3),
    c = Ea.filter((u) =>
      n.some((o) => (a.progress[o.id] || []).includes(u.id)),
    );
  return (0, s.jsxs)("div", {
    className: "shop-banner " + t.color,
    children: [
      (0, s.jsxs)("div", {
        className: "shop-banner-left",
        children: [
          (0, s.jsx)("span", { className: "shop-avatar", children: t.emoji }),
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsx)(dt, {
                color: "white",
                children: n.length > 1 ? "ร้านของทีมเรา" : "ร้านเดี่ยว",
              }),
              (0, s.jsx)("h1", { children: t.name }),
              (0, s.jsx)("p", { children: t.tagline }),
              (0, s.jsxs)("div", {
                className: "shop-members",
                children: [
                  n.map((u) =>
                    (0, s.jsxs)(
                      "span",
                      { children: [u.avatar, " ", u.name] },
                      u.id,
                    ),
                  ),
                  i &&
                    (0, s.jsx)(dt, {
                      color: "black",
                      children: "🎖 เรียนครบ 3 บท",
                    }),
                ],
              }),
              (0, s.jsxs)("div", {
                className: "earned-badges",
                children: [
                  c.map((u) =>
                    (0, s.jsxs)(
                      "span",
                      { title: u.title, children: [u.icon, " ", u.title] },
                      u.id,
                    ),
                  ),
                  (0, s.jsxs)("b", {
                    children: [
                      "⚡ ",
                      n.reduce(
                        (u, o) => u + (a.progress[o.id] || []).length * 100,
                        0,
                      ),
                      " XP",
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      e
        ? (0, s.jsx)(A, {
            variant: "white",
            onClick: () => l({ type: "shopForm", id: t.id }),
            children: "จัดการร้าน & ทีม ↗",
          })
        : null,
    ],
  });
}
function Xp({ shop: t }) {
  let { data: e } = Q(),
    [a, l] = (0, T.useState)("all"),
    n = na(e, t.id),
    i = e.products.filter((p) => p.shopId === t.id),
    c = i.filter((p) => a === "all" || p.id === a),
    u = e.logs.filter(
      (p) => p.shopId === t.id && (a === "all" || p.productId === a),
    ),
    o = Math.max(1, ...c.map((p) => p.views)),
    d = e.orders
      .filter((p) => p.shopId === t.id && p.status === "delivered")
      .map((p) => ({
        ...p,
        items: p.items.filter((r) => a === "all" || r.productId === a),
      })),
    g = Array.from({ length: 7 }, (p, r) => {
      let v = new Date(Date.now() - (6 - r) * 864e5).toISOString().slice(0, 10),
        b = d.filter((z) => z.date.slice(0, 10) === v).flatMap((z) => z.items);
      return {
        date: v,
        revenue: b.reduce((z, f) => z + f.price * f.qty, 0),
        cost: b.reduce((z, f) => z + (f.cost ?? 0) * f.qty, 0),
        profit: b
          .filter((z) => z.cost !== null && z.cost !== void 0)
          .reduce((z, f) => z + (f.price - f.cost) * f.qty, 0),
      };
    }),
    h = Math.max(
      1,
      ...g.map((p) => Math.max(p.revenue, p.cost, Math.abs(p.profit))),
    );
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsxs)("div", {
        className: "analytics-filter",
        children: [
          (0, s.jsx)("label", {
            htmlFor: "product-stat-filter",
            children: "เจาะลึกข้อมูลสินค้า",
          }),
          (0, s.jsxs)("select", {
            id: "product-stat-filter",
            value: a,
            onChange: (p) => l(p.target.value),
            children: [
              (0, s.jsx)("option", {
                value: "all",
                children: "สินค้าทั้งหมดในร้าน",
              }),
              i.map((p) =>
                (0, s.jsx)("option", { value: p.id, children: p.name }, p.id),
              ),
            ],
          }),
        ],
      }),
      (0, s.jsxs)("div", {
        className: "two-col",
        children: [
          (0, s.jsxs)("section", {
            className: "card",
            children: [
              (0, s.jsx)(pe, {
                eyebrow: "เข้าใจตัวเลขของร้าน",
                title: "รายรับ ต้นทุน & กำไร",
              }),
              (0, s.jsxs)("div", {
                className: "chart-legend",
                children: [
                  (0, s.jsxs)("span", {
                    children: [
                      (0, s.jsx)("i", { className: "lime" }),
                      "รายรับ",
                    ],
                  }),
                  (0, s.jsxs)("span", {
                    children: [
                      (0, s.jsx)("i", { className: "orange" }),
                      "ต้นทุนที่บันทึก",
                    ],
                  }),
                  (0, s.jsxs)("span", {
                    children: [
                      (0, s.jsx)("i", { className: "lavender" }),
                      "กำไรประมาณการ",
                    ],
                  }),
                ],
              }),
              (0, s.jsx)("div", {
                className: "bar-chart",
                role: "img",
                "aria-label":
                  "กราฟรายรับ ต้นทุนสินค้า และกำไรประมาณการ 7 วัน แท่งลายแดงคือขาดทุน",
                children: (0, s.jsx)("div", {
                  className: "bar-chart-grid",
                  children: g.map((p) =>
                    (0, s.jsxs)(
                      "div",
                      {
                        className: "bar-day",
                        children: [
                          (0, s.jsxs)("div", {
                            className: "bar-pair",
                            children: [
                              (0, s.jsx)("div", {
                                className: "bar lime",
                                style: {
                                  height: `${(p.revenue / h) * 140 + 2}px`,
                                },
                                title: "รายรับ ฿" + p.revenue,
                              }),
                              (0, s.jsx)("div", {
                                className: "bar orange",
                                style: {
                                  height: `${(p.cost / h) * 140 + 2}px`,
                                },
                                title: "ต้นทุน ฿" + p.cost,
                              }),
                              (0, s.jsx)("div", {
                                className:
                                  "bar " +
                                  (p.profit < 0 ? "negative-bar" : "lavender"),
                                style: {
                                  height: `${(Math.abs(p.profit) / h) * 140 + 2}px`,
                                },
                                title: "กำไรประมาณการ ฿" + p.profit,
                              }),
                            ],
                          }),
                          (0, s.jsx)("small", {
                            children: new Date(p.date).getDate(),
                          }),
                        ],
                      },
                      p.date,
                    ),
                  ),
                }),
              }),
              (0, s.jsxs)("div", {
                className: "chart-totals",
                children: [
                  (0, s.jsxs)("span", {
                    children: [
                      "รายรับ 7 วัน ",
                      (0, s.jsxs)("b", {
                        children: [
                          "฿",
                          Nt(g.reduce((p, r) => p + r.revenue, 0)),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsxs)("span", {
                    children: [
                      "ต้นทุนที่บันทึก ",
                      (0, s.jsxs)("b", {
                        children: ["฿", Nt(g.reduce((p, r) => p + r.cost, 0))],
                      }),
                    ],
                  }),
                ],
              }),
              (0, s.jsxs)("p", {
                className: "hint",
                children: [
                  "แท่งลายแดงแสดงขนาดการขาดทุน \xB7 นับเฉพาะคำสั่งซื้อที่ส่งมอบแล้ว \xB7 กำไรประมาณการ = ราคาขาย − ต้นทุนต่อชิ้นที่บันทึก ณ เวลาสั่งซื้อ ยังไม่หักค่าใช้จ่ายส่วนกลาง",
                  n.unknownCost
                    ? " \xB7 มีสินค้าที่ยังไม่บันทึกต้นทุน จึงไม่รวมในกำไรประมาณการ"
                    : "",
                ],
              }),
              (0, s.jsxs)("details", {
                children: [
                  (0, s.jsx)("summary", { children: "ดูตัวเลขรายวัน" }),
                  (0, s.jsxs)("table", {
                    children: [
                      (0, s.jsx)("thead", {
                        children: (0, s.jsxs)("tr", {
                          children: [
                            (0, s.jsx)("th", { children: "วัน" }),
                            (0, s.jsx)("th", { children: "รายรับ" }),
                            (0, s.jsx)("th", { children: "ต้นทุนที่บันทึก" }),
                            (0, s.jsx)("th", { children: "กำไรประมาณการ" }),
                          ],
                        }),
                      }),
                      (0, s.jsx)("tbody", {
                        children: g.map((p) =>
                          (0, s.jsxs)(
                            "tr",
                            {
                              children: [
                                (0, s.jsx)("td", { children: Pt(p.date) }),
                                (0, s.jsx)("td", { children: p.revenue }),
                                (0, s.jsx)("td", { children: p.cost }),
                                (0, s.jsx)("td", { children: p.profit }),
                              ],
                            },
                            p.date,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, s.jsxs)("section", {
            className: "card",
            children: [
              (0, s.jsx)(pe, {
                eyebrow: "ความสนใจ ≠ การซื้อจริง",
                title: "คนมอง คนสนใจ คนซื้อ",
              }),
              (0, s.jsxs)("div", {
                className: "chart-legend",
                children: [
                  (0, s.jsxs)("span", {
                    children: [
                      (0, s.jsx)("i", { className: "soft-gray" }),
                      "เข้าชม",
                    ],
                  }),
                  (0, s.jsxs)("span", {
                    children: [
                      (0, s.jsx)("i", { className: "orange" }),
                      "สนใจ",
                    ],
                  }),
                  (0, s.jsxs)("span", {
                    children: [
                      (0, s.jsx)("i", { className: "lime" }),
                      "ขายแล้ว",
                    ],
                  }),
                ],
              }),
              c.map((p) => {
                let r = d
                  .flatMap((v) => v.items)
                  .filter((v) => v.productId === p.id)
                  .reduce((v, b) => v + b.qty, 0);
                return (0, s.jsxs)(
                  "div",
                  {
                    className: "demand-row",
                    children: [
                      (0, s.jsxs)("strong", {
                        children: [p.emoji, " ", p.name],
                      }),
                      (0, s.jsx)("div", {
                        className: "demand-track",
                        children: (0, s.jsx)("i", {
                          className: "soft-gray",
                          style: { width: `${(p.views / o) * 100}%` },
                        }),
                      }),
                      (0, s.jsx)("div", {
                        className: "demand-track",
                        children: (0, s.jsx)("i", {
                          className: "orange",
                          style: { width: `${(bl(p) / o) * 100}%` },
                        }),
                      }),
                      (0, s.jsx)("div", {
                        className: "demand-track",
                        children: (0, s.jsx)("i", {
                          className: "lime",
                          style: { width: `${Math.min((r / o) * 100, 100)}%` },
                        }),
                      }),
                      (0, s.jsxs)("small", {
                        children: [
                          "เข้าชม ",
                          p.views,
                          " \xB7 สนใจ ",
                          bl(p),
                          " \xB7 ขายแล้ว ",
                          r,
                        ],
                      }),
                    ],
                  },
                  p.id,
                );
              }),
              (0, s.jsx)("p", {
                className: "hint",
                children:
                  "ยอดสนใจรวมข้อมูลตั้งต้นของต้นแบบ ไม่ใช่จำนวนคำสั่งซื้อที่ยืนยัน",
              }),
            ],
          }),
        ],
      }),
      (0, s.jsxs)("section", {
        className: "card decision-card",
        children: [
          (0, s.jsx)(pe, {
            eyebrow: "วิธีคิดที่อยู่เบื้องหลังตัวเลข",
            title: "บันทึกการตัดสินใจ",
          }),
          (0, s.jsx)("div", {
            className: "table-scroll",
            children: (0, s.jsxs)("table", {
              children: [
                (0, s.jsx)("thead", {
                  children: (0, s.jsxs)("tr", {
                    children: [
                      (0, s.jsx)("th", { children: "วันที่ / สินค้า" }),
                      (0, s.jsx)("th", { children: "ปรับอะไร" }),
                      (0, s.jsx)("th", { children: "ก่อน → หลัง" }),
                      (0, s.jsx)("th", { children: "เหตุผลของนักเรียน" }),
                      (0, s.jsx)("th", { children: "ผู้ปรับ" }),
                    ],
                  }),
                }),
                (0, s.jsx)("tbody", {
                  children: u.map((p) =>
                    (0, s.jsxs)(
                      "tr",
                      {
                        children: [
                          (0, s.jsxs)("td", {
                            children: [
                              (0, s.jsx)("small", { children: Pt(p.date) }),
                              (0, s.jsx)("strong", {
                                children:
                                  e.products.find((r) => r.id === p.productId)
                                    ?.name || "สินค้า",
                              }),
                            ],
                          }),
                          (0, s.jsx)("td", { children: p.type }),
                          (0, s.jsx)("td", {
                            children: (0, s.jsxs)("b", {
                              children: [p.before, " → ", p.after],
                            }),
                          }),
                          (0, s.jsx)("td", { children: p.reason }),
                          (0, s.jsx)("td", {
                            children:
                              e.users.find((r) => r.id === p.actor)?.name ||
                              p.actor,
                          }),
                        ],
                      },
                      p.id,
                    ),
                  ),
                }),
              ],
            }),
          }),
          !u.length &&
            (0, s.jsx)(Xt, {
              children: "เมื่อปรับราคาหรือสต็อก เหตุผลจะบันทึกไว้ที่นี่",
            }),
        ],
      }),
    ],
  });
}
function t1() {
  let { data: t, user: e, setModal: a } = Q(),
    [l, n] = (0, T.useState)(null),
    i = t.classes.filter((o) => o.teacherId === e.id).map((o) => o.id),
    c = t.shops.filter((o) => i.includes(o.classId)),
    u = c.find((o) => o.id === l);
  return (0, s.jsxs)("div", {
    className: "page-enter",
    children: [
      (0, s.jsx)("div", {
        className: "page-intro",
        children: (0, s.jsxs)("div", {
          children: [
            (0, s.jsx)("div", {
              className: "eyebrow",
              children: "มองเห็นทุกก้าวของการเรียนรู้",
            }),
            (0, s.jsx)("h1", { children: "เบื้องหลังร้านเล็ก ๆ" }),
            (0, s.jsx)("p", {
              children: "เข้าใจการตัดสินใจ แล้วช่วยให้ก้าวต่อไปได้ดีขึ้น",
            }),
          ],
        }),
      }),
      u
        ? (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)(A, {
                variant: "text",
                icon: "back",
                onClick: () => n(null),
                children: "กลับไปร้านค้าทั้งหมด",
              }),
              (0, s.jsx)(Ju, { shop: u }),
              (0, s.jsxs)("div", {
                className: "teacher-action",
                children: [
                  (0, s.jsx)("span", {
                    children: "ให้คำแนะนำจากวิธีคิดและพัฒนาการของทีม",
                  }),
                  (0, s.jsx)(A, {
                    onClick: () => a({ type: "feedback", shopId: u.id }),
                    icon: "chat",
                    children: "ข้อเสนอแนะ & คะแนน",
                  }),
                ],
              }),
              (0, s.jsx)(Xp, { shop: u }),
            ],
          })
        : (0, s.jsxs)("div", {
            className: "teacher-shops",
            children: [
              c.map((o) => {
                let d = na(t, o.id);
                return (0, s.jsxs)(
                  "article",
                  {
                    className: "card teacher-shop-card",
                    children: [
                      (0, s.jsxs)("div", {
                        className: "teacher-shop-cover " + o.color,
                        children: [
                          (0, s.jsx)("span", { children: o.emoji }),
                          (0, s.jsx)(dt, {
                            color: "white",
                            children:
                              o.members.length > 1 ? "ร้านกลุ่ม" : "ร้านเดี่ยว",
                          }),
                          (0, s.jsx)("i", { children: "↗" }),
                        ],
                      }),
                      (0, s.jsx)("h2", { children: o.name }),
                      (0, s.jsx)("p", {
                        children: o.members
                          .map((g) => t.users.find((h) => h.id === g)?.name)
                          .filter(Boolean)
                          .join(" + "),
                      }),
                      (0, s.jsxs)("div", {
                        className: "mini-stats",
                        children: [
                          (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsx)("small", { children: "ยอดขาย" }),
                              (0, s.jsxs)("strong", {
                                children: ["฿", Nt(d.revenue)],
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsx)("small", {
                                children: "กำไรประมาณการ",
                              }),
                              (0, s.jsxs)("strong", {
                                className: d.profit < 0 ? "error" : "",
                                children: ["฿", Nt(d.profit)],
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsx)("small", { children: "รีวิว" }),
                              (0, s.jsxs)("strong", {
                                children: ["★ ", d.rating.toFixed(1)],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsxs)(A, {
                        variant: "black full",
                        onClick: () => n(o.id),
                        children: [
                          "ดูข้อมูล & การตัดสินใจ ",
                          (0, s.jsx)(_t, { name: "arrow" }),
                        ],
                      }),
                    ],
                  },
                  o.id,
                );
              }),
              !c.length &&
                (0, s.jsx)(Xt, {
                  children: "เมื่อมีร้านค้าในห้องเรียน ข้อมูลจะปรากฏที่นี่",
                }),
            ],
          }),
    ],
  });
}
function e1({ id: t }) {
  let { data: e, user: a, role: l, setModal: n } = Q(),
    i = e.shops.find((c) => c.id === t);
  return i
    ? (0, s.jsxs)(s.Fragment, {
        children: [
          (0, s.jsx)(Ju, { shop: i }),
          (0, s.jsx)("p", {
            children: e.classes.find((c) => c.id === i.classId)?.name,
          }),
          !i.members.includes(a.id) &&
            i.members[0] &&
            (0, s.jsx)(A, {
              variant: "outline",
              icon: "chat",
              onClick: () => n({ type: "chat", to: i.members[0] }),
              children: "คุยกับร้านนี้",
            }),
          (0, s.jsx)(pe, { title: "สินค้าในร้าน" }),
          (0, s.jsx)("div", {
            className: "product-grid modal-products",
            children: e.products
              .filter((c) => c.shopId === t)
              .map((c) =>
                (0, s.jsx)(Gp, { p: c, observer: l === "teacher" }, c.id),
              ),
          }),
          (0, s.jsx)(pe, { title: "รีวิวร้านค้า" }),
          (0, s.jsx)(Ku, { shopId: t }),
        ],
      })
    : (0, s.jsx)(Xt, { children: "ไม่พบร้านค้า" });
}
function a1() {
  let {
      data: t,
      user: e,
      role: a,
      dispatch: l,
      setModal: n,
      setTab: i,
      setLesson: c,
    } = Q(),
    u = t.notifications
      .filter((r) => r.to === e.id)
      .sort((r, v) => (v.type === "teacher") - (r.type === "teacher")),
    o =
      a === "teacher"
        ? t.shops.filter((r) =>
            t.classes.some((v) => v.id === r.classId && v.teacherId === e.id),
          )
        : t.shops.filter((r) => r.members.includes(e.id)),
    d = (r) => {
      let v = t.orders
          .filter(
            (z) =>
              z.status === "delivered" &&
              z.items.some((f) => f.productId === r.id),
          )
          .map((z) => new Date(z.date).getTime()),
        b = v.length ? Math.max(...v) : new Date(r.createdAt || ct()).getTime();
      return r.stock > 0 && Date.now() - b > 7 * 864e5;
    },
    g = t.products.filter(
      (r) =>
        o.some((v) => v.id === r.shopId) &&
        (r.stock < 5 || r.cost > r.price || d(r)),
    ),
    h = [
      ...new Set(
        t.messages
          .filter((r) => r.to === e.id || r.from === e.id)
          .map((r) => (r.from === e.id ? r.to : r.from)),
      ),
    ],
    p = t.classes.find((r) => r.id === e.classId)?.teacherId;
  return (
    a === "student" && p && !h.includes(p) && h.push(p),
    a === "teacher" &&
      t.users
        .filter(
          (r) =>
            r.role === "student" &&
            t.classes.some((v) => v.id === r.classId && v.teacherId === e.id),
        )
        .forEach((r) => {
          h.includes(r.id) || h.push(r.id);
        }),
    (0, s.jsxs)("div", {
      className: "page-enter",
      children: [
        (0, s.jsxs)("div", {
          className: "page-intro",
          children: [
            (0, s.jsxs)("div", {
              children: [
                (0, s.jsx)("div", {
                  className: "eyebrow",
                  children: "เชื่อมถึงกันทุกการเรียนรู้",
                }),
                (0, s.jsx)("h1", { children: "เรื่องใหม่ ๆ ของเรา" }),
                (0, s.jsx)("p", {
                  children: "รวมข่าวจากห้องเรียนและเรื่องเล่าจากร้านค้า",
                }),
              ],
            }),
            (0, s.jsx)(A, {
              variant: "outline",
              onClick: () => l({ type: "READ", user: e.id }),
              children: "อ่านทั้งหมดแล้ว",
            }),
          ],
        }),
        (0, s.jsxs)("div", {
          className: "messages-layout",
          children: [
            (0, s.jsxs)("section", {
              className: "card",
              children: [
                (0, s.jsxs)("h2", {
                  children: [
                    a === "teacher" ? "ข่าวจากนักเรียน" : "จากคุณครูถึงเรา",
                    " ✦",
                  ],
                }),
                (0, s.jsxs)("div", {
                  className: "notifications",
                  children: [
                    u.map((r) =>
                      (0, s.jsxs)(
                        "button",
                        {
                          className:
                            "notification " +
                            (r.type === "teacher" ? "teacher-highlight " : "") +
                            (r.read ? "" : "unread"),
                          onClick: () => {
                            if (
                              (l({ type: "READ", user: e.id }),
                              r.type === "message")
                            ) {
                              let v =
                                t.messages.findLast(
                                  (b) => b.to === e.id && b.text === r.text,
                                ) || t.messages.findLast((b) => b.to === e.id);
                              v && n({ type: "chat", to: v.from });
                            } else
                              r.type === "order"
                                ? r.title.includes("คำสั่งซื้อใหม่")
                                  ? n({
                                      type: "sellerOrders",
                                      shopId: o[0]?.id,
                                    })
                                  : n({ type: "orders" })
                                : i(
                                    a === "teacher"
                                      ? "classroom"
                                      : r.type === "review" ||
                                          r.title.includes("ร้านของเรา")
                                        ? "shop"
                                        : "lessons",
                                  );
                          },
                          children: [
                            (0, s.jsx)("span", {
                              className:
                                "note-icon " +
                                (r.type === "teacher" ? "lime" : "peach"),
                              children:
                                r.type === "teacher"
                                  ? "👩🏻‍🏫"
                                  : r.type === "order"
                                    ? "🛍"
                                    : r.type === "message"
                                      ? "💬"
                                      : "✦",
                            }),
                            (0, s.jsxs)("div", {
                              children: [
                                (0, s.jsx)("strong", { children: r.title }),
                                (0, s.jsx)("p", { children: r.text }),
                                (0, s.jsx)("small", { children: Pt(r.date) }),
                              ],
                            }),
                            !r.read && (0, s.jsx)("i", {}),
                          ],
                        },
                        r.id,
                      ),
                    ),
                    !u.length &&
                      (0, s.jsx)(Xt, { children: "ยังไม่มีการแจ้งเตือนใหม่" }),
                  ],
                }),
                (0, s.jsx)("h3", {
                  className: "subheading",
                  children: "ผู้ช่วยดูแลร้าน",
                }),
                g.map((r) =>
                  (0, s.jsxs)(
                    "div",
                    {
                      className: "smart-alert",
                      children: [
                        (0, s.jsx)("span", { children: "💡" }),
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("strong", { children: r.name }),
                            (0, s.jsx)("p", {
                              children:
                                r.cost > r.price
                                  ? "ราคาขายต่ำกว่าต้นทุนที่บันทึก ลองทบทวนการตั้งราคา"
                                  : d(r)
                                    ? "มีสต็อก แต่ยังไม่มียอดส่งมอบกว่า 7 วัน ลองทบทวนความต้องการของลูกค้า"
                                    : `เหลือเพียง ${r.stock} ชิ้น ลองวางแผนเติมสต็อก`,
                            }),
                            (0, s.jsxs)("button", {
                              className: "text-link",
                              onClick: () => {
                                a === "teacher"
                                  ? i("analytics")
                                  : (i("lessons"),
                                    c(
                                      r.cost > r.price
                                        ? "cost"
                                        : d(r)
                                          ? "demand"
                                          : "stock",
                                    ));
                              },
                              children: [
                                a === "teacher"
                                  ? "ไปดูข้อมูลร้าน"
                                  : "เรียนรู้วิธีจัดการ",
                                " ↗",
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    r.id,
                  ),
                ),
                !g.length &&
                  (0, s.jsx)("p", {
                    className: "hint",
                    children: "ยังไม่มีสินค้าที่ถึงเงื่อนไขแจ้งเตือน",
                  }),
              ],
            }),
            (0, s.jsxs)("aside", {
              className: "card",
              children: [
                (0, s.jsx)(pe, { title: "กล่องข้อความ" }),
                a === "student" &&
                  (0, s.jsx)(A, {
                    variant: "outline full",
                    icon: "bag",
                    onClick: () => n({ type: "orders" }),
                    children: "คำสั่งซื้อของฉัน",
                  }),
                (0, s.jsx)("div", {
                  className: "conversation-list",
                  children: h.map((r) => {
                    let v = t.users.find((z) => z.id === r),
                      b = t.messages.filter(
                        (z) =>
                          (z.from === r && z.to === e.id) ||
                          (z.from === e.id && z.to === r),
                      );
                    return (0, s.jsxs)(
                      "button",
                      {
                        className: "conversation",
                        onClick: () => n({ type: "chat", to: r }),
                        children: [
                          (0, s.jsx)("span", {
                            className: "avatar",
                            children: v?.avatar || "🙂",
                          }),
                          (0, s.jsxs)("div", {
                            children: [
                              (0, s.jsx)("strong", { children: v?.name || r }),
                              (0, s.jsx)("small", {
                                children:
                                  b.at(-1)?.text ||
                                  "เริ่มพูดคุยเรื่องการเรียนรู้",
                              }),
                            ],
                          }),
                          (0, s.jsx)("b", { children: "↗" }),
                        ],
                      },
                      r,
                    );
                  }),
                }),
                (0, s.jsxs)("div", {
                  className: "chat-note",
                  children: [
                    "📍",
                    (0, s.jsx)("h3", { children: "เจอกันในโรงเรียนนะ" }),
                    (0, s.jsx)("p", {
                      children:
                        "ยืนยันสินค้า วัน เวลา และจุดนัดรับกับร้านก่อนมารับของ",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
function l1({ to: t }) {
  let { data: e, user: a, dispatch: l, toast: n } = Q(),
    [i, c] = (0, T.useState)(""),
    u = e.users.find((d) => d.id === t),
    o = e.messages.filter(
      (d) => (d.from === t && d.to === a.id) || (d.from === a.id && d.to === t),
    );
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsxs)("div", {
        className: "chat-person",
        children: [
          (0, s.jsx)("span", {
            className: "avatar",
            children: u?.avatar || "🙂",
          }),
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsx)("strong", {
                children: u?.name || "บัญชีนี้ไม่อยู่ในระบบแล้ว",
              }),
              (0, s.jsx)("small", {
                children:
                  u?.role === "teacher"
                    ? "คุณครูประจำห้องเรียน"
                    : "เพื่อนในโรงเรียน",
              }),
            ],
          }),
        ],
      }),
      (0, s.jsx)("div", {
        className: "chat-history",
        children: o.length
          ? o.map((d) =>
              (0, s.jsxs)(
                "div",
                {
                  className: "chat-bubble " + (d.from === a.id ? "own" : ""),
                  children: [
                    (0, s.jsx)("p", { children: d.text }),
                    (0, s.jsx)("small", {
                      children: new Date(d.date).toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                    }),
                  ],
                },
                d.id,
              ),
            )
          : (0, s.jsx)(Xt, { children: "เริ่มบทสนทนาได้เลย" }),
      }),
      (0, s.jsx)("div", {
        className: "quick-messages",
        children: [
          "รับที่โรงอาหารกลาง 12:00 ได้ไหม?",
          "ขอสอบถามสินค้าเพิ่มเติมค่ะ",
        ].map((d) =>
          (0, s.jsx)("button", { onClick: () => c(d), children: d }, d),
        ),
      }),
      (0, s.jsxs)("form", {
        className: "chat-input",
        onSubmit: (d) => {
          (d.preventDefault(),
            !(!i.trim() || !u) &&
              (l({
                type: "MESSAGE",
                item: {
                  id: St("msg"),
                  from: a.id,
                  to: t,
                  text: i.trim(),
                  date: ct(),
                },
              }),
              c(""),
              n("บันทึกข้อความแล้ว")));
        },
        children: [
          (0, s.jsx)("input", {
            "aria-label": "ข้อความ",
            value: i,
            onChange: (d) => c(d.target.value),
            placeholder: "พิมพ์ข้อความของเรา…",
            required: !0,
            maxLength: 1e3,
          }),
          (0, s.jsx)(A, {
            disabled: !i.trim() || !u,
            "aria-label": "ส่งข้อความ",
            icon: "arrow",
          }),
        ],
      }),
      (0, s.jsx)("p", {
        className: "hint",
        children: "ข้อความทดลองแสดงในบัญชีผู้รับเมื่อสลับบัญชีบนอุปกรณ์นี้",
      }),
    ],
  });
}
function n1() {
  let { data: t, user: e, dispatch: a, setModal: l, toast: n } = Q(),
    [i, c] = (0, T.useState)("classes");
  return (0, s.jsxs)("div", {
    className: "page-enter",
    children: [
      (0, s.jsxs)("div", {
        className: "page-intro",
        children: [
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsx)("div", {
                className: "eyebrow",
                children: "ดูแลพื้นที่เรียนรู้ของทุกคน",
              }),
              (0, s.jsx)("h1", { children: "พื้นที่จัดการโรงเรียน" }),
              (0, s.jsx)("p", {
                children: "จัดการสมาชิก ห้องเรียน และข้อมูลสำหรับสาธิต",
              }),
            ],
          }),
          (0, s.jsx)(dt, { color: "peach", children: "ผู้ดูแลต้นแบบ" }),
        ],
      }),
      (0, s.jsxs)("div", {
        className: "stats-row",
        children: [
          (0, s.jsx)(P, {
            label: "ห้องเรียน",
            value: t.classes.length,
            icon: "🏫",
          }),
          (0, s.jsx)(P, {
            label: "คุณครู",
            value: t.users.filter((u) => u.role === "teacher").length,
            icon: "👩🏻‍🏫",
          }),
          (0, s.jsx)(P, {
            label: "นักเรียน",
            value: t.users.filter((u) => u.role === "student").length,
            icon: "👥",
          }),
          (0, s.jsx)(P, {
            label: "ร้านค้า",
            value: t.shops.length,
            icon: "🏪",
            color: "lime",
          }),
        ],
      }),
      (0, s.jsxs)("div", {
        className: "class-controls",
        children: [
          (0, s.jsx)("div", {
            className: "pills",
            children: [
              ["classes", "ห้องเรียน"],
              ["teachers", "คุณครู"],
              ["students", "นักเรียน"],
              ["demo", "เครื่องมือสาธิต"],
            ].map(([u, o]) =>
              (0, s.jsx)(
                "button",
                {
                  className: i === u ? "selected" : "",
                  onClick: () => c(u),
                  children: o,
                },
                u,
              ),
            ),
          }),
          i !== "demo" &&
            (0, s.jsxs)(A, {
              icon: "plus",
              onClick: () =>
                l({
                  type: i === "classes" ? "classForm" : "userForm",
                  userRole: i === "teachers" ? "teacher" : "student",
                }),
              children: [
                "เพิ่ม",
                i === "classes"
                  ? "ห้องเรียน"
                  : i === "teachers"
                    ? "ครู"
                    : "นักเรียน",
              ],
            }),
        ],
      }),
      (0, s.jsx)("section", {
        className: "card",
        children:
          i === "classes"
            ? (0, s.jsx)("div", {
                className: "stack",
                children: t.classes.map((u) =>
                  (0, s.jsxs)(
                    "div",
                    {
                      className: "admin-row",
                      children: [
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("h3", { children: u.name }),
                            (0, s.jsxs)("small", {
                              children: [
                                u.code,
                                " \xB7 ",
                                t.users.find((o) => o.id === u.teacherId)?.name,
                                " \xB7 ",
                                t.users.filter((o) => o.classId === u.id)
                                  .length,
                                " คน",
                              ],
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          className: "actions",
                          children: [
                            (0, s.jsx)(A, {
                              variant: "outline small",
                              onClick: () => l({ type: "classForm", id: u.id }),
                              children: "แก้ไข",
                            }),
                            (0, s.jsx)(A, {
                              variant: "text small danger",
                              onClick: () =>
                                l({
                                  type: "confirm",
                                  title: "ลบห้องเรียนนี้?",
                                  body: "นักเรียนและร้านค้าจะถูกนำออกจากห้องนี้ แต่บัญชีและประวัติการขายยังอยู่",
                                  action: () => {
                                    (a({ type: "DELETE_CLASS", id: u.id }),
                                      n("ลบห้องเรียนแล้ว"));
                                  },
                                }),
                              children: "ลบ",
                            }),
                          ],
                        }),
                      ],
                    },
                    u.id,
                  ),
                ),
              })
            : i === "demo"
              ? (0, s.jsxs)(s.Fragment, {
                  children: [
                    (0, s.jsx)("h2", {
                      children: "ลองดูการเปลี่ยนแปลงของข้อมูล",
                    }),
                    (0, s.jsx)("p", {
                      children:
                        "สร้างคำสั่งซื้อที่ส่งมอบแล้วและรีวิวตัวอย่าง 1 รายการต่อสินค้า โดยหักสต็อก 1 ชิ้น",
                    }),
                    (0, s.jsx)("div", {
                      className: "stack",
                      children: t.products.map((u) =>
                        (0, s.jsxs)(
                          "div",
                          {
                            className: "admin-row",
                            children: [
                              (0, s.jsxs)("div", {
                                children: [
                                  (0, s.jsxs)("strong", {
                                    children: [u.emoji, " ", u.name],
                                  }),
                                  (0, s.jsxs)("small", {
                                    children: [
                                      "สต็อก ",
                                      u.stock,
                                      " ชิ้น \xB7 ฿",
                                      u.price,
                                    ],
                                  }),
                                ],
                              }),
                              (0, s.jsx)(A, {
                                variant: "outline small",
                                disabled: u.stock < 1,
                                onClick: () => {
                                  (a({ type: "MOCK", productId: u.id }),
                                    n("เพิ่มคำสั่งซื้อและรีวิวทดลองแล้ว"));
                                },
                                children: "สร้างยอดขาย + รีวิว",
                              }),
                            ],
                          },
                          u.id,
                        ),
                      ),
                    }),
                    (0, s.jsx)("h3", {
                      className: "subheading",
                      children: "มอบเหรียญบทเรียน",
                    }),
                    t.users
                      .filter((u) => u.role === "student")
                      .map((u) =>
                        (0, s.jsxs)(
                          "div",
                          {
                            className: "admin-row",
                            children: [
                              (0, s.jsxs)("span", {
                                children: [
                                  u.avatar,
                                  " ",
                                  u.name,
                                  " \xB7 ",
                                  (t.progress[u.id] || []).length,
                                  "/3 เหรียญ",
                                ],
                              }),
                              (0, s.jsx)(A, {
                                variant: "small",
                                onClick: () => {
                                  (a({ type: "GRANT", user: u.id }),
                                    n("มอบเหรียญครบ 3 บทแล้ว"));
                                },
                                children: "มอบครบทุกเหรียญ",
                              }),
                            ],
                          },
                          u.id,
                        ),
                      ),
                  ],
                })
              : (0, s.jsx)("div", {
                  className: "stack",
                  children: t.users
                    .filter(
                      (u) =>
                        u.role === (i === "teachers" ? "teacher" : "student"),
                    )
                    .map((u) =>
                      (0, s.jsxs)(
                        "div",
                        {
                          className: "admin-row",
                          children: [
                            (0, s.jsxs)("div", {
                              className: "person",
                              children: [
                                (0, s.jsx)("span", {
                                  className: "avatar",
                                  children: u.avatar,
                                }),
                                (0, s.jsxs)("div", {
                                  children: [
                                    (0, s.jsx)("strong", { children: u.name }),
                                    (0, s.jsxs)("small", {
                                      children: [
                                        u.id,
                                        " \xB7 ",
                                        t.classes.find(
                                          (o) => o.id === u.classId,
                                        )?.name || "—",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, s.jsxs)("div", {
                              className: "actions",
                              children: [
                                (0, s.jsx)(A, {
                                  variant: "outline small",
                                  onClick: () =>
                                    l({
                                      type: "userForm",
                                      id: u.id,
                                      userRole: u.role,
                                    }),
                                  children: "แก้ไข",
                                }),
                                (0, s.jsx)(A, {
                                  variant: "text small danger",
                                  disabled: t.classes.some(
                                    (o) => o.teacherId === u.id,
                                  ),
                                  title: t.classes.some(
                                    (o) => o.teacherId === u.id,
                                  )
                                    ? "เปลี่ยนครูประจำห้องก่อนลบบัญชี"
                                    : "",
                                  onClick: () =>
                                    l({
                                      type: "confirm",
                                      title: "ลบบัญชีนี้?",
                                      body: `ลบบัญชี ${u.name} ออกจากรายชื่อและทีมร้านค้า`,
                                      action: () => {
                                        (a({ type: "DELETE_USER", id: u.id }),
                                          n("ลบบัญชีแล้ว"));
                                      },
                                    }),
                                  children: "ลบ",
                                }),
                              ],
                            }),
                          ],
                        },
                        u.id,
                      ),
                    ),
                }),
      }),
    ],
  });
}
async function Qp(t, e = 2 * 1024 * 1024) {
  if (t.size > e) throw new Error("กรุณาใช้ไฟล์ขนาดไม่เกิน 2 MB");
  return new Promise((a, l) => {
    let n = new FileReader();
    ((n.onload = () => a(n.result)),
      (n.onerror = () => l(new Error("อ่านไฟล์ไม่สำเร็จ"))),
      n.readAsDataURL(t));
  });
}
function i1({ id: t, shopId: e }) {
  let { data: a, user: l, dispatch: n, setModal: i, toast: c } = Q(),
    u = a.products.find((b) => b.id === t),
    [o, d] = (0, T.useState)(
      u || {
        name: "",
        price: 25,
        stock: 10,
        category: "อาหาร & เครื่องดื่ม",
        description: "",
        emoji: "🛍",
        color: "lime",
        preorder: !1,
        cost: "",
        image: "",
      },
    ),
    [g, h] = (0, T.useState)(""),
    [p, r] = (0, T.useState)(!1),
    v = (b, z) => d({ ...o, [b]: z });
  return (0, s.jsxs)("form", {
    onSubmit: (b) => {
      (b.preventDefault(),
        o.name.trim() &&
          (n({
            type: "PRODUCT",
            user: l.id,
            reason: g.trim(),
            item: {
              ...o,
              id: t || St("p"),
              createdAt: u?.createdAt || ct(),
              shopId: e,
              name: o.name.trim(),
              price: Number(o.price),
              stock: Number(o.stock),
              cost: o.cost === "" || o.cost === null ? null : Number(o.cost),
            },
          }),
          c(t ? "บันทึกสินค้าและเหตุผลแล้ว" : "เพิ่มสินค้าแล้ว พร้อมขายได้เลย"),
          i(null)));
    },
    children: [
      (0, s.jsxs)("div", {
        className: "two-col",
        children: [
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsx)(U, {
                label: "ชื่อสินค้า",
                children: (0, s.jsx)("input", {
                  required: !0,
                  maxLength: 70,
                  value: o.name,
                  onChange: (b) => v("name", b.target.value),
                }),
              }),
              (0, s.jsx)(U, {
                label: "หมวดหมู่",
                children: (0, s.jsx)("select", {
                  value: o.category,
                  onChange: (b) => v("category", b.target.value),
                  children: [
                    "อาหาร & เครื่องดื่ม",
                    "แฮนด์เมด",
                    "เครื่องเขียน",
                  ].map((b) => (0, s.jsx)("option", { children: b }, b)),
                }),
              }),
              (0, s.jsxs)("div", {
                className: "two-col",
                children: [
                  (0, s.jsx)(U, {
                    label: "ราคาขาย (บาท)",
                    children: (0, s.jsx)("input", {
                      required: !0,
                      type: "number",
                      min: "1",
                      max: "99999",
                      step: "0.01",
                      value: o.price,
                      onChange: (b) => v("price", b.target.value),
                    }),
                  }),
                  (0, s.jsx)(U, {
                    label: o.preorder ? "จำนวนที่รับจองได้" : "สต็อก (ชิ้น)",
                    children: (0, s.jsx)("input", {
                      required: !0,
                      type: "number",
                      min: "0",
                      max: "99999",
                      step: "1",
                      value: o.stock,
                      onChange: (b) => v("stock", b.target.value),
                    }),
                  }),
                ],
              }),
              (0, s.jsxs)("label", {
                className: "checkbox",
                children: [
                  (0, s.jsx)("input", {
                    type: "checkbox",
                    checked: o.preorder,
                    onChange: (b) => v("preorder", b.target.checked),
                  }),
                  " เปิดรับพรีออเดอร์",
                ],
              }),
            ],
          }),
          (0, s.jsxs)("div", {
            children: [
              (0, s.jsx)(U, {
                label: "ภาพสินค้า (ไม่บังคับ)",
                children: (0, s.jsx)("input", {
                  type: "file",
                  accept: "image/png,image/jpeg,image/webp",
                  onChange: async (b) => {
                    let z = b.target.files[0];
                    if (z) {
                      r(!0);
                      try {
                        if (
                          !["image/png", "image/jpeg", "image/webp"].includes(
                            z.type,
                          )
                        )
                          throw Error("ใช้ไฟล์ JPG, PNG หรือ WebP");
                        v("image", await Qp(z));
                      } catch (f) {
                        c(f.message);
                      } finally {
                        r(!1);
                      }
                    }
                  },
                }),
              }),
              o.image
                ? (0, s.jsx)("img", {
                    className: "upload-preview",
                    src: o.image,
                    alt: "ตัวอย่างภาพสินค้า",
                  })
                : (0, s.jsx)("div", {
                    className: "emoji-picker",
                    children: ["🥪", "🍪", "🧃", "📒", "🎀", "🛍"].map((b) =>
                      (0, s.jsx)(
                        "button",
                        {
                          type: "button",
                          className: o.emoji === b ? "selected" : "",
                          onClick: () => v("emoji", b),
                          "aria-label": "ใช้ภาพ " + b,
                          children: b,
                        },
                        b,
                      ),
                    ),
                  }),
              (0, s.jsx)(U, {
                label: "รายละเอียดสินค้า",
                children: (0, s.jsx)("textarea", {
                  value: o.description,
                  onChange: (b) => v("description", b.target.value),
                  maxLength: 600,
                }),
              }),
            ],
          }),
        ],
      }),
      (0, s.jsxs)("details", {
        className: "optional-cost",
        children: [
          (0, s.jsx)("summary", {
            children: "เพิ่มต้นทุนต่อชิ้น เพื่อดูประมาณการกำไร (ไม่บังคับ)",
          }),
          (0, s.jsx)(U, {
            label: "ต้นทุนต่อชิ้น (บาท)",
            children: (0, s.jsx)("input", {
              type: "number",
              min: "0",
              max: "99999",
              step: "0.01",
              value: o.cost ?? "",
              onChange: (b) => v("cost", b.target.value),
              placeholder: "เว้นว่างได้",
            }),
          }),
          (0, s.jsx)("p", {
            className: "hint",
            children:
              "รวมวัตถุดิบ บรรจุภัณฑ์ และค่าใช้จ่ายต่อชิ้นตามที่ทราบ ยังไม่รวมต้นทุนคงที่ส่วนกลาง",
          }),
        ],
      }),
      t &&
        (0, s.jsx)(U, {
          label: "เหตุผลในการปรับราคา / สต็อก",
          children: (0, s.jsx)("textarea", {
            required: !0,
            value: g,
            onChange: (b) => h(b.target.value),
            placeholder:
              "เช่น เพิ่มต้นทุนกล่อง / ลูกค้าสนใจมากขึ้น / เตรียมรับวันกีฬาสี",
          }),
        }),
      (0, s.jsxs)(A, {
        variant: "full",
        disabled: p || !o.name.trim() || (!!t && !g.trim()),
        children: [
          p ? "กำลังอ่านภาพ…" : "บันทึกสินค้า",
          " ",
          (0, s.jsx)(_t, { name: "check" }),
        ],
      }),
    ],
  });
}
function s1({ id: t }) {
  let { data: e, user: a, dispatch: l, setModal: n, toast: i } = Q(),
    c = e.shops.find((z) => z.id === t),
    [u, o] = (0, T.useState)(c?.name || ""),
    [d, g] = (0, T.useState)(c?.tagline || ""),
    [h, p] = (0, T.useState)(c?.members || [a.id]),
    [r, v] = (0, T.useState)(c?.color || "lime"),
    b = e.users.filter(
      (z) => z.role === "student" && z.classId === a.classId && z.id !== a.id,
    );
  return (0, s.jsxs)("form", {
    onSubmit: (z) => {
      (z.preventDefault(),
        l({
          type: "SHOP",
          item: {
            id: t || St("s"),
            name: u.trim(),
            tagline: d,
            members: h,
            classId: c?.classId || a.classId,
            emoji: c?.emoji || "🌱",
            color: r,
          },
        }),
        i("บันทึกหน้าร้านและทีมแล้ว"),
        n(null));
    },
    children: [
      (0, s.jsx)(U, {
        label: "ชื่อร้าน",
        children: (0, s.jsx)("input", {
          required: !0,
          value: u,
          onChange: (z) => o(z.target.value),
          maxLength: 40,
        }),
      }),
      (0, s.jsx)(U, {
        label: "เรื่องราวสั้น ๆ ของร้าน",
        children: (0, s.jsx)("textarea", {
          value: d,
          onChange: (z) => g(z.target.value),
          maxLength: 150,
        }),
      }),
      (0, s.jsx)(U, {
        label: "สีหน้าร้าน",
        children: (0, s.jsxs)("select", {
          value: r,
          onChange: (z) => v(z.target.value),
          children: [
            (0, s.jsx)("option", { value: "lime", children: "เขียวมะนาว" }),
            (0, s.jsx)("option", { value: "peach", children: "พีช" }),
            (0, s.jsx)("option", { value: "lavender", children: "ม่วงอ่อน" }),
          ],
        }),
      }),
      (0, s.jsx)("h3", { children: "ชวนเพื่อนในห้องมาเป็นทีม" }),
      (0, s.jsx)("p", {
        className: "hint",
        children: "สมาชิกทีมใช้สินค้า คำสั่งซื้อ และประวัติร้านร่วมกัน",
      }),
      b.map((z) => {
        let f = e.shops.find((m) => m.id !== t && m.members.includes(z.id));
        return (0, s.jsxs)(
          "label",
          {
            className: "checkbox",
            children: [
              (0, s.jsx)("input", {
                type: "checkbox",
                checked: h.includes(z.id),
                disabled: !!f && !h.includes(z.id),
                onChange: (m) =>
                  p(
                    m.target.checked
                      ? [...h, z.id]
                      : h.filter((x) => x !== z.id),
                  ),
              }),
              z.avatar,
              " ",
              z.name,
              " ",
              f &&
                (0, s.jsxs)("small", {
                  children: ["มีร้าน ", f.name, " แล้ว"],
                }),
            ],
          },
          z.id,
        );
      }),
      (0, s.jsx)(A, {
        variant: "full",
        disabled: !u.trim(),
        children: "บันทึกร้าน",
      }),
    ],
  });
}
function c1() {
  let [t, e] = (0, T.useState)(100),
    [a, l] = (0, T.useState)(20),
    [n, i] = (0, T.useState)(35),
    [c, u] = (0, T.useState)(20),
    o = Qu(n, Math.max(c, 1), t, a);
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsx)("p", {
        children: "ลองวางแผนก่อนนำตัวเลขไปใช้กับสินค้าของเรา",
      }),
      (0, s.jsx)("div", {
        className: "two-col",
        children: [
          ["ต้นทุนคงที่รวม (บาท)", t, e, 0],
          ["ต้นทุนผันแปร / ชิ้น", a, l, 0],
          ["ราคาขาย / ชิ้น", n, i, 1],
          ["จำนวนที่คาดว่าจะขาย", c, u, 1],
        ].map(([d, g, h, p]) =>
          (0, s.jsx)(
            U,
            {
              label: d,
              children: (0, s.jsx)("input", {
                type: "number",
                min: p,
                value: g,
                onChange: (r) => h(Math.max(p, Number(r.target.value))),
              }),
            },
            d,
          ),
        ),
      }),
      (0, s.jsxs)("div", {
        className: "metric-grid",
        children: [
          (0, s.jsx)(P, {
            label: "จุดคุ้มทุน",
            value:
              o.breakeven === null ? "ยังคุ้มทุนไม่ได้" : o.breakeven + " ชิ้น",
          }),
          (0, s.jsx)(P, {
            label: "ต้นทุนเฉลี่ยต่อชิ้น",
            value: "฿" + o.unit.toFixed(2),
          }),
          (0, s.jsx)(P, {
            label: "กำไรตามสมมติฐาน",
            value: "฿" + Nt(o.profit),
            color: o.profit >= 0 ? "lime" : "peach",
          }),
        ],
      }),
      (0, s.jsx)("p", {
        className: "hint",
        children:
          "สมมติว่าขายครบตามจำนวนที่กรอก ผลลัพธ์จะเปลี่ยนเมื่อมีของเหลือหรือต้นทุนเพิ่มเติม",
      }),
    ],
  });
}
function u1({ id: t }) {
  let { data: e, user: a, role: l, dispatch: n, setModal: i, toast: c } = Q(),
    u = e.classes.find((v) => v.id === t),
    [o, d] = (0, T.useState)(u?.name || ""),
    [g, h] = (0, T.useState)(
      u?.code || "BIZ" + Math.floor(1e3 + Math.random() * 9e3),
    ),
    [p, r] = (0, T.useState)(
      u?.teacherId ||
        (l === "teacher"
          ? a.id
          : e.users.find((v) => v.role === "teacher")?.id || ""),
    );
  return (0, s.jsxs)("form", {
    onSubmit: (v) => {
      if (
        (v.preventDefault(),
        e.classes.some((b) => b.id !== t && b.code === g.toUpperCase().trim()))
      ) {
        c("รหัสห้องนี้ถูกใช้แล้ว");
        return;
      }
      (n({
        type: "CLASS",
        item: {
          id: t || St("c"),
          name: o.trim(),
          code: g.toUpperCase().trim(),
          teacherId: p,
        },
      }),
        c("บันทึกห้องเรียนแล้ว"),
        i(null));
    },
    children: [
      (0, s.jsx)(U, {
        label: "ชื่อห้องเรียน",
        children: (0, s.jsx)("input", {
          required: !0,
          maxLength: 80,
          value: o,
          onChange: (v) => d(v.target.value),
        }),
      }),
      (0, s.jsx)(U, {
        label: "รหัสเข้าร่วม",
        children: (0, s.jsx)("input", {
          required: !0,
          pattern: "[A-Za-z0-9]{4,12}",
          title: "ตัวอักษรภาษาอังกฤษและตัวเลข 4–12 ตัว",
          value: g,
          onChange: (v) => h(v.target.value),
        }),
      }),
      l === "admin" &&
        (0, s.jsx)(U, {
          label: "ครูประจำห้อง",
          children: (0, s.jsx)("select", {
            value: p,
            onChange: (v) => r(v.target.value),
            children: e.users
              .filter((v) => v.role === "teacher")
              .map((v) =>
                (0, s.jsx)("option", { value: v.id, children: v.name }, v.id),
              ),
          }),
        }),
      (0, s.jsx)(A, {
        disabled: !o.trim() || !g.trim() || !p,
        children: "บันทึกห้องเรียน",
      }),
    ],
  });
}
function Hp({
  id: t,
  userRole: e = "student",
  classId: a,
  teacherMode: l = !1,
}) {
  let { data: n, dispatch: i, setModal: c, toast: u } = Q(),
    o = n.users.find((f) => f.id === t),
    [d, g] = (0, T.useState)(o?.name || ""),
    [h, p] = (0, T.useState)(t || ""),
    [r, v] = (0, T.useState)(o?.classId || a || ""),
    [b, z] = (0, T.useState)(
      n.shops.find((f) => f.members.includes(t))?.id || "",
    );
  return (0, s.jsxs)("form", {
    onSubmit: (f) => {
      if ((f.preventDefault(), !t && n.users.some((x) => x.id === h.trim()))) {
        u("ชื่อผู้ใช้นี้มีอยู่แล้ว");
        return;
      }
      let m = t || h.trim();
      if (
        (i({
          type: "USER",
          item: {
            id: m,
            name: d.trim(),
            role: o?.role || e,
            avatar: o?.avatar || (e === "teacher" ? "👩🏻‍🏫" : "🙂"),
            classId: r || null,
          },
        }),
        l)
      ) {
        n.shops
          .filter((y) => y.members.includes(m) && y.id !== b)
          .forEach((y) =>
            i({
              type: "SHOP",
              item: { ...y, members: y.members.filter((E) => E !== m) },
            }),
          );
        let x = n.shops.find((y) => y.id === b);
        x &&
          !x.members.includes(m) &&
          i({ type: "SHOP", item: { ...x, members: [...x.members, m] } });
      }
      (u("บันทึกสมาชิกแล้ว"), c(null));
    },
    children: [
      (0, s.jsx)(U, {
        label: "ชื่อที่แสดง",
        children: (0, s.jsx)("input", {
          required: !0,
          value: d,
          onChange: (f) => g(f.target.value),
          maxLength: 50,
        }),
      }),
      (0, s.jsx)(U, {
        label: "ชื่อผู้ใช้สำหรับเข้าสู่ระบบ",
        children: (0, s.jsx)("input", {
          required: !0,
          pattern: "[a-zA-Z0-9_]{3,30}",
          title: "ภาษาอังกฤษ ตัวเลข หรือขีดล่าง 3–30 ตัว",
          disabled: !!t,
          value: h,
          onChange: (f) => p(f.target.value),
          placeholder: "เช่น student5",
        }),
      }),
      (0, s.jsx)("p", {
        className: "hint",
        children: "บัญชีต้นแบบใช้รหัสผ่านใดก็ได้ ไม่มีระบบยืนยันตัวตนจริง",
      }),
      e === "student" &&
        !l &&
        (0, s.jsx)(U, {
          label: "ห้องเรียน",
          children: (0, s.jsxs)("select", {
            value: r,
            onChange: (f) => v(f.target.value),
            children: [
              (0, s.jsx)("option", {
                value: "",
                children: "ยังไม่เข้าห้องเรียน",
              }),
              n.classes.map((f) =>
                (0, s.jsx)("option", { value: f.id, children: f.name }, f.id),
              ),
            ],
          }),
        }),
      l &&
        (0, s.jsx)(U, {
          label: "ทีมร้านค้า",
          children: (0, s.jsxs)("select", {
            value: b,
            onChange: (f) => z(f.target.value),
            children: [
              (0, s.jsx)("option", { value: "", children: "ยังไม่อยู่ในทีม" }),
              n.shops
                .filter((f) => f.classId === a)
                .map((f) =>
                  (0, s.jsx)("option", { value: f.id, children: f.name }, f.id),
                ),
            ],
          }),
        }),
      (0, s.jsx)(A, {
        disabled: !d.trim() || !h.trim(),
        children: "บันทึกสมาชิก",
      }),
    ],
  });
}
function o1({ classId: t }) {
  let { user: e, dispatch: a, setModal: l, toast: n } = Q(),
    [i, c] = (0, T.useState)(""),
    [u, o] = (0, T.useState)(""),
    [d, g] = (0, T.useState)("แนวคิดธุรกิจ"),
    [h, p] = (0, T.useState)(null),
    [r, v] = (0, T.useState)(!1);
  return (0, s.jsxs)("form", {
    onSubmit: (b) => {
      if ((b.preventDefault(), !u.trim() && !h)) {
        n("เพิ่มเนื้อหาหรือแนบไฟล์ก่อนเผยแพร่");
        return;
      }
      (a({
        type: "CONTENT",
        item: {
          id: St("ct"),
          classId: t,
          teacherId: e.id,
          title: i.trim(),
          category: d,
          body: u,
          file: h,
          date: ct(),
        },
      }),
        n("เพิ่มบทเรียนและแจ้งนักเรียนแล้ว"),
        l(null));
    },
    children: [
      (0, s.jsx)(U, {
        label: "ชื่อบทเรียน",
        children: (0, s.jsx)("input", {
          required: !0,
          value: i,
          onChange: (b) => c(b.target.value),
        }),
      }),
      (0, s.jsx)(U, {
        label: "หมวดหมู่",
        children: (0, s.jsx)("select", {
          value: d,
          onChange: (b) => g(b.target.value),
          children: [
            "แนวคิดธุรกิจ",
            "การตลาด",
            "ภาพ & โปสเตอร์",
            "วิเคราะห์ & สะท้อนผล",
          ].map((b) => (0, s.jsx)("option", { children: b }, b)),
        }),
      }),
      (0, s.jsx)(U, {
        label: "เนื้อหาการสอน",
        children: (0, s.jsx)("textarea", {
          rows: "6",
          value: u,
          onChange: (b) => o(b.target.value),
          placeholder: "เพิ่มคำอธิบาย ตัวอย่าง หรือกิจกรรมให้เด็ก ๆ ลองทำ",
        }),
      }),
      (0, s.jsx)(U, {
        label: "ไฟล์ประกอบ PDF หรือรูปภาพ (ไม่เกิน 2 MB)",
        children: (0, s.jsx)("input", {
          type: "file",
          accept: ".pdf,.png,.jpg,.jpeg,.webp",
          onChange: async (b) => {
            let z = b.target.files[0];
            if (z) {
              v(!0);
              try {
                if (
                  ![
                    "application/pdf",
                    "image/png",
                    "image/jpeg",
                    "image/webp",
                  ].includes(z.type)
                )
                  throw Error("ใช้ไฟล์ PDF, JPG, PNG หรือ WebP");
                p({ name: z.name, type: z.type, data: await Qp(z) });
              } catch (f) {
                n(f.message);
              } finally {
                v(!1);
              }
            }
          },
        }),
      }),
      h &&
        (0, s.jsxs)("p", {
          className: "hint",
          children: ["แนบแล้ว: ", h.name],
        }),
      (0, s.jsx)(A, {
        disabled: r || !i.trim(),
        children: r ? "กำลังอ่านไฟล์…" : "เผยแพร่บทเรียนในห้อง",
      }),
    ],
  });
}
function r1({ classId: t }) {
  let { user: e, dispatch: a, setModal: l, toast: n } = Q(),
    [i, c] = (0, T.useState)(""),
    [u, o] = (0, T.useState)(""),
    [d, g] = (0, T.useState)(
      new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10),
    );
  return (0, s.jsxs)("form", {
    onSubmit: (h) => {
      (h.preventDefault(),
        a({
          type: "ASSIGN",
          item: {
            id: St("a"),
            classId: t,
            teacherId: e.id,
            title: i.trim(),
            body: u.trim(),
            due: d,
          },
        }),
        n("มอบหมายงานและแจ้งนักเรียนแล้ว"),
        l(null));
    },
    children: [
      (0, s.jsx)(U, {
        label: "ชื่อภารกิจ",
        children: (0, s.jsx)("input", {
          required: !0,
          value: i,
          onChange: (h) => c(h.target.value),
        }),
      }),
      (0, s.jsx)(U, {
        label: "คำชี้แจง / สิ่งที่ต้องส่ง",
        children: (0, s.jsx)("textarea", {
          required: !0,
          rows: "5",
          value: u,
          onChange: (h) => o(h.target.value),
        }),
      }),
      (0, s.jsx)(U, {
        label: "กำหนดส่ง",
        children: (0, s.jsx)("input", {
          required: !0,
          type: "date",
          value: d,
          onChange: (h) => g(h.target.value),
        }),
      }),
      (0, s.jsx)(A, {
        disabled: !i.trim() || !u.trim(),
        children: "มอบหมายภารกิจ",
      }),
    ],
  });
}
function d1({ id: t }) {
  let { data: e, dispatch: a, setModal: l, toast: n } = Q(),
    i = e.submissions.find((g) => g.id === t),
    [c, u] = (0, T.useState)(i?.score ?? 80),
    [o, d] = (0, T.useState)(i?.feedback || "");
  return (0, s.jsxs)(s.Fragment, {
    children: [
      (0, s.jsxs)(dt, {
        color: "lime",
        children: [
          e.users.find((g) => g.id === i.userId)?.name,
          " \xB7 ส่ง ",
          Pt(i.date),
        ],
      }),
      (0, s.jsx)("h3", {
        children: e.assignments.find((g) => g.id === i.assignmentId)?.title,
      }),
      (0, s.jsx)("div", {
        className: "submitted-work pre-wrap",
        children: i.text,
      }),
      (0, s.jsxs)("form", {
        onSubmit: (g) => {
          (g.preventDefault(),
            a({ type: "GRADE", id: t, score: Number(c), feedback: o.trim() }),
            n("ส่งคะแนนและข้อเสนอแนะแล้ว"),
            l(null));
        },
        children: [
          (0, s.jsx)(U, {
            label: "คะแนน (เต็ม 100)",
            children: (0, s.jsx)("input", {
              type: "number",
              required: !0,
              min: "0",
              max: "100",
              value: c,
              onChange: (g) => u(g.target.value),
            }),
          }),
          (0, s.jsx)(U, {
            label: "ข้อเสนอแนะเพื่อพัฒนาต่อ",
            children: (0, s.jsx)("textarea", {
              required: !0,
              value: o,
              onChange: (g) => d(g.target.value),
            }),
          }),
          (0, s.jsx)(A, { disabled: !o.trim(), children: "บันทึกผลประเมิน" }),
        ],
      }),
    ],
  });
}
function f1({ shopId: t }) {
  let { user: e, dispatch: a, setModal: l, toast: n } = Q(),
    [i, c] = (0, T.useState)(80),
    [u, o] = (0, T.useState)("");
  return (0, s.jsxs)("form", {
    onSubmit: (d) => {
      (d.preventDefault(),
        a({
          type: "FEEDBACK",
          item: {
            id: St("f"),
            shopId: t,
            teacherId: e.id,
            score: Number(i),
            text: u.trim(),
            date: ct(),
          },
        }),
        n("ส่งข้อเสนอแนะถึงทีมร้านค้าแล้ว"),
        l(null));
    },
    children: [
      (0, s.jsx)("p", {
        children:
          "ประเมินการนำความรู้ไปใช้ เหตุผลในการตัดสินใจ และการปรับปรุงจากผลที่เกิดขึ้น",
      }),
      (0, s.jsx)(U, {
        label: "คะแนนพัฒนาการ (เต็ม 100)",
        children: (0, s.jsx)("input", {
          required: !0,
          type: "number",
          min: "0",
          max: "100",
          value: i,
          onChange: (d) => c(d.target.value),
        }),
      }),
      (0, s.jsx)(U, {
        label: "ข้อเสนอแนะ",
        children: (0, s.jsx)("textarea", {
          required: !0,
          rows: "5",
          value: u,
          onChange: (d) => o(d.target.value),
        }),
      }),
      (0, s.jsx)(A, { disabled: !u.trim(), children: "ส่งถึงนักเรียน" }),
    ],
  });
}
function p1() {
  let { data: t, user: e, dispatch: a, setModal: l, toast: n } = Q(),
    [i, c] = (0, T.useState)(
      new URLSearchParams(location.search).get("join") || "",
    );
  return (0, s.jsxs)("form", {
    onSubmit: (u) => {
      u.preventDefault();
      let o = i.trim().split("join=").pop().split("&")[0].toUpperCase();
      if (!t.classes.some((d) => d.code === o)) {
        n("ไม่พบรหัสห้องเรียนนี้");
        return;
      }
      (a({ type: "JOIN", user: e.id, code: i }),
        n("เข้าร่วมห้องเรียนเรียบร้อย"),
        l(null));
    },
    children: [
      (0, s.jsx)("p", { children: "ใส่รหัสหรือลิงก์เชิญที่ได้รับจากคุณครู" }),
      (0, s.jsx)(U, {
        label: "รหัสห้อง / ลิงก์เชิญ",
        children: (0, s.jsx)("input", {
          required: !0,
          value: i,
          onChange: (u) => c(u.target.value),
          placeholder: "เช่น BIZ401",
        }),
      }),
      (0, s.jsx)("p", {
        className: "hint",
        children: "การเข้าห้องใหม่จะเปลี่ยนห้องปัจจุบันของบัญชีนี้",
      }),
      (0, s.jsx)(A, { children: "เข้าร่วมห้องเรียน" }),
    ],
  });
}
function m1({ modal: t }) {
  let { data: e, setModal: a } = Q(),
    l = "",
    n,
    i = !1,
    c = () => a(null);
  switch (t.type) {
    case "product":
      ((l = "เจอของที่ถูกใจแล้ว?"),
        (n = (0, s.jsx)(Kh, { id: t.id })),
        (i = !0));
      break;
    case "cart":
      ((l = "ตะกร้าของเรา"), (n = (0, s.jsx)(Jh, {})));
      break;
    case "store":
      ((l = "แวะมารู้จักร้านนี้"),
        (n = (0, s.jsx)(e1, { id: t.id })),
        (i = !0));
      break;
    case "orders":
      ((l = "คำสั่งซื้อของฉัน"), (n = (0, s.jsx)(Vu, {})));
      break;
    case "sellerOrders":
      ((l = "คำสั่งซื้อของร้าน"),
        (n = (0, s.jsx)(Vu, { sellerShop: t.shopId })));
      break;
    case "assignment":
      ((l = "ภารกิจการเรียนรู้"), (n = (0, s.jsx)($h, { id: t.id })));
      break;
    case "content": {
      let u = e.contents.find((o) => o.id === t.id);
      ((l = u?.title),
        (n = (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(dt, { color: "lime", children: u?.category }),
            (0, s.jsx)("p", {
              className: "content-body pre-wrap",
              children: u?.body,
            }),
            u?.file &&
              (0, s.jsxs)(s.Fragment, {
                children: [
                  (0, s.jsxs)("a", {
                    className: "btn outline",
                    href: u.file.data,
                    download: u.file.name,
                    children: ["ดาวน์โหลด ", u.file.name, " ↗"],
                  }),
                  u.file.type.startsWith("image/") &&
                    (0, s.jsx)("img", {
                      className: "lesson-attachment",
                      src: u.file.data,
                      alt: u.file.name,
                    }),
                ],
              }),
          ],
        })));
      break;
    }
    case "productForm":
      ((l = t.id ? "ปรับแผนสินค้า" : "เพิ่มไอเดียใหม่ลงร้าน"),
        (n = (0, s.jsx)(i1, { ...t })),
        (i = !0));
      break;
    case "shopForm":
      ((l = "ร้านของเรา ทีมของเรา"), (n = (0, s.jsx)(s1, { ...t })));
      break;
    case "calculator":
      ((l = "เครื่องคิดเลขเจ้าของร้าน"), (n = (0, s.jsx)(c1, {})));
      break;
    case "classForm":
      ((l = t.id ? "แก้ไขห้องเรียน" : "สร้างห้องเรียนใหม่"),
        (n = (0, s.jsx)(u1, { ...t })));
      break;
    case "studentForm":
      ((l = t.id ? "จัดการนักเรียนและทีม" : "เพิ่มนักเรียนในห้อง"),
        (n = (0, s.jsx)(Hp, { ...t, teacherMode: !0 })));
      break;
    case "userForm":
      ((l = t.id ? "แก้ไขสมาชิก" : "เพิ่มสมาชิก"),
        (n = (0, s.jsx)(Hp, { ...t })));
      break;
    case "contentForm":
      ((l = "เพิ่มบทเรียนจากคุณครู"), (n = (0, s.jsx)(o1, { ...t })));
      break;
    case "assignForm":
      ((l = "ชวนเด็ก ๆ ลงมือทำ"), (n = (0, s.jsx)(r1, { ...t })));
      break;
    case "grade":
      ((l = "ตรวจงานและให้ข้อเสนอแนะ"), (n = (0, s.jsx)(d1, { ...t })));
      break;
    case "feedback":
      ((l = "ส่งต่อคำแนะนำดี ๆ"), (n = (0, s.jsx)(f1, { ...t })));
      break;
    case "join":
      ((l = "เข้าร่วมห้องเรียน"), (n = (0, s.jsx)(p1, {})));
      break;
    case "chat":
      ((l = "คุยกันสักนิด"), (n = (0, s.jsx)(l1, { ...t })));
      break;
    case "invite":
      ((l = "ลิงก์เชิญเข้าห้องเรียน"),
        (n = (0, s.jsx)("input", {
          "aria-label": "ลิงก์เชิญ",
          readOnly: !0,
          value: t.link,
          onFocus: (u) => u.target.select(),
        })));
      break;
    case "confirm":
      ((l = t.title),
        (n = (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)("p", { children: t.body }),
            (0, s.jsxs)("div", {
              className: "actions",
              children: [
                (0, s.jsx)(A, {
                  variant: "outline",
                  onClick: c,
                  children: "ยกเลิก",
                }),
                (0, s.jsx)(A, {
                  variant: "danger",
                  onClick: () => {
                    (t.action(), c());
                  },
                  children: "ยืนยันลบ",
                }),
              ],
            }),
          ],
        })));
      break;
    default:
      return null;
  }
  return (0, s.jsx)(
    Xh,
    { title: l, onClose: c, wide: i, children: n },
    t.type + (t.id || t.to || ""),
  );
}
var g1 = (0, jp.createRoot)(document.getElementById("root"));
g1.render((0, s.jsx)(Zh, {}));
function h1({ price: t, qty: e }) {
  let a = Math.max(t * 50, 1100, 1),
    l = (c) => 30 + (c / 50) * 290,
    n = (c) => 150 - (c / a) * 130,
    i = t > 20 ? 100 / (t - 20) : null;
  return (0, s.jsxs)("div", {
    className: "breakeven-chart",
    children: [
      (0, s.jsxs)("svg", {
        viewBox: "0 0 345 184",
        role: "img",
        "aria-label": `กราฟจุดคุ้มทุนที่ราคา ${t} บาท ผลที่ ${e} ชิ้น กำไร ${(t - 20) * e - 100} บาท`,
        children: [
          (0, s.jsx)("path", {
            d: "M30 15V150H328",
            stroke: "#c9cfbb",
            fill: "none",
          }),
          (0, s.jsx)("path", {
            d: `M${l(0)} ${n(100)} L${l(50)} ${n(1100)}`,
            stroke: "#ff6635",
            strokeWidth: "3",
            fill: "none",
          }),
          (0, s.jsx)("path", {
            d: `M${l(0)} ${n(0)} L${l(50)} ${n(t * 50)}`,
            stroke: "#81a000",
            strokeWidth: "3",
            fill: "none",
          }),
          (0, s.jsx)("path", {
            d: `M${l(e)} 20V150`,
            stroke: "#aaa",
            strokeDasharray: "4 4",
          }),
          i &&
            i <= 50 &&
            (0, s.jsxs)(s.Fragment, {
              children: [
                (0, s.jsx)("circle", {
                  cx: l(i),
                  cy: n(t * i),
                  r: "6",
                  fill: "#242820",
                }),
                (0, s.jsx)("text", {
                  x: Math.min(l(i) + 10, 245),
                  y: Math.max(n(t * i) - 10, 22),
                  fontSize: "10",
                  fill: "#4d573e",
                  children: "จุดคุ้มทุน",
                }),
              ],
            }),
          (0, s.jsx)("circle", {
            cx: l(e),
            cy: n(t * e),
            r: "4",
            fill: "#81a000",
          }),
          (0, s.jsx)("text", {
            x: "22",
            y: "170",
            fontSize: "10",
            fill: "#859272",
            children: "0",
          }),
          (0, s.jsx)("text", {
            x: "300",
            y: "170",
            fontSize: "10",
            fill: "#859272",
            children: "50 ชิ้น",
          }),
          (0, s.jsx)("text", {
            x: "5",
            y: "11",
            fontSize: "9",
            fill: "#859272",
            children: "บาท",
          }),
        ],
      }),
      (0, s.jsxs)("div", {
        className: "chart-legend",
        children: [
          (0, s.jsxs)("span", {
            children: [
              (0, s.jsx)("i", { style: { background: "#81a000" } }),
              "รายรับ",
            ],
          }),
          (0, s.jsxs)("span", {
            children: [(0, s.jsx)("i", { className: "orange" }), "ต้นทุนรวม"],
          }),
          (0, s.jsxs)("span", { children: ["เส้นประ: ", e, " ชิ้น"] }),
        ],
      }),
    ],
  });
}
export { g1 as appRoot };
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
