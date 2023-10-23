import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

export default defineConfig({
   plugins: [react(), dts({ rollupTypes: true })],
   build: {
      lib: {
         entry: resolve('src', 'index.tsx'),
         name: 'birdies',
         formats: ['es', 'umd']
      }
   },
   test: {
      environment: 'happy-dom'
   }
});
