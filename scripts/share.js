const localtunnel = require('localtunnel');
const http = require('http');

const PORT = process.env.PORT || 3000;

async function startTunnel() {
  console.log('====================================================');
  console.log('🌐 กำลังสร้างลิงก์สาธารณะ (Public URL) สำหรับแชร์ให้เพื่อน...');
  console.log('====================================================\n');

  try {
    // 1. Fetch public IP password for localtunnel
    let ip = '';
    try {
      const ipRes = await fetch('https://loca.lt/mytunnelpassword');
      ip = (await ipRes.text()).trim();
    } catch (e) {
      ip = 'ดูที่เว็บ https://loca.lt/mytunnelpassword';
    }

    // 2. Open Tunnel
    const tunnel = await localtunnel({ port: PORT });

    console.log('🎉 ลิงก์ออนไลน์ของคุณพร้อมแล้ว! ส่งข้อมูล 2 อย่างนี้ให้เพื่อน:\n');
    console.log('👉 ลิงก์เข้าใช้งาน (URL):', tunnel.url);
    console.log('🔑 รหัสผ่านครั้งแรก (Tunnel Password):', ip);
    console.log('\n----------------------------------------------------');
    console.log('💡 วิธีให้เพื่อนเข้า:');
    console.log('1. ส่งลิงก์ด้านบนให้เพื่อน');
    console.log('2. เมื่อเพื่อนเปิดหน้าเว็บครั้งแรก จะมีช่อง "Tunnel Password"');
    console.log('   ให้เพื่อนใส่เลข:', ip, 'แล้วกด "Click to Submit"');
    console.log('3. จากนั้นเพื่อนจะเข้าสู่หน้าเว็บ EduMarket ล็อกอินและซื้อขายได้ทันที!');
    console.log('----------------------------------------------------');
    console.log('\n(กด Ctrl + C เพื่อปิดการแชร์ลิงก์ออนไลน์)\n');

    tunnel.on('close', () => {
      console.log('Tunnel closed.');
    });
  } catch (err) {
    console.error('❌ ไม่สามารถสร้าง Tunnel ได้:', err.message);
  }
}

startTunnel();

