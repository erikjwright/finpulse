CREATE TABLE IF NOT EXISTS "assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(20) NOT NULL,
	"symbol" varchar(10) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "assets_symbol_unique" UNIQUE("symbol"),
	CONSTRAINT "type_check" CHECK ("assets"."type" IN ('stock', 'crypto', 'bond'))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"table_name" varchar(50) NOT NULL,
	"action" varchar(10) NOT NULL,
	"record_id" uuid NOT NULL,
	"user_id" uuid,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"old_data" jsonb,
	"new_data" jsonb,
	CONSTRAINT "action_check" CHECK ("audit_logs"."action" IN ('INSERT', 'UPDATE', 'DELETE'))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"total_value" numeric(20, 2) NOT NULL,
	"last_updated" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "total_value_check" CHECK ("portfolios"."total_value" >= 0)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"asset_id" uuid,
	"transaction_type" varchar(10) NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"price_per_unit" numeric(20, 8) NOT NULL,
	"transaction_date" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "transaction_type_check" CHECK ("transactions"."transaction_type" IN ('buy', 'sell')),
	CONSTRAINT "amount_check" CHECK ("transactions"."amount" > 0),
	CONSTRAINT "price_check" CHECK ("transactions"."price_per_unit" > 0)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_asset_id_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
