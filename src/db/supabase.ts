import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) {
	throw new Error(
		"NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is required",
	);
}

if (!NEXT_PUBLIC_SUPABASE_URL) {
	throw new Error("NEXT_PUBLIC_SUPABASE_URL environment variable is required");
}

export const supabase = createClient<Database>(
	NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
