import { selectTransactions } from "@/db/queries/transactions";
import { insertTransactionSchema, selectTransactionSchema } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";

export const runtime = "edge";

const app = new Hono().basePath("/v1");

const route = app
	.get("/transactions", async (c) => {
		const transactions = await selectTransactions();

		return c.json({ transactions }, 200);
	})
	.post(
		"/transactions",
		zValidator("json", insertTransactionSchema),
		async (c) => {
			const transactions = await selectTransactions();

			return c.json({ transactions }, 200);
		},
	);

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
