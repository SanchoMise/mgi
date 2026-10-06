import { defineConfig } from 'astro/config';

// Site 100 % statique, prêt pour Vercel. Les URLs finissent par « / » (comme sur WordPress).
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
