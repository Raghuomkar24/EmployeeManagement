import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React application
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    open: true,
    cors: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
