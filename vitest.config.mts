import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

type Reporter = 'lcovonly' | 'html' | 'cobertura' | 'text-summary';

let reporter: Reporter[] = ['text-summary', 'html'];
if (process.env.CI) {
  // Include CI reports
  reporter = ['lcovonly', 'cobertura'];
}

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      reporter,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['**/__mocks__/*', '**/__tests__/*'],
    },
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
