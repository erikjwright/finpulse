"use client";

import { useState } from "react";
import {
	CartesianGrid,
	Line,
	LineChart as BaseLineChart,
	XAxis,
	YAxis,
} from "recharts";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";

// Chart configuration for projections
const chartConfig = {
	projectedBalance: {
		label: "Projected Balance",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

const data = [
	{ year: "2024", balance: 10000 },
	{ year: "2025", balance: 15000 },
	{ year: "2026", balance: 22000 },
	{ year: "2027", balance: 30000 },
	{ year: "2028", balance: 40000 },
];

export function ProjectionsChart() {
	const [activeChart] = useState<keyof typeof chartConfig>("projectedBalance");

	return (
		<Card className="p-4">
			<CardHeader>
				<CardTitle>Financial Projections</CardTitle>
				<CardDescription>Balance over the next 5 years</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<BaseLineChart
						data={data}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<XAxis
							dataKey="year"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<YAxis tickLine={false} axisLine={false} />
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="projectedBalance"
									labelFormatter={(value) => `Year ${value}`}
								/>
							}
						/>
						<Line
							dataKey="balance"
							type="monotone"
							stroke={chartConfig.projectedBalance.color}
							strokeWidth={2}
							dot={false}
						/>
					</BaseLineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
