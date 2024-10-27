"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { useEffect } from "react";

import type { AppType } from "@/app/v1/[...path]/route";
import { hc } from "hono/client";

export default function Home() {
	const client = hc<AppType>("/");

	useEffect(() => {
		(async () => {
			const data = await client.v1.transactions.$get();

			console.log(await data.json());
		})();
	}, [client]);

	return <ModeToggle />;
}
