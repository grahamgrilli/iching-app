import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/iching-app/', // Must match repo name for GitHub Pages
  build: {
    outDir: 'docs', // Build to docs/ so Pages can use main branch + /docs folder
  },
})
