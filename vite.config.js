import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // ✅ Prevent Vite from reloading when db.json changes (used by json-server)
      ignored: ['**/db.json']
    }
  }
});
