"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
	return (
		<div className="space-y-6 p-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-xl font-bold">
						Profile Information
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center space-x-4">
						<Avatar className="h-16 w-16">
							<AvatarImage
								src="https://via.placeholder.com/150"
								alt="Profile Picture"
							/>
							<AvatarFallback>AB</AvatarFallback>
						</Avatar>
						<Button variant="outline">Change Picture</Button>
					</div>
					<div className="space-y-2">
						<Label className="block text-sm font-medium text-gray-700">
							Full Name
						</Label>
						<Input placeholder="Full Name" defaultValue="John Doe" />
					</div>
					<div className="space-y-2">
						<Label className="block text-sm font-medium text-gray-700">
							Email
						</Label>
						<Input placeholder="Email" defaultValue="johndoe@example.com" />
					</div>
					<Button type="submit">Save Changes</Button>
				</CardContent>
			</Card>
		</div>
	);
}
