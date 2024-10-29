import { ReportsList } from "@/components/reports/list";

export default function ReportsPage() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Financial Reports</h1>
			<ReportsList />
		</div>
	);
}
