import Link from "next/link";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { ChevronLeft } from "lucide-react";

export default function HelpPage() {
	return (
		<div className="max-w-3xl mx-auto p-6 space-y-6">
			<Link href="/dashboard" className="flex items-center space-x-2">
				<ChevronLeft className="h-4 w-4" />
				<span>Return to Dashboard</span>
			</Link>
			<div>
				<h1 className="text-2xl font-bold mb-4">Help Center</h1>
				<p className="mb-4 text-gray-600">
					Welcome to the Help Center. Here you can find answers to frequently
					asked questions.
				</p>
				<h2 className="text-lg font-semibold mb-2">
					Frequently Asked Questions
				</h2>
				<Accordion type="single" collapsible className="space-y-2">
					<AccordionItem value="item-1">
						<AccordionTrigger>How do I reset my password?</AccordionTrigger>
						<AccordionContent>
							To reset your password, go to the login page and select "Forgot
							Password."
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>
							Where can I view my transactions?
						</AccordionTrigger>
						<AccordionContent>
							Your transactions can be viewed on the Transactions page within
							your dashboard.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>How do I contact support?</AccordionTrigger>
						<AccordionContent>
							You can contact support through the Contact Support page or via
							email at support@finpulse.com.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
