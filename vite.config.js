import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🚀 TRABAJOS OFRECIDOS - Configuración Vite
// Versión: 2.0 - Julio 2025

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          icons: ['lucide-react']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@supabase/supabase-js', 'lucide-react']
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '2.0.0'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  }
})