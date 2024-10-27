"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReportsList() {
	const reports = [
		{
			id: "report1",
			title: "Annual Financial Report 2023",
			date: "2024-01-01",
		},
		{ id: "report2", title: "Quarterly Earnings Q4 2023", date: "2024-01-15" },
		{
			id: "report3",
			title: "Investment Portfolio Analysis",
			date: "2024-02-01",
		},
	];

	return (
		<div className="space-y-4">
			{reports.map((report) => (
				<Card key={report.id} className="p-4 border shadow-sm">
					<CardHeader>
						<CardTitle>{report.title}</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-between">
						<p className="text-muted-foreground">
							Published on: {new Date(report.date).toLocaleDateString()}
						</p>
						<Button variant="outline" size="sm">
							Download
						</Button>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
