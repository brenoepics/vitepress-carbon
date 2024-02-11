import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 9617,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': '/src'
    }	
  }
})