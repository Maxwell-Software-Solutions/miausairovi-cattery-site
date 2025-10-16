import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Add Brotli compression for production builds
    mode === 'production' &&
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024, // Only compress files larger than 1KB
        deleteOriginFile: false,
      }),
    // Add Gzip compression as fallback
    mode === 'production' &&
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
        deleteOriginFile: false,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-accordion',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
    // Enable minification with esbuild (faster than terser)
    minify: 'esbuild',
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096, // Inline small assets as base64
    // Generate source maps for production debugging (disable for max performance)
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'es2020',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
