"use client";

import { useState } from "react";
import {
	CartesianGrid,
	Line,
	LineChart as BaseLineChart,
	XAxis,
} from "recharts";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import type { Balance } from "@/types";

export const description = "An interactive line chart";

const chartConfig = {
	views: {
		label: "Balance",
	},
	balance: {
		label: "Balance",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function PortfolioChart({ balance }: { balance: Balance[] }) {
	const [activeChart, setActiveChart] =
		useState<keyof typeof chartConfig>("balance");

	return (
		<ChartContainer
			config={chartConfig}
			className="aspect-auto h-[250px] w-full"
		>
			<BaseLineChart
				accessibilityLayer
				data={balance}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					minTickGap={32}
					tickFormatter={(value) => {
						const date = new Date(value);
						return date.toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						});
					}}
				/>
				<ChartTooltip
					content={
						<ChartTooltipContent
							className="w-[150px]"
							nameKey="views"
							labelFormatter={(value) => {
								return new Date(value).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								});
							}}
						/>
					}
				/>
				<Line
					dataKey={activeChart}
					type="monotone"
					stroke={`var(--color-${activeChart})`}
					strokeWidth={2}
					dot={false}
				/>
			</BaseLineChart>
		</ChartContainer>
	);
}
