(function () {
  const STORAGE_KEY = 'edu-marketplace-classroom-v2';
  let isSyncing = false;
  let syncTimeout = null;
  let dbStatus = { status: 'checking', database: 'unknown' };

  // 1. Intercept localStorage.setItem for automatic two-way sync
  const originalSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function (key, value) {
    originalSetItem(key, value);
    if (key === STORAGE_KEY && !isSyncing) {
      clearTimeout(syncTimeout);
      syncTimeout = setTimeout(() => {
        try {
          const state = JSON.parse(value);
          fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state }),
          })
            .then((r) => r.json())
            .then((res) => {
              updateBadgeStatus(true);
            })
            .catch((err) => {
              console.warn('[SyncBridge] Sync error:', err.message);
              updateBadgeStatus(false);
            });
        } catch (e) {}
      }, 400);
    }
  };

  // 2. Initial state sync from Database if localStorage is empty
  async function initDatabaseSync() {
    try {
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) {
        dbStatus = await healthRes.json();
      }
    } catch (e) {
      dbStatus = { status: 'offline', database: 'local_storage' };
    }

    renderStatusBadge();

    // If local storage is empty, fetch immediately from backend
    if (!localStorage.getItem(STORAGE_KEY)) {
      try {
        const stateRes = await fetch('/api/state');
        if (stateRes.ok) {
          const state = await stateRes.json();
          isSyncing = true;
          originalSetItem(STORAGE_KEY, JSON.stringify(state));
          isSyncing = false;
          // Reload page to let React pick up the initial state
          window.location.reload();
        }
      } catch (e) {
        console.warn('[SyncBridge] Could not fetch initial state:', e);
      }
    }
  }

  // 3. Floating Database Status Badge
  function renderStatusBadge() {
    let existing = document.getElementById('db-status-badge');
    if (existing) existing.remove();

    const isCloud = dbStatus.database === 'supabase_cloud';
    const badge = document.createElement('div');
    badge.id = 'db-status-badge';
    badge.innerHTML = `
      <div style="
        position: fixed;
        bottom: 16px;
        right: 16px;
        z-index: 99999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 12px;
        background: rgba(25, 25, 25, 0.92);
        color: #fff;
        padding: 6px 12px;
        border-radius: 999px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(255,255,255,0.15);
        cursor: pointer;
        user-select: none;
        backdrop-filter: blur(8px);
        transition: transform 0.2s;
      " title="คลิกเพื่อดูสถานะฐานข้อมูล">
        <span style="
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${isCloud ? '#10b981' : '#f59e0b'};
          display: inline-block;
          box-shadow: 0 0 8px ${isCloud ? '#10b981' : '#f59e0b'};
        "></span>
        <span style="font-weight: 500;">
          DB: ${isCloud ? 'Supabase' : 'Local'}
        </span>
        <button id="db-refresh-btn" style="
          background: rgba(255,255,255,0.12);
          border: none;
          color: #fff;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 10px;
          cursor: pointer;
          margin-left: 2px;
        ">Sync 🔄</button>
      </div>
    `;

    document.body.appendChild(badge);

    const refreshBtn = document.getElementById('db-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        refreshBtn.textContent = '⏳';
        try {
          const res = await fetch('/api/state');
          if (res.ok) {
            const freshState = await res.json();
            isSyncing = true;
            originalSetItem(STORAGE_KEY, JSON.stringify(freshState));
            isSyncing = false;
            window.location.reload();
          }
        } catch (err) {
          alert('Sync ล้มเหลว: ' + err.message);
          refreshBtn.textContent = 'Sync 🔄';
        }
      });
    }
  }

  function updateBadgeStatus(success) {
    const badge = document.getElementById('db-status-badge');
    if (!badge) return;
    const dot = badge.querySelector('span');
    if (dot) {
      dot.style.transform = 'scale(1.4)';
      setTimeout(() => (dot.style.transform = 'scale(1)'), 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDatabaseSync);
  } else {
    initDatabaseSync();
  }
})();

