import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function PortfolioSummary() {
	return (
		<Card className="p-4">
			<CardHeader className="pb-0">
				<CardTitle>Portfolio Summary</CardTitle>
				<CardDescription>Current Overview</CardDescription>
			</CardHeader>
			<CardContent className="pt-4">
				<div className="flex items-center justify-between space-x-6">
					<div className="flex-1">
						<p className="text-sm text-muted-foreground">Total Value</p>
						<p className="text-3xl font-semibold text-foreground">$52,000</p>
					</div>
					<div className="flex items-center space-x-2">
						<div>
							<p className="text-sm text-muted-foreground">Net Gain/Loss</p>
							<p className="text-3xl font-semibold text-green-500 flex items-center">
								+5.4%
								<TrendingUp className="ml-2 h-5 w-5" />
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
