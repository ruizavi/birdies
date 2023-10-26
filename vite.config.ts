/// <reference types="vitest" />

import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { peerDependencies } from './package.json';

export default defineConfig({
   plugins: [react(), dts({ rollupTypes: true })],
   build: {
      lib: {
         entry: resolve('src', 'index.tsx'),
         name: 'birdies',
         formats: ['es', 'umd']
      },
      rollupOptions: {
         external: [...Object.keys(peerDependencies)]
      }
   },
   test: {
      environment: 'happy-dom'
   }
});
