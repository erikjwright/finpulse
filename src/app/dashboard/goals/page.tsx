import { GoalsList } from "@/components/goals/list";
import type { Goal } from "@/types";

const mockGoals: Goal[] = [
	{
		id: "goal1",
		title: "Emergency Fund",
		targetAmount: 10000,
		currentAmount: 6500,
		dueDate: "2024-12-31",
	},
	{
		id: "goal2",
		title: "Vacation Fund",
		targetAmount: 3000,
		currentAmount: 1200,
		dueDate: "2024-08-01",
	},
	{
		id: "goal3",
		title: "Home Down Payment",
		targetAmount: 50000,
		currentAmount: 20000,
		dueDate: "2025-06-30",
	},
];

export default function GoalsPage() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Financial Goals</h1>
			<GoalsList goals={mockGoals} />
		</div>
	);
}
