"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
	const supabase = createClient();
	const router = useRouter();

	return (
		<Button
			onClick={async () => {
				const { error } = await supabase.auth.signOut();

				if (error) {
					console.error("Error logging out:", error.message);
					return null;
				}

				return router.push("/login");
			}}
			variant="outline"
			className="w-full"
		>
			<DropdownMenuItem>Logout</DropdownMenuItem>
		</Button>
	);
}
