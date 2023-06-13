/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import dotenv from 'dotenv';

export default defineConfig(({ command, mode }) => {
  dotenv.config({ path: '.env' });
  return {
    plugins: [react(), eslint()],
    build: {
      outDir: 'build',
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
        },
      },
    },
    server: {
      cors: {
        origin: '*',
        methods: ['GET'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
      },
    },
  };
});
