import { type InferInsertModel, type InferSelectModel, sql } from "drizzle-orm";
import {
	check,
	jsonb,
	numeric,
	pgTable,
	serial,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const assets = pgTable(
	"assets",
	{
		id: varchar("id").default(sql`gen_random_uuid()`).primaryKey(),
		name: varchar("name", { length: 100 }).notNull(),
		type: varchar("type", { length: 20 }).notNull(),
		symbol: varchar("symbol", { length: 10 }).notNull().unique(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => ({
		typeCheck: check(
			"type_check",
			sql`${table.type} IN ('stock', 'crypto', 'bond')`,
		),
	}),
);

export const transactions = pgTable(
	"transactions",
	{
		id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
		userId: uuid("user_id").notNull(),
		assetId: uuid("asset_id").references(() => assets.id),
		transactionType: varchar("transaction_type", { length: 10 }).notNull(),
		amount: numeric("amount", { precision: 20, scale: 8 }).notNull(),
		pricePerUnit: numeric("price_per_unit", {
			precision: 20,
			scale: 8,
		}).notNull(),
		transactionDate: timestamp("transaction_date", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => ({
		transactionTypeCheck: check(
			"transaction_type_check",
			sql`${table.transactionType} IN ('buy', 'sell')`,
		),
		amountCheck: check("amount_check", sql`${table.amount} > 0`),
		priceCheck: check("price_check", sql`${table.pricePerUnit} > 0`),
	}),
);

export const portfolios = pgTable(
	"portfolios",
	{
		id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
		userId: uuid("user_id").notNull(),
		totalValue: numeric("total_value", { precision: 20, scale: 2 }).notNull(),
		lastUpdated: timestamp("last_updated", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => ({
		totalValueCheck: check("total_value_check", sql`${table.totalValue} >= 0`),
	}),
);

export const auditLogs = pgTable(
	"audit_logs",
	{
		id: serial("id").primaryKey(),
		tableName: varchar("table_name", { length: 50 }).notNull(),
		action: varchar("action", { length: 10 }).notNull(),
		recordId: uuid("record_id").notNull(),
		userId: uuid("user_id"),
		timestamp: timestamp("timestamp", { withTimezone: true })
			.defaultNow()
			.notNull(),
		oldData: jsonb("old_data"),
		newData: jsonb("new_data"),
	},
	(table) => ({
		actionCheck: check(
			"action_check",
			sql`${table.action} IN ('INSERT', 'UPDATE', 'DELETE')`,
		),
	}),
);

export const insertTransactionSchema = createInsertSchema(transactions);
export const selectTransactionSchema = createSelectSchema(transactions);

export type InsertTransaction = InferInsertModel<typeof transactions>;
export type SelectTransaction = InferSelectModel<typeof transactions>;
