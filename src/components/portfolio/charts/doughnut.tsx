"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";

// Sample data for portfolio allocation
const chartData = [
	{ asset: "Stocks", allocation: 60, fill: "hsl(var(--chart-1))" },
	{ asset: "Bonds", allocation: 25, fill: "hsl(var(--chart-2))" },
	{ asset: "Crypto", allocation: 15, fill: "hsl(var(--chart-3))" },
];

// Configuration for the chart colors and labels
const chartConfig = {
	allocation: {
		label: "Allocation",
	},
	Stocks: {
		label: "Stocks",
		color: "hsl(var(--chart-1))",
	},
	Bonds: {
		label: "Bonds",
		color: "hsl(var(--chart-2))",
	},
	Crypto: {
		label: "Crypto",
		color: "hsl(var(--chart-3))",
	},
} satisfies ChartConfig;

export function PortfolioAllocationChart() {
	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Portfolio Allocation</CardTitle>
				<CardDescription>Current Asset Allocation</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="allocation"
							nameKey="asset"
							innerRadius={60}
							outerRadius={80}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Portfolio up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing current asset distribution in your portfolio
				</div>
			</CardFooter>
		</Card>
	);
}
