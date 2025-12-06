import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        onboarding: resolve(__dirname, 'src/onboarding.html'),
        signIn: resolve(__dirname, 'src/signIn.html'),
        signUp: resolve(__dirname, 'src/signUp.html'),
        home: resolve(__dirname, 'src/home.html'),
        insights: resolve(__dirname, 'src/insights.html'),
        profile: resolve(__dirname, 'src/profile.html'),
      },
    },
  },
});
