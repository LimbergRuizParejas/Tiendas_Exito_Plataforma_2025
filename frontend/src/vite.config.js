import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // abre automáticamente el navegador
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // para importar con "@/components/..."
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
