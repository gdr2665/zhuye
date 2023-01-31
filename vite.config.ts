import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@@': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.code.yxzl.top',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', ''),
      },
      '/ws': {
        target: 'https://api.code.yxzl.top',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
