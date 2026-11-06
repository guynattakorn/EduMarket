const fs = require('fs');

let js = fs.readFileSync('app.js', 'utf8');

console.log('Original app.js size:', js.length);

// 1. Update y and E and auto-login in Zh()
const targetZh = 'y=N=>{if(!["student","teacher","admin"].includes(N))return;let Z=N==="teacher"?"teacher1":N==="admin"?"admin1":"student1",M=t.users.find(nt=>nt.id===Z)||t.users.find(nt=>nt.role===N)||{...Mn().users.find(nt=>nt.id===Z),classId:N==="student"&&t.classes[0]?.id||null};t.users.some(nt=>nt.id===M.id)||e({type:"USER",item:M}),l(M),i("admin"),u(N==="teacher"?"classroom":"market"),r([]),N==="student"&&new URLSearchParams(location.search).has("join")&&d({type:"join"})},E=()=>{l(null),d(null),b(null),r([]),u("market")},';

const replacementZh = `y=(N,U_obj)=>{let M=U_obj||(N==="teacher"?t.users.find(nt=>nt.id==="teacher1"):N==="admin"?t.users.find(nt=>nt.id==="admin1"):t.users.find(nt=>nt.id==="student1"))||t.users.find(nt=>nt.role===N)||Mn().users[0];t.users.some(nt=>nt.id===M.id)||e({type:"USER",item:M}),l(M),i(M.role==="admin"?"admin":M.role),u(M.role==="teacher"?"classroom":"market"),r([]);try{localStorage.setItem('edumarket_auth_user',JSON.stringify(M))}catch(err){}N==="student"&&new URLSearchParams(location.search).has("join")&&d({type:"join"})},E=()=>{try{localStorage.removeItem('edumarket_auth_user')}catch(err){}l(null),d(null),b(null),r([]),u("market")},`;

if (!js.includes(targetZh)) {
  console.error('Target Zh not found in app.js!');
  process.exit(1);
}
js = js.replace(targetZh, replacementZh);
console.log('✅ Updated y and E in Zh()');

// 2. Add auto-login on initial mount
const targetEffect = `(0,T.useEffect)(()=>{if(!g)return;let N=setTimeout(()=>h(""),4200);return()=>clearTimeout(N)},[g])`;
const replacementEffect = `(0,T.useEffect)(()=>{try{let saved=JSON.parse(localStorage.getItem('edumarket_auth_user'));if(saved&&saved.id){let found=t.users.find(nt=>nt.id===saved.id)||saved;l(found),i(found.role==="admin"?"admin":found.role),u(found.role==="teacher"?"classroom":"market")}}catch(err){}},[]),` + targetEffect;

if (!js.includes(targetEffect)) {
  console.error('Target Effect not found in app.js!');
  process.exit(1);
}
js = js.replace(targetEffect, replacementEffect);
console.log('✅ Added auto-login session restore in Zh()');

// 3. Replace Vh component with Real Authentication Component
const startVh = js.indexOf('function Vh({onLogin:t}){');
const endVh = js.indexOf('function Lu(', startVh);

if (startVh === -1 || endVh === -1) {
  console.error('Vh function range not found!');
  process.exit(1);
}

