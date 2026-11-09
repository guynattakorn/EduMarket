/**
 * EduMarket Sync Bridge
 * Provides helper endpoints and connection status for Supabase Cloud integration
 */
(function () {
  window.EduSyncBridge = {
    async getHealth() {
      try {
        const res = await fetch('/api/health');
        return res.ok ? await res.json() : { status: 'error', database: 'unknown' };
      } catch (e) {
        return { status: 'offline', database: 'local_storage', error: e.message };
      }
    },
    async getState() {
      try {
        const res = await fetch('/api/state');
        return res.ok ? await res.json() : null;
      } catch (e) {
        return null;
      }
    },
    async syncState(state) {
      try {
        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state }),
        });
        return res.ok ? await res.json() : null;
      } catch (e) {
        return null;
      }
    }
  };
})();
