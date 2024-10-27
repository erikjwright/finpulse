interface Env {
	NEXT_PUBLIC_SUPABASE_URL: string | undefined;
	NEXT_PUBLIC_SUPABASE_ANON_KEY: string | undefined;
}

interface Config {
	NEXT_PUBLIC_SUPABASE_URL: string;
	NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
}

const config: Env = {
	NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

for (const [key, value] of Object.entries(config)) {
	if (value === undefined) {
		throw new Error(`Key "${key}" not found in environment variables`);
	}
}

export default config as Config;
