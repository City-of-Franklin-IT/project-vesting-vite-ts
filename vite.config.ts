import { defineConfig } from 'vite'
import { APP_BASE } from './src/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: APP_BASE,
  resolve: {
    alias: {
    },
  },
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        }
    }
  }
})