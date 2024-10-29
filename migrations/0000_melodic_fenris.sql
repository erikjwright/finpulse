CREATE TABLE IF NOT EXISTS "assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"symbol" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "assets_symbol_unique" UNIQUE("symbol"),
	CONSTRAINT "type_check" CHECK ("assets"."type" IN ('stock', 'crypto', 'bond'))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"pathname" text NOT NULL,
	"method" text NOT NULL,
	"user_id" uuid NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"data" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"total_value" numeric(20, 2) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "total_value_check" CHECK ("portfolios"."total_value" >= 0)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"asset_id" uuid NOT NULL,
	"transaction_type" text NOT NULL,
	"amount" numeric(20, 8) NOT NULL,
	"price_per_unit" numeric(20, 8) NOT NULL,
	"transaction_date" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "transaction_type_check" CHECK ("transactions"."transaction_type" IN ('buy', 'sell')),
	CONSTRAINT "amount_check" CHECK ("transactions"."amount" > 0),
	CONSTRAINT "price_check" CHECK ("transactions"."price_per_unit" > 0)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assets" ADD CONSTRAINT "assets_user_id_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_userId_profile_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_asset_id_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Enable RLS on tables
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow profile owner to view"
ON profile
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Allow profile owner to insert"
ON profile
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow profile owner to update"
ON profile
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Allow profile owner to delete"
ON profile
FOR DELETE
USING (user_id = auth.uid());

CREATE POLICY "Allow transaction owner to view"
ON transactions
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Allow transaction owner to insert"
ON transactions
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow transaction owner to update"
ON transactions
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Allow transaction owner to delete"
ON transactions
FOR DELETE
USING (user_id = auth.uid());

CREATE POLICY "Allow portfolio owner to view"
ON portfolios
FOR SELECT
USING (userId = auth.uid());

CREATE POLICY "Allow portfolio owner to insert"
ON portfolios
FOR INSERT
WITH CHECK (userId = auth.uid());

CREATE POLICY "Allow portfolio owner to update"
ON portfolios
FOR UPDATE
USING (userId = auth.uid());

CREATE POLICY "Allow portfolio owner to delete"
ON portfolios
FOR DELETE
USING (userId = auth.uid());

CREATE POLICY "Allow asset owner to view"
ON assets
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Allow asset owner to insert"
ON assets
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow asset owner to update"
ON assets
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Allow asset owner to delete"
ON assets
FOR DELETE
USING (user_id = auth.uid());