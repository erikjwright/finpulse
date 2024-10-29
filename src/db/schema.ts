import { type InferInsertModel, type InferSelectModel, sql } from "drizzle-orm";
import {
	check,
	jsonb,
	numeric,
	pgSchema,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const authSchema = pgSchema("auth");

// Supabase Auth Users Table
const users = authSchema.table("users", {
	id: uuid().primaryKey(),
});

// Profiles Table
export const profile = pgTable("profile", {
	id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
	user_id: uuid()
		.references(() => users.id)
		.notNull(),
	updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

// Assets Table
export const assets = pgTable(
	"assets",
	{
		id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
		user_id: uuid()
			.references(() => profile.id)
			.notNull(),
		name: text().notNull(),
		type: text().notNull(),
		symbol: text().notNull().unique(),
		created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		typeCheck: check(
			"type_check",
			sql`${table.type} IN ('stock', 'crypto', 'bond')`,
		),
	}),
);

// Transactions Table
export const transactions = pgTable(
	"transactions",
	{
		id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
		user_id: uuid()
			.references(() => profile.id)
			.notNull(),
		asset_id: uuid()
			.references(() => assets.id)
			.notNull(),
		transaction_type: text().notNull(),
		amount: numeric({ precision: 20, scale: 8 }).notNull(),
		price_per_unit: numeric({
			precision: 20,
			scale: 8,
		}).notNull(),
		transaction_date: timestamp({ withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		transactionTypeCheck: check(
			"transaction_type_check",
			sql`${table.transaction_type} IN ('buy', 'sell')`,
		),
		amountCheck: check("amount_check", sql`${table.amount} > 0`),
		priceCheck: check("price_check", sql`${table.price_per_unit} > 0`),
	}),
);

// Portfolios Table
export const portfolios = pgTable(
	"portfolios",
	{
		id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
		userId: uuid()
			.references(() => profile.id)
			.notNull(),
		total_value: numeric({ precision: 20, scale: 2 }).notNull(),
		updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		totalValueCheck: check("total_value_check", sql`${table.total_value} >= 0`),
	}),
);

// Audit Logs Table
export const auditLogs = pgTable("audit_logs", {
	id: serial().primaryKey(),
	pathname: text().notNull(),
	method: text().notNull(),
	user_id: uuid()
		.references(() => profile.id)
		.notNull(),
	timestamp: timestamp("timestamp", { withTimezone: true })
		.defaultNow()
		.notNull(),
	data: jsonb("data"),
});

// Infer Types and Zod Schemas

// User Accounts
export type InsertProfile = InferInsertModel<typeof profile>;
export type SelectProfile = InferSelectModel<typeof profile>;

export const insertProfileSchema = createInsertSchema(profile);
export const selectProfileSchema = createSelectSchema(profile);

// Assets
export type InsertAsset = InferInsertModel<typeof assets>;
export type SelectAsset = InferSelectModel<typeof assets>;

export const insertAssetSchema = createInsertSchema(assets);
export const selectAssetSchema = createSelectSchema(assets);

// Transactions
export type InsertTransaction = InferInsertModel<typeof transactions>;
export type SelectTransaction = InferSelectModel<typeof transactions>;

export const insertTransactionSchema = createInsertSchema(transactions, {
	amount: z.number(),
	price_per_unit: z.number(),
	transaction_date: z.string(),
});
export const selectTransactionSchema = createSelectSchema(transactions);

// Portfolios
export type InsertPortfolio = InferInsertModel<typeof portfolios>;
export type SelectPortfolio = InferSelectModel<typeof portfolios>;

export const insertPortfolioSchema = createInsertSchema(portfolios);
export const selectPortfolioSchema = createSelectSchema(portfolios);

// Audit Logs
export type InsertAuditLog = InferInsertModel<typeof auditLogs>;
export type SelectAuditLog = InferSelectModel<typeof auditLogs>;

export const insertAuditLogSchema = createInsertSchema(auditLogs);
export const selectAuditLogSchema = createSelectSchema(auditLogs);
