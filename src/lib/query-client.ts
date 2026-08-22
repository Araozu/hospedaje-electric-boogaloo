import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60_000,
			gcTime: 10 * 60_000,
			networkMode: "online",
			refetchOnWindowFocus: false,
			retry: 1,
		},
		mutations: {
			networkMode: "online",
			retry: false,
		},
	},
});
