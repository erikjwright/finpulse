import { TransactionsTable } from "@/components/transactions/table";

export default async function Transactions() {
	const transactions = await getTransactions();

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Transactions Overview</h1>
			<TransactionsTable transactions={transactions} />
		</div>
	);
}
