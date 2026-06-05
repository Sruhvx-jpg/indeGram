import {
    pgTable,
    uuid,
    timestamp,
    text,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";

// ========================================================
export const conversationTable = pgTable("conversation", {
    id: uuid("conversation_id").primaryKey().defaultRandom(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at"),
})
export type SelectConversationTable = typeof conversationTable.$inferSelect;
export type InsertConversationTable = typeof conversationTable.$inferInsert;


// ========================================================
export const conversationMemberTable = pgTable("conversation_member", {
    id: uuid("conversation_member_id").primaryKey().defaultRandom(),

    conversationId: uuid("conversation_id").references(() => conversationTable.id, { onDelete: "cascade" }).notNull(),

    userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),

    joinedAt: timestamp("joined_at")
        .defaultNow()
        .notNull(),
})
export type SelectConversationMemberTable = typeof conversationMemberTable.$inferSelect
export type InsertConversationMemberTable = typeof conversationMemberTable.$inferInsert


// ========================================================
export const messageTable = pgTable("message_table", {
      id: uuid("id").primaryKey().defaultRandom(),

  conversationId: uuid("conversation_id")
    .references(() => conversationTable.id, {
      onDelete: "cascade",
    })
    .notNull(),

  senderId: uuid("sender_id")
    .references(() => usersTable.id)
    .notNull(),

  content: text("content").notNull(),

  sentAt: timestamp("sent_at")
    .defaultNow()
    .notNull(),

  deliveredAt: timestamp("delivered_at"),

  seenAt: timestamp("seen_at"),

  editedAt: timestamp("edited_at"),

  deletedAt: timestamp("deleted_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
})
export type SelectMessageTable = typeof messageTable.$inferSelect
export type InsertMessageTable = typeof messageTable.$inferInsert