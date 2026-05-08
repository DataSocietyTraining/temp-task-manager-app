import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiProxy = {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
  },
} as const

export default defineConfig({
  plugins: [react()],
  server: {
    // 5174 avoids clashing with task-manager-app/frontend (5173) if both run locally
    port: 5174,
    open: true,
    proxy: apiProxy,
  },
  preview: {
    port: 4174,
    proxy: apiProxy,
  },
})
