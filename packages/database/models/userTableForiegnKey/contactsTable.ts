import {
  pgTable,
  uuid,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { usersTable } from "../user";

export const contactsTable = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),

  ownerId: uuid("owner_id")
    .references(() => usersTable.id)
    .notNull(),

  contactId: uuid("contact_id")
    .references(() => usersTable.id)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
})

export type SelectContactsTable = typeof contactsTable.$inferSelect
export type InsertContactsTable = typeof contactsTable.$inferInsert