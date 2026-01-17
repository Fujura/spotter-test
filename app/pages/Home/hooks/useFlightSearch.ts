import { useMutation } from "react-query";
import type { FlightOffer } from "@/api/amadeus/flights";

interface FlightSearchParams {
	from: string;
	to: string;
	departure: string;
	return?: string;
	adults: string;
}

interface FlightSearchResponse {
	flights: FlightOffer[];
	error: string | null;
}

const searchFlights = async (params: FlightSearchParams): Promise<FlightOffer[]> => {
	const searchParams = new URLSearchParams({
		from: params.from,
		to: params.to,
		departure: params.departure,
		adults: params.adults,
	});

	if (params.return) {
		searchParams.append("return", params.return);
	}

	const response = await fetch(`/api/flights/search?${searchParams.toString()}`);
	const data: FlightSearchResponse = await response.json();

	if (data.error) {
		throw new Error(data.error);
	}

	return data.flights || [];
};

export const useFlightSearch = () => {
	return useMutation({
		mutationFn: searchFlights,
	});
};

