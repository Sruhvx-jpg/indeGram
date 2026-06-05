import {
  pgTable,
  uuid,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { usersTable } from "../user";

export const refreshTokensTable = pgTable("refresh_tokens", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => usersTable.id, {onDelete: "cascade"}),
  token: text().notNull(),
  createdAt: timestamp().defaultNow(),
})

export type SelectRefTok = typeof refreshTokensTable.$inferSelect;
export type InsertRefTok = typeof refreshTokensTable.$inferInsert;