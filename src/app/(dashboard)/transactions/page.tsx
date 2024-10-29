"use client";

import { useQuery } from "@tanstack/react-query";
import { hc } from "hono/client";

import type { AppType } from "@/app/v1/[...path]/route";
import { TransactionsTable } from "@/components/transactions/table";

export default function Transactions() {
	const client = hc<AppType>(
		process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
			: "http://localhost:3000",
	);

	const { data: transactions } = useQuery({
		queryKey: ["transactions"],
		queryFn: async () => {
			const response = await client.v1.transactions.$get();
			const { data, error } = await response.json();

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
	});

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Transactions Overview</h1>
			{transactions && transactions.length > 0 ? (
				<TransactionsTable transactions={transactions} />
			) : (
				<p>You have no transactions</p>
			)}
		</div>
	);
}
