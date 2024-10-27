"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
	return (
		<div className="space-y-6 p-6">
			{/* Account Settings */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl font-bold">Account Settings</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Email"
							defaultValue="johndoe@example.com"
						/>
					</div>
					<Button>Update Email</Button>
				</CardContent>
			</Card>

			{/* Notification Settings */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl font-bold">
						Notification Preferences
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<Label htmlFor="email-notifications">Email Notifications</Label>
						<Switch id="email-notifications" defaultChecked />
					</div>
					<div className="flex items-center justify-between">
						<Label htmlFor="sms-notifications">SMS Notifications</Label>
						<Switch id="sms-notifications" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
