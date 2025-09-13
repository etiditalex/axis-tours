import { defineConfig } from 'vite'

export default defineConfig({
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
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
