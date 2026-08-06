import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // The browser components and the API server need different environments,
    // so each gets its own project.
    projects: [
      {
        extends: true,
        test: {
          name: 'client',
          globals: true,
          environment: 'jsdom',
          setupFiles: './src/setupTests.js',
          css: true,
          include: ['src/**/*.test.{js,jsx}'],
        },
      },
      {
        extends: true,
        test: {
          name: 'server',
          globals: true,
          environment: 'node',
          include: ['Server/**/*.test.js'],
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx}', 'Server/**/*.js'],
      exclude: ['src/main.jsx', '**/*.test.{js,jsx}', 'Server/index.js'],
    },
  },
})
