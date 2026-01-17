import { useState } from "react";
import { Box } from "@mui/material";
import { Route } from "../../+types/root";
import { FlightSearchForm, type FormState } from "./components/FlightSearchForm";
import { AirplaneLoader } from "./components/AirplaneLoader";
import { FlightResults } from "./components/FlightResults";
import { useAirportSearch } from "./components/hooks/useAirportSearch";
import { useFlightSearch } from "./hooks/useFlightSearch";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "AviaTickets - Flight Search" },
		{ name: "description", content: "Search and book flights" },
	];
}

export default function Home() {
	const [formState, setFormState] = useState<FormState>({
		roundTrip: "round",
		usersCount: "1",
		ticketType: "economy",
		whereFrom: "",
		whereTo: "",
		departureDate: null,
		returnDate: null,
	});

	const { airports: fromAirports, loading: loadingFrom } = useAirportSearch(formState.whereFrom);
	const { airports: toAirports, loading: loadingTo } = useAirportSearch(formState.whereTo);

	const flightSearch = useFlightSearch();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formState.whereFrom || !formState.whereTo || !formState.departureDate) {
			alert("Please fill in all required fields");
			return;
		}

		if (formState.whereFrom.length !== 3 || formState.whereTo.length !== 3) {
			alert(
				"Please enter valid 3-letter IATA airport codes (e.g., NYC, LON, PAR)"
			);
			return;
		}

		const params = {
			from: formState.whereFrom.toUpperCase(),
			to: formState.whereTo.toUpperCase(),
			departure: formState.departureDate.format("YYYY-MM-DD"),
			adults: formState.usersCount,
			return: formState.roundTrip === "round" && formState.returnDate ? formState.returnDate.format("YYYY-MM-DD") : undefined,
		};

		flightSearch.mutate(params, {
			onError: (error: unknown) => {
				const errorMessage = error instanceof Error ? error.message : "Failed to search flights";
				alert(`Error: ${errorMessage}`);
			},
		});
	};

	const handleNewSearch = () => {
		flightSearch.reset();
	};

	const flights = flightSearch.data || [];
	const loadingFlights = flightSearch.isLoading;

	return (
		<main className="bg-[url(/images/main_background.png)] bg-no-repeat bg-center bg-cover w-full min-h-screen">
			{loadingFlights ? (
				<Box
				sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						minHeight: "100vh",
						width:"100%"
					}}
					>
					<AirplaneLoader />
				</Box>
			) : flights.length > 0 ? (
				<Box
					sx={{
						minHeight: "100vh",
						padding: 3,
					}}
				>
					<FlightResults flights={flights} onNewSearch={handleNewSearch} />
				</Box>
			) : (
				<FlightSearchForm
					formState={formState}
					onFormStateChange={setFormState}
					fromAirports={fromAirports}
					toAirports={toAirports}
					loadingFrom={loadingFrom}
					loadingTo={loadingTo}
					loadingFlights={loadingFlights}
					onSubmit={handleSubmit}
				/>
			)}
		</main>
	);
}