const newVhCode = `function Vh({onLogin:t}){
  let[e,a]=(0,T.useState)("student"),
     [l,n]=(0,T.useState)(""),
     [i,c]=(0,T.useState)(""),
     [err,setErr]=(0,T.useState)(""),
     [loading,setLoading]=(0,T.useState)(false),
     [isReg,setIsReg]=(0,T.useState)(false),
     [regName,setRegName]=(0,T.useState)(""),
     [regClass,setRegClass]=(0,T.useState)("c1");

  let quickUsers = [
    { label: "👩🏻 มินต์ (ม.4/1)", u: "mint", p: "password123", role: "student" },
    { label: "👦🏻 ปัน (ม.4/1)", u: "pun", p: "password123", role: "student" },
    { label: "👩🏽 ฟ้า (ม.4/1)", u: "fah", p: "password123", role: "student" },
    { label: "👨🏻 ต้น (ม.4/2)", u: "ton", p: "password123", role: "student" },
    { label: "👩🏻‍🏫 ครูพลอย (ม.4/1)", u: "ploy", p: "password123", role: "teacher" },
    { label: "🧑🏻‍💻 ผู้ดูแลระบบ", u: "admin", p: "admin123", role: "admin" }
  ];

  let doQuickLogin = async (qu) => {
    n(qu.u);
    c(qu.p);
    a(qu.role);
    setErr("");
    setLoading(true);
    try {
      let res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: qu.u, password: qu.p })
      });
      let data = await res.json();
      if (data.success && data.user) {
        t(data.user.role, data.user);
      } else {
        setErr(data.error || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch(ex) {
      setErr("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    } finally {
      setLoading(false);
    }
  };

  let handleSubmit = async (ev) => {
    ev.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let endpoint = isReg ? '/api/auth/register' : '/api/auth/login';
      let payload = isReg
        ? { name: regName, username: l, password: i, role: e, classId: regClass }
        : { username: l, password: i };

      let res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      let data = await res.json();
      if (data.success && data.user) {
        t(data.user.role, data.user);
      } else {
        setErr(data.error || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      }
    } catch(ex) {
      setErr("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาตรวจสอบการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (0,s.jsxs)("div",{className:"login-wrap",children:[
    (0,s.jsxs)("div",{className:"login-card",children:[
      (0,s.jsxs)("section",{className:"login-art",children:[
        (0,s.jsxs)("a",{className:"brand",href:"#",children:[
          (0,s.jsxs)("span",{className:"brand-mark",children:["e",(0,s.jsx)("span",{children:"m"})]}),
          (0,s.jsxs)("span",{children:["edu",(0,s.jsx)("span",{className:"brand-thin",children:"market"})]})
        ]}),
        (0,s.jsxs)("div",{className:"login-copy",children:[
          (0,s.jsx)("span",{className:"eyebrow",children:"ร้านเล็ก ๆ เริ่มจากไอเดียใหญ่"}),
          (0,s.jsxs)("h1",{children:["ไอเดียเล็ก ๆ",(0,s.jsx)("br",{}),"เติบโตได้",(0,s.jsx)("span",{children:"ทุกวัน."})]}),
          (0,s.jsxs)("p",{children:["ห้องเรียนธุรกิจที่ได้คิด ได้ลอง",(0,s.jsx)("br",{}),"และลงมือขายจริงในโรงเรียน"]})
        ]}),
        (0,s.jsx)("span",{className:"floating-tag",children:"ระบบฐานข้อมูลจริง · Supabase"}),
        (0,s.jsx)("div",{className:"mascot-circle"}),
        (0,s.jsx)("img",{className:"login-mascot",src:"/assets/student-mascot.webp",alt:"นักเรียน"})
      ]}),
      (0,s.jsxs)("section",{className:"login-form",children:[
        (0,s.jsx)(dt,{color:"lime",children:isReg?"สมัครสมาชิกใหม่":"เข้าสู่ระบบจริง"}),
        (0,s.jsxs)("h2",{children:[
          isReg ? "สร้างบัญชีใหม่" : "ยินดีต้อนรับ",
          (0,s.jsx)("span",{children: isReg ? "เริ่มต้นเส้นทางธุรกิจ" : "เข้าสู่ระบบเพื่อใช้งานจริง" })
        ]}),
        (0,s.jsx)("p",{className:"muted",children:isReg?"กรอกข้อมูลเพื่อลงทะเบียนเข้าสู่ระบบ":"กรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าใช้งาน"}),

        (0,s.jsxs)("div",{className:"login-roles",role:"group",children:[
          (0,s.jsx)("button",{type:"button",className:"login-role "+(!isReg?"selected":""),onClick:()=>{setIsReg(false);setErr("");},children:"เข้าสู่ระบบ"}),
          (0,s.jsx)("button",{type:"button",className:"login-role "+(isReg?"selected":""),onClick:()=>{setIsReg(true);setErr("");},children:"สมัครสมาชิก"})
        ]}),

        err && (0,s.jsx)("div",{style:{padding:"8px 12px",marginBottom:"12px",borderRadius:"8px",background:"#fee2e2",color:"#b91c1c",fontSize:"13px",fontWeight:"500"},children:err}),

        (0,s.jsxs)("form",{onSubmit:handleSubmit,children:[
          isReg && (0,s.jsx)(U,{label:"ชื่อ-นามสกุล",children:(0,s.jsx)("input",{value:regName,onChange:u=>setRegName(u.target.value),placeholder:"เช่น มินต์ รัตนวิชัย",required:true})}),
          (0,s.jsx)(U,{label:"ชื่อผู้ใช้ (Username)",children:(0,s.jsx)("input",{name:"username",autoComplete:"off",value:l,onChange:u=>n(u.target.value),placeholder:"เช่น mint หรือ pun",required:true})}),
          (0,s.jsx)(U,{label:"รหัสผ่าน (Password)",children:(0,s.jsx)("input",{name:"password",type:"password",autoComplete:"off",value:i,onChange:u=>c(u.target.value),placeholder:"รหัสผ่านของคุณ",required:true})}),

          isReg && (0,s.jsx)(U,{label:"ห้องเรียน",children:(0,s.jsxs)("select",{value:regClass,onChange:u=>setRegClass(u.target.value),children:[
            (0,s.jsx)("option",{value:"c1",children:"ม.4/1 (ครูพลอย)"}),
            (0,s.jsx)("option",{value:"c2",children:"ม.4/2 (ครูนนท์)"}),
            (0,s.jsx)("option",{value:"c3",children:"ม.5/1 (ครูเมย์)"}),
            (0,s.jsx)("option",{value:"c4",children:"ม.6/3 (ครูเอก)"})
          ]})}),

          (0,s.jsx)(A,{variant:"black full",disabled:loading||!l.trim()||!i||(isReg&&!regName.trim()),children:loading?"กำลังดำเนินการ...":(isReg?"ลงทะเบียน":"เข้าสู่ระบบ")})
        ]}),

        !isReg && (0,s.jsxs)("div",{style:{marginTop:"20px",paddingTop:"14px",borderTop:"1px solid #eee"},children:[
          (0,s.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#666",marginBottom:"8px"},children:"💡 บัญชีทดสอบด่วน (คลิกเพื่อเข้าใช้งานได้ทันที):"}),
          (0,s.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"},children:quickUsers.map((qu,idx)=>(
            (0,s.jsx)("button",{
              key:idx,
              type:"button",
              onClick:()=>doQuickLogin(qu),
              style:{
                background:"#f3f4f6",
                border:"1px solid #e5e7eb",
                borderRadius:"6px",
                padding:"4px 8px",
                fontSize:"11px",
                cursor:"pointer",
                fontWeight:"500",
                transition:"background 0.15s"
              },
              children:qu.label
            })
          ))})
        ]})
      ]})
    ]}),
    (0,s.jsx)("div",{className:"login-foot",children:"EDUMARKET — เชื่อมต่อระบบฐานข้อมูลจริงบน Supabase"})
  ]});
}`;

js = js.substring(0, startVh) + newVhCode + js.substring(endVh);
fs.writeFileSync('app.js', js, 'utf8');
console.log('✅ Replaced Vh with Real Authentication Form!');
console.log('New app.js size:', js.length);

