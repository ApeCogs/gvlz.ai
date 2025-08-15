import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://gvlz.ai',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'directory'
  }
});