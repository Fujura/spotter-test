import type { Route } from "../../+types/root";
import { searchFlights, type FlightSearchParams } from "../amadeus/flights";
import { validateAndNormalizeIATACode } from "@/shared/helpers";

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const fromCode = url.searchParams.get("from") || "";
	const toCode = url.searchParams.get("to") || "";

	const fromValidation = validateAndNormalizeIATACode(fromCode);
	const toValidation = validateAndNormalizeIATACode(toCode);

	if (!fromValidation.valid || !toValidation.valid) {
		const errors = [];
		if (!fromValidation.valid) {
			errors.push(`Origin: ${fromValidation.error}`);
		}
		if (!toValidation.valid) {
			errors.push(`Destination: ${toValidation.error}`);
		}
		return { error: errors.join(" "), flights: [] };
	}

	const params: FlightSearchParams = {
		originLocationCode: fromValidation.code,
		destinationLocationCode: toValidation.code,
		departureDate: url.searchParams.get("departure") || "",
		returnDate: url.searchParams.get("return") || undefined,
		adults: parseInt(url.searchParams.get("adults") || "1", 10),
	};

	if (!params.departureDate) {
		return { error: "Departure date is required", flights: [] };
	}

	try {
		const flights = await searchFlights(params);
		return { flights, error: null };
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : "Failed to search flights",
			flights: [],
		};
	}
}

