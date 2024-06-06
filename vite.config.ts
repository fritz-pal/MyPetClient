import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "global": "window"
  },
  base: process.env.NODE_ENV === 'production' ? '/LabSWP24MyPet' : '/',
  plugins: [react()],
});

