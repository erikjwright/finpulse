"use client";

import Link from "next/link";
import { useState, type SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function SupportPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission logic
		alert("Message submitted!");
	};

	return (
		<div className="max-w-3xl mx-auto p-6 space-y-6">
			<Link href="/dashboard" className="flex items-center space-x-2">
				<ChevronLeft className="h-4 w-4" />
				<span>Return to Dashboard</span>
			</Link>
			<h1 className="text-2xl font-bold mb-4">Contact Support</h1>
			<p className="mb-4 text-gray-600">
				Need further assistance? Fill out the form below, and our support team
				will get back to you.
			</p>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700"
					>
						Name
					</label>
					<Input
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Your name"
					/>
				</div>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Your email"
					/>
				</div>
				<div>
					<label
						htmlFor="message"
						className="block text-sm font-medium text-gray-700"
					>
						Message
					</label>
					<Textarea
						id="message"
						value={message}
						onChange={(e: { target: { value: SetStateAction<string> } }) =>
							setMessage(e.target.value)
						}
						placeholder="How can we help you?"
					/>
				</div>
				<Button type="submit" className="mt-4">
					Submit
				</Button>
			</form>
		</div>
	);
}
