import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
export default defineConfig({
  site: process.env.SITE_URL || 'https://aliesm.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  prefetch: false,
  compressHTML: true,
  build: { inlineStylesheets: 'never' },
  server: { host: true, port: 4173, allowedHosts: ['terminal.local'] },
});
