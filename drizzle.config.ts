import { defineConfig } from "drizzle-kit";

const url = process.env.POSTGRES_URL;

if (!url) {
	throw new Error("POSTGRES_URL environment variable is required");
}

export default defineConfig({
	out: "./migrations",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: { url },
});
