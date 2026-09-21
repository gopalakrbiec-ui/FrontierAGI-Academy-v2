import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gopalakrbiec-ui.github.io',
  base: '/FrontierAGI-Academy-v2',
  output: 'static',
  integrations: [sitemap()],
  build: { format: 'directory' }
});
