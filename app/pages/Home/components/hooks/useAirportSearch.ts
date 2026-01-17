import { useState, useEffect } from "react";

interface AirportOption {
	iataCode: string;
	name: string;
	detailedName: string;
	cityName: string;
	countryName: string;
}

export const useAirportSearch = (query: string) => {
	const [airports, setAirports] = useState<AirportOption[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!query || query.length < 2) {
			setAirports([]);
			return;
		}

		const timer = setTimeout(async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`/api/airports/search?q=${encodeURIComponent(query)}`
				);
				const { airports: airportResults } = await response.json();
				setAirports(airportResults || []);
		} catch (error) {
			setAirports([]);
		} finally {
				setLoading(false);
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [query]);

	return { airports, loading };
};

