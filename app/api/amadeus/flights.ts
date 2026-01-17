import { getToken } from "./auth";
import fetch from "node-fetch";
import { getApiUrl } from "@/shared/helpers";

export interface FlightSearchParams {
	originLocationCode: string;
	destinationLocationCode: string;
	departureDate: string;
	returnDate?: string;
	adults: number;
}

export interface FlightOffer {
	id: string;
	price: {
		total: string;
		currency: string;
	};
	itineraries: Array<{
		duration: string;
		segments: Array<{
			departure: {
				iataCode: string;
				at: string;
			};
			arrival: {
				iataCode: string;
				at: string;
			};
			carrierCode: string;
		}>;
	}>;
}

export async function searchFlights(params: FlightSearchParams): Promise<FlightOffer[]> {
	const token = await getToken();

	const searchParams = new URLSearchParams({
		originLocationCode: params.originLocationCode,
		destinationLocationCode: params.destinationLocationCode,
		departureDate: params.departureDate,
		adults: params.adults.toString(),
		currencyCode: "USD",
		max: "10",
	});

	if (params.returnDate) {
		searchParams.append("returnDate", params.returnDate);
	}

	const response = await fetch(
		`${getApiUrl()}/v2/shopping/flight-offers?${searchParams.toString()}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Flight search failed: ${response.status} ${errorText}`);
	}

	const data = (await response.json()) as { data: FlightOffer[] };
	return data.data;
}


