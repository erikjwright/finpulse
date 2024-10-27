import { InsightsSummary } from "@/components/insights/summary";

export default function InsightsPage() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Financial Insights</h1>
			<InsightsSummary />
		</div>
	);
}
