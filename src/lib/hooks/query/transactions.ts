import { useQuery as useBaseQuery, useMutation } from "@tanstack/react-query";
import type {
	ClientResponse,
	InferRequestType,
	InferResponseType,
} from "hono/client";
import { useEffect, useState } from "react";

import type {
	InsertTransaction,
	SelectTransaction,
	insertTransactionSchema,
	selectTransactionSchema,
} from "@/db/schema";
import { queryClient } from "@/lib/utils/hono/client";

// async function getTransactions(): Promise<Transaction[]> {
// 	// Fetch data from your API here.
// 	return [
// 		{
// 			id: "1",
// 			assetName: "Apple Inc.",
// 			transactionType: "buy",
// 			amount: 10,
// 			pricePerUnit: 145.32,
// 			total: 1453.2,
// 			date: new Date("2023-06-15"),
// 			assetType: "stock",
// 		},
// 		{
// 			id: "2",
// 			assetName: "Bitcoin",
// 			transactionType: "buy",
// 			amount: 0.5,
// 			pricePerUnit: 25000,
// 			total: 12500,
// 			date: new Date("2023-06-12"),
// 			assetType: "crypto",
// 		},
// 		{
// 			id: "3",
// 			assetName: "Tesla",
// 			transactionType: "sell",
// 			amount: 5,
// 			pricePerUnit: 200,
// 			total: 1000,
// 			date: new Date("2023-05-20"),
// 			assetType: "stock",
// 		},
// 		{
// 			id: "4",
// 			assetName: "US Treasury Bond",
// 			transactionType: "buy",
// 			amount: 2,
// 			pricePerUnit: 1000,
// 			total: 2000,
// 			date: new Date("2023-05-01"),
// 			assetType: "bond",
// 		},
// 		{
// 			id: "5",
// 			assetName: "Ethereum",
// 			transactionType: "buy",
// 			amount: 1,
// 			pricePerUnit: 2000,
// 			total: 2000,
// 			date: new Date("2023-04-10"),
// 			assetType: "crypto",
// 		},
// 	];
// }

export function useQuery<T>(
	queryKey: string[],
	method: () => Promise<ClientResponse<T>>,
) {
	const { data, isError, isLoading } = useBaseQuery({
		queryKey,
		queryFn: async () => {
			return await method();
		},
	});

	return { data, isError, isLoading };
}

// export function useMutationTransaction() {
// 	const $post = client.todo.$post;

// 	const mutation = useMutation<
// 		InferResponseType<typeof $post>,
// 		Error,
// 		InferRequestType<typeof $post>["form"]
// 	>(
// 		async (todo) => {
// 			const res = await $post({
// 				form: todo,
// 			});
// 			return await res.json();
// 		},
// 		{
// 			onSuccess: async () => {
// 				queryClient.invalidateQueries({ queryKey: ["todos"] });
// 			},
// 			onError: (error) => {
// 				console.log(error);
// 			},
// 		},
// 	);
// }
