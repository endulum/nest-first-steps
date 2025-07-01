import { Provider } from '@nestjs/common';
import * as sqliteSchema from '../../db/schema.sqlite';
import * as pgSchema from '../../db/schema.postgres';

export const DRIZZLE = 'DRIZZLE';

export const DrizzleProvider: Provider = {
  provide: DRIZZLE,
  useFactory: async () => {
    const provider = process.env.DATABASE_PROVIDER;
    const dbUrl = process.env.DATABASE_URL!;

    if (provider === 'sqlite') {
      // SQLite
      const { drizzle } = await import('drizzle-orm/better-sqlite3');
      const Database = (await import('better-sqlite3')).default;
      const filePath = dbUrl.replace(/^file:/, '');
      const sqlite = new Database(filePath);
      return drizzle<typeof sqliteSchema>(sqlite);
    } else if (provider === 'postgresql') {
      // postgres
      const { drizzle } = await import('drizzle-orm/node-postgres');
      return drizzle<typeof pgSchema>(dbUrl);
    }

    throw new Error(`Unknown db provider given: ${provider}`);
  },
};
