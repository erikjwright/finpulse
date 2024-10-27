import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { PortfolioChart } from "@/components/portfolio/charts/line";
import { TransactionsTable } from "../../components/transactions/table";
import { RecentActivity } from "@/components/recent-activity";
import type { Portfolio, Transaction } from "@/types";

async function getPortfolioData(): Promise<Portfolio[]> {
	return [
		{
			totalValue: 12500.45, // total current value in USD
			history: [
				{ date: new Date("2023-01-01"), value: 10000 },
				{ date: new Date("2023-02-01"), value: 10500 },
				{ date: new Date("2023-03-01"), value: 11000 },
				{ date: new Date("2023-04-01"), value: 9500 },
				{ date: new Date("2023-05-01"), value: 12000 },
				{ date: new Date("2023-06-01"), value: 12500 },
			],
			assetAllocation: [
				{ assetType: "stock", percentage: 50 },
				{ assetType: "crypto", percentage: 30 },
				{ assetType: "bond", percentage: 20 },
			],
		},
	];
}

async function getTransactions(): Promise<Transaction[]> {
	return [
		{
			id: "1",
			assetName: "Apple Inc.",
			transactionType: "buy",
			amount: 10,
			pricePerUnit: 145.32,
			total: 1453.2,
			date: new Date("2023-06-15"),
			assetType: "stock",
		},
		{
			id: "2",
			assetName: "Bitcoin",
			transactionType: "buy",
			amount: 0.5,
			pricePerUnit: 25000,
			total: 12500,
			date: new Date("2023-06-12"),
			assetType: "crypto",
		},
		{
			id: "3",
			assetName: "Tesla",
			transactionType: "sell",
			amount: 5,
			pricePerUnit: 200,
			total: 1000,
			date: new Date("2023-05-20"),
			assetType: "stock",
		},
		{
			id: "4",
			assetName: "US Treasury Bond",
			transactionType: "buy",
			amount: 2,
			pricePerUnit: 1000,
			total: 2000,
			date: new Date("2023-05-01"),
			assetType: "bond",
		},
		{
			id: "5",
			assetName: "Ethereum",
			transactionType: "buy",
			amount: 1,
			pricePerUnit: 2000,
			total: 2000,
			date: new Date("2023-04-10"),
			assetType: "crypto",
		},
	];
}

const accountBalanceData = [
	{ date: "2023-01-01", balance: 10000 },
	{ date: "2023-01-15", balance: 10500 },
	{ date: "2023-02-01", balance: 11000 },
	{ date: "2023-02-15", balance: 11500 },
	{ date: "2023-03-01", balance: 12000 },
	{ date: "2023-03-15", balance: 11800 },
	{ date: "2023-04-01", balance: 12500 },
	{ date: "2023-04-15", balance: 12700 },
	{ date: "2023-05-01", balance: 13000 },
	{ date: "2023-05-15", balance: 13300 },
	{ date: "2023-06-01", balance: 13500 },
	{ date: "2023-06-15", balance: 14000 },
];

const chartConfig = {
	balance: {
		label: "Account Balance",
	},
};

const total = {
	balance: accountBalanceData[accountBalanceData.length - 1].balance,
};

export default async function Dashboard() {
	const transactions = await getTransactions();

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
						{["balance"].map((key) => {
							const chart = key as keyof typeof chartConfig;
							return (
								<button
									type="button"
									key={chart}
									data-active={chart}
									className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
								>
									<span className="text-xs text-muted-foreground">
										{chartConfig[chart].label}
									</span>
									<span className="text-lg font-bold leading-none sm:text-3xl">
										{new Intl.NumberFormat("en-US", {
											style: "currency",
											currency: "USD",
										}).format(total[key as keyof typeof total])}
									</span>
								</button>
							);
						})}
					</div>
				</CardHeader>
				<CardContent className="px-2 sm:p-6">
					<PortfolioChart balance={accountBalanceData} />
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
					<TransactionsTable transactions={transactions} />
				</CardContent>
			</Card>
		</div>
	);
}
