import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Meme coin holders table to track top holders for leaderboard
export const holders = pgTable("holders", {
  id: serial("id").primaryKey(),
  wallet: text("wallet").notNull().unique(),
  amount: text("amount").notNull(),
  rank: integer("rank").notNull(),
  status: text("status").notNull(),
});

// Price history to track historical pricing for chart data
export const priceHistory = pgTable("price_history", {
  id: serial("id").primaryKey(),
  price: text("price").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  percentChange: text("percent_change"),
});

// Community memes for the meme gallery
export const memes = pgTable("memes", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  creatorWallet: text("creator_wallet"),
  approved: boolean("approved").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User is kept from the template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Insert schemas
export const insertHolderSchema = createInsertSchema(holders).pick({
  wallet: true,
  amount: true,
  rank: true,
  status: true,
});

export const insertPriceHistorySchema = createInsertSchema(priceHistory).pick({
  price: true,
  percentChange: true,
});

export const insertMemeSchema = createInsertSchema(memes).pick({
  imageUrl: true,
  title: true,
  creatorWallet: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type InsertHolder = z.infer<typeof insertHolderSchema>;
export type InsertPriceHistory = z.infer<typeof insertPriceHistorySchema>;
export type InsertMeme = z.infer<typeof insertMemeSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Holder = typeof holders.$inferSelect;
export type PriceHistory = typeof priceHistory.$inferSelect;
export type Meme = typeof memes.$inferSelect;
export type User = typeof users.$inferSelect;
