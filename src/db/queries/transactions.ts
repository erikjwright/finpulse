import { db } from "../index";
import {
	type InsertTransaction,
	type SelectTransaction,
	transactions,
} from "../schema";

export async function selectTransactions() {
	return (await db.select().from(transactions)) as SelectTransaction[];
}

export async function insertTransaction(transaction: InsertTransaction) {
	return await db.insert(transactions).values(transaction);
}
