import { ArrowUpDown, DollarSign, TrendingUp } from "lucide-react";

const recentActivities = [
	{
		id: 1,
		type: "buy",
		assetName: "Bitcoin",
		amount: 0.5,
		date: "2023-06-15T10:30:00Z",
	},
	{
		id: 2,
		type: "sell",
		assetName: "Tesla",
		amount: 3,
		date: "2023-06-12T14:00:00Z",
	},
	{
		id: 3,
		type: "dividend",
		assetName: "Apple",
		amount: 50,
		date: "2023-06-10T08:45:00Z",
	},
	{
		id: 4,
		type: "buy",
		assetName: "Ethereum",
		amount: 1.2,
		date: "2023-06-08T09:20:00Z",
	},
	{
		id: 5,
		type: "sell",
		assetName: "Microsoft",
		amount: 5,
		date: "2023-06-06T14:50:00Z",
	},
	{
		id: 6,
		type: "dividend",
		assetName: "Google",
		amount: 45,
		date: "2023-06-05T11:10:00Z",
	},
	{
		id: 7,
		type: "buy",
		assetName: "Amazon",
		amount: 2,
		date: "2023-06-03T16:00:00Z",
	},
	{
		id: 10,
		type: "sell",
		assetName: "Tesla",
		amount: 7,
		date: "2023-05-27T18:40:00Z",
	},
];

export function RecentActivity() {
	const getIcon = (type: string) => {
		const iconClasses = "h-4 w-4"; // Remove 'text-muted-foreground' here
		switch (type) {
			case "buy":
				return <TrendingUp className={`${iconClasses} text-green-500`} />;
			case "sell":
				return <ArrowUpDown className={`${iconClasses} text-red-500`} />;
			case "dividend":
				return <DollarSign className={`${iconClasses} text-blue-500`} />;
			default:
				return <DollarSign className={`${iconClasses} text-gray-500`} />;
		}
	};

	return (
		<ul className="space-y-1">
			{recentActivities.map((activity) => (
				<li
					key={activity.id}
					className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900"
				>
					<div className="flex items-center space-x-3">
						{getIcon(activity.type)}
						<span className="text-sm font-medium">
							{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} -{" "}
							{activity.assetName}
						</span>
					</div>
					<span className="text-xs text-gray-500">
						{new Date(activity.date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</span>
				</li>
			))}
		</ul>
	);
}
