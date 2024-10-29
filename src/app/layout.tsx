import "@fontsource-variable/figtree";
import type { Metadata } from "next";

import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
	title: "FinPulse",
	description: "FinPulse is a financial dashboard application.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
