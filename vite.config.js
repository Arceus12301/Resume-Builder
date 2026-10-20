import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    sourcemap: false, // Ensure source maps are never generated so original code isn't exposed
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false, // Strip all comments
      },
      mangle: {
        toplevel: true, // Obfuscate top-level variable and function names
      },
    },
  },
})

