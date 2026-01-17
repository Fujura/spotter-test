import type { FlightOffer } from "@/api/amadeus/flights";
import type { FlightFilters } from "../FlightFilters";

export function filterFlights(flights: FlightOffer[], filters: FlightFilters): FlightOffer[] {
	return flights.filter((flight) => {
		// Filter by max stops
		const maxStopsInFlight = Math.max(
			...flight.itineraries.map((itinerary) => Math.max(0, itinerary.segments.length - 1))
		);
		if (maxStopsInFlight > filters.maxStops) {
			return false;
		}

		// Filter by price range
		const price = parseFloat(flight.price.total);
		if (price < filters.minPrice || price > filters.maxPrice) {
			return false;
		}

		// Filter by airlines
		if (filters.airlines.length > 0) {
			const flightAirlines = new Set(
				flight.itineraries.flatMap((itinerary) =>
					itinerary.segments.map((segment) => segment.carrierCode)
				)
			);
			const hasSelectedAirline = filters.airlines.some((airline) =>
				flightAirlines.has(airline)
			);
			if (!hasSelectedAirline) {
				return false;
			}
		}

		return true;
	});
}

