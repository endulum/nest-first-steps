import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  joined: timestamp('joined', { withTimezone: false }).notNull().defaultNow(),
});