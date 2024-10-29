import { faker } from "@faker-js/faker";
import { db } from "./drizzle";
import { assets, auditLogs, portfolios, profile, transactions } from "./schema";
import type {
	InsertAsset,
	InsertAuditLog,
	InsertPortfolio,
	InsertProfile,
	InsertTransaction,
} from "./schema";

if (!process.env.POSTGRES_URL) throw new Error("POSTGRES_URL is required");
if (!process.env.SEED_USER_ID) throw new Error("SEED_USER_ID is required");

(async () => {
	try {
		// Step 1: Insert Profiles
		const profilesData: InsertProfile = {
			id: faker.string.uuid(),
			user_id: process.env.SEED_USER_ID as string,
			updated_at: new Date(),
		};

		await db.insert(profile).values(profilesData);
		const insertedProfiles = await db.select().from(profile);

		// Step 2: Insert Assets with Unique Symbols
		const usedSymbols = new Set<string>();
		const assetsData: InsertAsset[] = [];
		for (const _ of Array.from({ length: 10 })) {
			let symbol: string;
			do {
				symbol = faker.finance.currencyCode();
			} while (usedSymbols.has(symbol));

			usedSymbols.add(symbol);

			assetsData.push({
				id: faker.string.uuid(),
				user_id: faker.helpers.arrayElement(insertedProfiles).id,
				name: faker.finance.currencyName(),
				type: faker.helpers.arrayElement(["stock", "crypto", "bond"]),
				symbol: symbol,
				created_at: new Date(),
			});
		}

		await db.insert(assets).values(assetsData);
		const insertedAssets = await db.select().from(assets);

		// Step 3: Insert Transactions
		const transactionsData: InsertTransaction[] = [];
		for (const _ of Array.from({ length: 20 })) {
			const asset = faker.helpers.arrayElement(insertedAssets);
			transactionsData.push({
				id: faker.string.uuid(),
				user_id: asset.user_id,
				asset_id: asset.id,
				transaction_type: faker.helpers.arrayElement(["buy", "sell"]),
				amount: faker.number
					.float({ min: 1, max: 100, fractionDigits: 2 })
					.toString(),
				price_per_unit: faker.number
					.float({ min: 1, max: 1000, fractionDigits: 2 })
					.toString(),
				transaction_date: faker.date.recent(),
			});
		}

		await db.insert(transactions).values(transactionsData);

		// Step 4: Insert Portfolios
		const portfoliosData: InsertPortfolio[] = [];
		for (const profile of insertedProfiles) {
			const profileTransactions = transactionsData.filter(
				(transaction) => transaction.user_id === profile.id,
			);
			let totalValue = profileTransactions.reduce((sum, transaction) => {
				const transactionValue =
					Number.parseFloat(transaction.amount) *
					Number.parseFloat(transaction.price_per_unit);
				return transaction.transaction_type === "buy"
					? sum + transactionValue
					: sum - transactionValue;
			}, 0);

			// Ensure total value is non-negative
			totalValue = Math.max(totalValue, 0);

			portfoliosData.push({
				id: faker.string.uuid(),
				userId: profile.id,
				total_value: totalValue.toString(),
				updated_at: new Date(),
			});
		}

		await db.insert(portfolios).values(portfoliosData);

		// Step 5: Insert Audit Logs
		const auditLogsData: InsertAuditLog[] = [];
		for (const _ of Array.from({ length: 15 })) {
			auditLogsData.push({
				id: faker.number.int({ max: 2147483647 }), // Limit the range to fit an integer
				pathname: faker.internet.url(),
				method: faker.helpers.arrayElement(["GET", "POST", "PUT", "DELETE"]),
				user_id: faker.helpers.arrayElement(insertedProfiles).id,
				timestamp: faker.date.recent(),
				data: JSON.stringify({
					action: "Random action",
					details: faker.lorem.sentence(),
				}),
			});
		}

		await db.insert(auditLogs).values(auditLogsData);

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	}
})();
