import { getToken } from "./auth";
import fetch from "node-fetch";
import { getApiUrl } from "@/shared/helpers";

export interface AirportLocation {
	iataCode: string;
	name: string;
	detailedName: string;
	cityName: string;
	countryName: string;
}

export interface AirportSearchResponse {
	data: AirportLocation[];
}

export async function searchAirports(query: string): Promise<AirportLocation[]> {
	if (!query || query.length < 2) {
		return [];
	}

	const token = await getToken();

	const searchParams = new URLSearchParams({
		keyword: query,
		subType: "AIRPORT",
		"page[limit]": "20",
		"page[offset]": "0",
	});

	const response = await fetch(
		`${getApiUrl()}/v1/reference-data/locations?${searchParams.toString()}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Airport search failed: ${response.status} ${errorText}`);
	}

	const data = (await response.json()) as AirportSearchResponse;
	return data.data || [];
}


