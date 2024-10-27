"use client";

import { Progress } from "@/components/ui/progress";
import type { Goal } from "@/types";

interface GoalsListProps {
	goals: Goal[];
}

export function GoalsList({ goals }: GoalsListProps) {
	return (
		<div className="space-y-4">
			{goals.map((goal) => (
				<div key={goal.id} className="p-4 rounded-lg border shadow-sm">
					<h2 className="text-lg font-semibold">{goal.title}</h2>
					<p className="text-muted-foreground">
						Due Date: {new Date(goal.dueDate).toLocaleDateString()}
					</p>
					<div className="mt-2 text-right text-muted-foreground">
						${goal.currentAmount.toLocaleString()} / $
						{goal.targetAmount.toLocaleString()}
					</div>
					<Progress
						value={(goal.currentAmount / goal.targetAmount) * 100}
						className="mt-2"
					/>
				</div>
			))}
		</div>
	);
}
