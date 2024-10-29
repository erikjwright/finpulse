"use client";

import type { AppType } from "@/app/v1/[...path]/route";
import { PortfolioChart } from "@/components/portfolio/charts/line";
import { RecentActivity } from "@/components/recent-activity";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { hc } from "hono/client";
import { TransactionsTable } from "../../components/transactions/table";

export default async function Dashboard() {
	const client = hc<AppType>(
		process.env.VERCEL_PROJECT_PRODUCTION_URL
			? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
			: "http://localhost:3000",
	);

	async function fetchPortfolioHistory() {
		const response = await client.v1.portfolio.history.$get();
		const { data, error } = await response.json();

		if (error) {
			throw new Error(error);
		}

		return data;
	}

	async function fetchTransactions() {
		const response = await client.v1.transactions.$get();
		const { data, error } = await response.json();
		if (error) throw new Error(error.message);
		return data;
	}

	const transactions = await fetchTransactions();
	const portfolioHistory = await fetchPortfolioHistory();

	return (
		<div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			<Card className="col-span-2">
				<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
					<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
						<CardTitle>Portfolio Performance</CardTitle>
						<CardDescription>
							Track your portfolio balance over time
						</CardDescription>
					</div>
					<div className="flex">
						<button
							type="button"
							data-active="balance"
							className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
						>
							<span className="text-xs text-muted-foreground">
								Account Balance
							</span>
							<span className="text-lg font-bold leading-none sm:text-3xl">
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(
									portfolioHistory?.[portfolioHistory.length - 1]?.value ?? 0,
								)}
							</span>
						</button>
					</div>
				</CardHeader>
				<CardContent className="px-2 sm:p-6">
					{portfolioHistory && portfolioHistory.length > 0 && (
						<PortfolioChart balance={portfolioHistory} />
					)}
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
				</CardHeader>
				<CardContent>
					<RecentActivity />
				</CardContent>
			</Card>
			<Card className="col-span-3">
				<CardHeader>
					<CardTitle>Recent Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					<TransactionsTable transactions={transactions ?? []} />
				</CardContent>
			</Card>
		</div>
	);
}
