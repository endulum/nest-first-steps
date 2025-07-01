import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const provider: 'sqlite' | 'postgresql' = process.env.DATABASE_PROVIDER as
  | 'sqlite'
  | 'postgresql';

export default defineConfig({
  out: './drizzle',
  schema: `./src/db/schema.${provider}.ts`,
  dialect: provider,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
