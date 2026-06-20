import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Increase warning limit for animation bundles
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor chunks to improve caching and parallel loading
        manualChunks(id) {
          // Framer Motion: isolated chunk — only loaded when animations run
          if (id.includes('framer-motion')) {
            return 'vendor-framer';
          }
          // GSAP: isolated chunk — only loaded when scroll events fire
          if (id.includes('gsap')) {
            return 'vendor-gsap';
          }
          // Lenis smooth scroll: isolated chunk
          if (id.includes('lenis') || id.includes('@studio-freight')) {
            return 'vendor-lenis';
          }
          // React core: always needed
          if (id.includes('react-dom') || id.includes('react/')) {
            return 'vendor-react';
          }
        },
      },
    },
  },
})
