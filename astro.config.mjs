import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://global-aroma-concept.vercel.app',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
