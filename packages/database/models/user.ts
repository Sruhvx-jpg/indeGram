import { pgEnum } from "drizzle-orm/pg-core";
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text, 
} from "drizzle-orm/pg-core";

export const accountTypeEnum = pgEnum("account_type", [
  "personal",
  "bussiness",
])

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  fullName: varchar("full_name", { length: 80 }).notNull(),

  phoneNumber: varchar("phone_number", {length: 17}).notNull().unique(),
  isPhoneNumberVerified: boolean("phonenumber_verified").default(false),
  
  password: varchar("password", {length: 60}).notNull(),

  accountType: accountTypeEnum("account_type").notNull(),

  email: varchar('email', { length: 255 }),
  emailVerified: boolean('email_verified').default(false).notNull(),

  profileImageUrl: text("profile_image_url"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
