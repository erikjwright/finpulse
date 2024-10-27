"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InsightsSummary() {
	const insights = [
		{
			title: "Yearly Growth",
			value: "8.2%",
			description: "Compared to last year",
		},
		{
			title: "Top Asset",
			value: "Apple Stocks",
			description: "Most profitable asset",
		},
		{
			title: "Risk Level",
			value: "Moderate",
			description: "Based on recent investments",
		},
	];

	return (
		<div className="grid gap-4 md:grid-cols-3">
			{insights.map((insight) => (
				<Card key={insight.title} className="p-4">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm text-muted-foreground">
							{insight.title}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-1">
						<p className="text-3xl font-bold">{insight.value}</p>
						<p className="text-sm text-muted-foreground">
							{insight.description}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
