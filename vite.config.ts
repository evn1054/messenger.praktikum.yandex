import { defineConfig } from 'vite';
import * as path from 'node:path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, 'src/core'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@features': path.resolve(__dirname, 'src/features'),
    },
  },
  server: {
    port: 3000,
  },
  // plugins: [handlebars({})],
  // assetsInclude: ['**/*.hbs'],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
