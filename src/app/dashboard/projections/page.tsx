import { ProjectionsChart } from "@/components/projections/chart";

export default function ProjectionsPage() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Financial Projections</h1>
			<ProjectionsChart />
		</div>
	);
}
