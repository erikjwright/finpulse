import { insertTransactionSchema } from "@/db/schema";
import { supabase } from "@/db/supabase";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/v1");

// Transactions endpoints
const route = app
	.get("/transactions", async (c) => {
		const { data, error } = await supabase.from("transactions").select(`
      *,
      assets (name)
    `);
		return c.json({ data, error }, error ? 500 : 200);
	})
	.post(
		"/transactions",
		zValidator("json", insertTransactionSchema),
		async (c) => {
			const body = c.req.valid("json");
			const { data, error } = await supabase.from("transactions").insert(body);
			return c.json({ data, error }, error ? 500 : 200);
		},
	)
	.get("/portfolio/history", async (c) => {
		const { data: transactions, error } = await supabase
			.from("transactions")
			.select("transaction_type, amount, price_per_unit, transaction_date")
			.order("transaction_date", { ascending: true });

		if (error) {
			return c.json({ data: null, error: error.message }, 500);
		}

		// Calculate cumulative portfolio value over time
		let cumulativeValue = 0;
		const data = transactions.map((transaction) => {
			const valueChange =
				transaction.transaction_type === "buy"
					? transaction.amount * transaction.price_per_unit
					: -transaction.amount * transaction.price_per_unit;

			cumulativeValue += valueChange;
			return {
				date: transaction.transaction_date,
				value: cumulativeValue,
			};
		});

		return c.json({ data, error }, 200);
	});

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
