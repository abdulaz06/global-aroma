import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
