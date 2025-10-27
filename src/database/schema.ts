import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  date,
  pgEnum,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ===============================
// ENUMS
// ===============================

// Permissões de usuário
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

// Unidades federativas (UFs)
export const STATE_ENUM = pgEnum("state", [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]);

// Condição do livro
export const CONDITION_ENUM = pgEnum("condition", [
  "Novo",
  "Usado",
  "Danificado",
]);

// ===============================
// USERS TABLE
// ===============================

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),

    role: ROLE_ENUM("role").notNull().default("USER"),

    // Telefone JSONB
    phone: jsonb("phone")
      .$type<{
        ddi: string;
        ddd: string;
        number: string;
      }>()
      .notNull(),

    // Estado (UF)
    state: STATE_ENUM("state").notNull(),

    lastActivityDate: date("last_activity_date").defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
  })
);

// ===============================
// BOOKS TABLE
// ===============================

export const books = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre: varchar("genre", { length: 100 }).notNull(),

  condition: CONDITION_ENUM("condition").notNull(),

  summary: text("summary").notNull(),
  donorComment: text("donor_comment"),

  totalCopies: integer("total_copies").notNull().default(1),

  coverUrls: jsonb("cover_urls").$type<string[]>().notNull(),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

  // FK → users.id
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// ===============================
// RELATIONS
// ===============================

export const usersRelations = relations(users, ({ many }) => ({
  books: many(books),
}));

export const booksRelations = relations(books, ({ one }) => ({
  donor: one(users, {
    fields: [books.userId],
    references: [users.id],
  }),
}));

// ===============================
// TYPES
// ===============================

import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Book = InferSelectModel<typeof books>;
export type NewBook = InferInsertModel<typeof books>;
