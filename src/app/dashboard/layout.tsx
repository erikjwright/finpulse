import { ChevronDown, User } from "lucide-react";
import Link from "next/link";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="w-full flex flex-col">
				{/* Header */}
				<header className="flex items-center justify-between w-full px-4 py-3 border-b shadow-sm">
					<div className="flex items-center space-x-4">
						<SidebarTrigger />
						<h1 className="text-lg font-semibold">FinPulse</h1>
					</div>
					<div className="flex items-center space-x-4">
						<ModeToggle />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button type="button" className="flex items-center space-x-2">
									<User className="w-5 h-5" />
									<ChevronDown className="w-4 h-4" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<Link href="/dashboard/profile">
									<DropdownMenuItem>Profile</DropdownMenuItem>
								</Link>
								<Link href="/dashboard/settings">
									<DropdownMenuItem>Settings</DropdownMenuItem>
								</Link>
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>

				{/* Main Content */}
				<main className="flex-1 p-6">{children}</main>
			</div>
		</SidebarProvider>
	);
}
