import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
})
