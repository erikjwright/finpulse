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

export type Portfolio = {
	totalValue: number;
	history: { date: Date; value: number }[];
	assetAllocation: { assetType: string; percentage: number }[];
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
	id: string;
	assetName: string;
	transactionType: "buy" | "sell";
	amount: number;
	pricePerUnit: number;
	total: number;
	date: Date;
	assetType: "stock" | "crypto" | "bond";
};
