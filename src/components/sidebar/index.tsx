import {
	Sidebar as BaseSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	HelpCircle,
	User,
	LayoutDashboard,
	Folder,
	TrendingUp,
	Target,
	BarChart2, // For Reports
	PieChart, // For Insights
	LineChart, // For Projections
} from "lucide-react";
import { SidebarHeader } from "@/components/sidebar/header";

export function AppSidebar() {
	return (
		<BaseSidebar className="flex flex-col justify-between">
			<SidebarHeader />

			<SidebarContent className="flex-grow">
				{/* Overview Section */}
				<SidebarGroup>
					<SidebarGroupLabel>Overview</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/dashboard">
										<LayoutDashboard className="mr-2 h-5 w-5" />
										Dashboard
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Portfolio Management Section */}
				<SidebarGroup>
					<SidebarGroupLabel>Portfolio Management</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/dashboard/portfolio">
										<Folder className="mr-2 h-5 w-5" />
										Portfolio
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/dashboard/transactions">
										<TrendingUp className="mr-2 h-5 w-5" />
										Transactions
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Planning & Analysis Section */}
				<SidebarGroup>
					<SidebarGroupLabel>Planning & Analysis</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/dashboard/goals">
										<Target className="mr-2 h-5 w-5" />
										Goals
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/dashboard/projections">
										<LineChart className="mr-2 h-5 w-5" />
										Projections
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/dashboard/insights">
										<PieChart className="mr-2 h-5 w-5" />
										Insights
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/dashboard/reports">
										<BarChart2 className="mr-2 h-5 w-5" />
										Reports
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Help & Support Section at the End */}
			<SidebarFooter>
				<SidebarGroup>
					<SidebarGroupLabel>Help & Support</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/help">
										<HelpCircle className="mr-2 h-5 w-5" />
										Help Center
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/support">
										<User className="mr-2 h-5 w-5" />
										Contact Support
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarFooter>
		</BaseSidebar>
	);
}
