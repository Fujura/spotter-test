import type { Route } from "../../+types/root";
import { searchAirports } from "../amadeus/airports";

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const query = url.searchParams.get("q") || "";

	if (!query || query.length < 2) {
		return { airports: [] };
	}

	try {
		const airports = await searchAirports(query);
		return { airports };
	} catch (error) {
		return {
			airports: [],
			error: error instanceof Error ? error.message : "Failed to search airports",
		};
	}
}


