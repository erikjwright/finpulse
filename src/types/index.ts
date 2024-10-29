export type Asset = {
	name: string;
	type: string;
	value: string;
	performance: string;
};

export type Balance = {
	date: string;
	value: number;
};

export type Goal = {
	id: string;
	title: string;
	targetAmount: number;
	currentAmount: number;
	dueDate: string; // Use ISO date string format for consistency
};
