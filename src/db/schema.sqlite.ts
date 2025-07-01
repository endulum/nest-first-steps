import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const usersTable = sqliteTable('users_table', {
  id: int('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  joined: text('joined')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
