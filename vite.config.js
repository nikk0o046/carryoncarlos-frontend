import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  base: mode === 'production'
    ? '/flight-frontend/'
    : '/',
  plugins: [react()],
})

