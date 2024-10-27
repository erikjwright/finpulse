import { createBrowserClient } from "@supabase/ssr";

import config from "./env";

const { NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL } = config;

export function createClient() {
	return createBrowserClient(
		NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY,
	);
}
