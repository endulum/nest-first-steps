import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as sqliteSchema from '../../db/schema.sqlite';
import * as pgSchema from '../../db/schema.postgres';

export type DrizzleClient =
  | BetterSQLite3Database<typeof sqliteSchema>
  | NodePgDatabase<typeof pgSchema>;
