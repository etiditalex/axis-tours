import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        destinations: 'destinations.html',
        booking: 'booking.html',
        hotels: 'hotels.html',
        blog: 'blog.html',
        about: 'about.html',
        contact: 'contact.html'
      }
    },
    // Add memory and timeout settings for CI
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  // Add CI-specific settings
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
})
