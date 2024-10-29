import { AssetsTable } from "@/components/assets/table";
import { PortfolioSummary } from "@/components/portfolio/summary";
import { PortfolioAllocationChart } from "@/components/portfolio/charts/doughnut";

async function getAssets() {
	return [
		{ name: "Apple", type: "Stock", value: "$15,000", performance: "+2.5%" },
		{ name: "Tesla", type: "Stock", value: "$10,000", performance: "-1.0%" },
		{ name: "Bitcoin", type: "Crypto", value: "$7,500", performance: "+10.5%" },
	];
}

export default async function PortfolioPage() {
	const assets = await getAssets();

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Portfolio Overview</h1>
			<PortfolioSummary />
			<PortfolioAllocationChart />
			<AssetsTable assets={assets} />
		</div>
	);
}
