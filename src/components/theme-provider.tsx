"use client";

import { useMounted } from "@/lib/hooks/mounted";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const mounted = useMounted();

	return (
		mounted && <NextThemesProvider {...props}>{children}</NextThemesProvider>
	);
}
