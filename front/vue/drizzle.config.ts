import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/**/schema',
  dialect: 'postgresql',
});
