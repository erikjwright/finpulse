"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarHeader as BaseSidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { hc } from "hono/client";

import type { AppType } from "@/app/v1/[...path]/route";

export function SidebarHeader() {
	const client = hc<AppType>("/");

	const accounts = [
		{ name: "Checking", number: "8894" },
		{ name: "Savings", number: "4421" },
		{ name: "Vacation Fund", number: "7321" },
	];
	const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

	// const { data } = useQuery({
	// 	queryKey: ["accounts"],
	// 	queryFn: async () => {
	// 		const response = await client.v1.accounts.$get();
	// 		const { data, error } = await response.json();

	// 		if (error) {
	// 			throw new Error(error.message);
	// 		}

	// 		return data;
	// 	},
	// });

	// useEffect(() => {
	// 	if (data) {
	// 		console.log(data);
	// 	}
	// }, [data]);

	return (
		<BaseSidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton>
								<div className="flex justify-between w-full">
									<span>{selectedAccount.name}</span>
									<span className="ml-2 text-muted-foreground">
										...{selectedAccount.number}
									</span>
								</div>
								<ChevronDown className="ml-2" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-[--radix-popper-anchor-width]">
							{accounts.map((account) => (
								<DropdownMenuItem
									key={account.number}
									onClick={() => setSelectedAccount(account)}
								>
									<div className="flex justify-between w-full">
										<span>{account.name}</span>
										<span className="ml-2 text-muted-foreground">
											...{account.number}
										</span>
									</div>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</BaseSidebarHeader>
	);
}
