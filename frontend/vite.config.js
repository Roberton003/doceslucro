import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === 'build' ? '/static/' : '/',
    server: {
      port: 5173,
      host: true,
    },
  }
})