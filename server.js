require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./db/supabase');
const { supabase, sb } = db;
const auth = require('./db/auth');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 10 * 1024 * 1024) { // 10MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  const [rawPath] = req.url.split('?');
  const cleanUrl = rawPath.split('#')[0];

  // ----------------------------------------------------------------
  // REST API Endpoints
  // ----------------------------------------------------------------
  if (cleanUrl.startsWith('/api/')) {
    try {
      // 1. Health & Database Status Check
      if (cleanUrl === '/api/health' && req.method === 'GET') {
        return sendJson(res, 200, {
          status: 'ok',
          database: db.isCloudConfigured ? 'supabase_cloud' : 'local_storage',
          timestamp: new Date().toISOString(),
        });
      }

      // 1.1 Authentication Endpoints
      if (cleanUrl === '/api/auth/login' && req.method === 'POST') {
        const { username, password } = await parseBody(req);
        const result = await auth.login(username, password);
        return sendJson(res, result.success ? 200 : 401, result);
      }

      if (cleanUrl === '/api/auth/register' && req.method === 'POST') {
        const body = await parseBody(req);
        const result = await auth.register(body);
        return sendJson(res, result.success ? 200 : 400, result);
      }

      if (cleanUrl === '/api/auth/accounts' && req.method === 'GET') {
        return sendJson(res, 200, auth.getQuickAccounts());
      }

      // 2. Fetch full system state
      if (cleanUrl === '/api/state' && req.method === 'GET') {
        const state = await db.getState();
        return sendJson(res, 200, state);
      }

      // 3. Dispatch & Sync an Action
      if (cleanUrl === '/api/action' && req.method === 'POST') {
        const { action, currentState } = await parseBody(req);
        if (!action) {
          return sendJson(res, 400, { error: 'Action object is required' });
        }
        const result = await db.syncAction(action, currentState);
        return sendJson(res, 200, result);
      }

      // 4. Batch Sync State to Supabase Cloud & Local Storage
      if (cleanUrl === '/api/sync' && req.method === 'POST') {
        const { state } = await parseBody(req);
        if (!state) {
          return sendJson(res, 400, { error: 'State object is required' });
        }
        const result = await db.syncFullState(state);
        return sendJson(res, 200, { success: true, ...result, savedAt: new Date().toISOString() });
      }

      return sendJson(res, 404, { error: 'API endpoint not found' });
    } catch (err) {
      console.error('[API Error]:', err);
      return sendJson(res, 500, { error: err.message });
    }
  }

  // ----------------------------------------------------------------
  // Static File Serving
  // ----------------------------------------------------------------
  let filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);

  // SPA fallback for non-file requests
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Server Error: ' + err.message);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`EduMarket is running at: http://localhost:${PORT}`);
  console.log(`Database Mode: ${db.isCloudConfigured ? '🟢 Supabase Cloud' : '🟡 Local Storage (data/local-db.json)'}`);
  console.log('API Endpoints available: /api/state, /api/action, /api/health');
  console.log('====================================================');
});
