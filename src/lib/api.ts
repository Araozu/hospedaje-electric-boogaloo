import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import type { paths } from "./api-types";

const API_BASE_URL = "";

export function apiFetch(
	input: RequestInfo | URL,
	init?: RequestInit,
): Promise<Response> {
	return fetch(input, {
		...init,
		credentials: "include",
	});
}

export const fetchClient = createFetchClient<paths>({
	baseUrl: API_BASE_URL,
	fetch: apiFetch,
});

export const backendFetch = fetchClient;
export const backend = createClient(fetchClient);
