import { useState } from "react";
import { Box } from "@mui/material";
import { Route } from "../../+types/root";
import dayjs, { Dayjs } from "dayjs";
import { FlightSearchForm } from "./components/FlightSearchForm";
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
	const [roundTrip, setRoundTrip] = useState("round");
	const [usersCount, setUsersCount] = useState("1");
	const [ticketType, setTicketType] = useState("economy");
	const [whereFrom, setWhereFrom] = useState("");
	const [whereTo, setWhereTo] = useState("");
	const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
	const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

	const { airports: fromAirports, loading: loadingFrom } = useAirportSearch(whereFrom);
	const { airports: toAirports, loading: loadingTo } = useAirportSearch(whereTo);

	const flightSearch = useFlightSearch();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!whereFrom || !whereTo || !departureDate) {
			alert("Please fill in all required fields");
			return;
		}

		if (whereFrom.length !== 3 || whereTo.length !== 3) {
			alert(
				"Please enter valid 3-letter IATA airport codes (e.g., NYC, LON, PAR)"
			);
			return;
		}

		const params = {
			from: whereFrom.toUpperCase(),
			to: whereTo.toUpperCase(),
			departure: departureDate.format("YYYY-MM-DD"),
			adults: usersCount,
			return: roundTrip === "round" && returnDate ? returnDate.format("YYYY-MM-DD") : undefined,
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
					roundTrip={roundTrip}
					usersCount={usersCount}
					ticketType={ticketType}
					whereFrom={whereFrom}
					whereTo={whereTo}
					departureDate={departureDate}
					returnDate={returnDate}
					fromAirports={fromAirports}
					toAirports={toAirports}
					loadingFrom={loadingFrom}
					loadingTo={loadingTo}
					loadingFlights={loadingFlights}
					onRoundTripChange={setRoundTrip}
					onUsersCountChange={setUsersCount}
					onTicketTypeChange={setTicketType}
					onWhereFromChange={setWhereFrom}
					onWhereToChange={setWhereTo}
					onDepartureDateChange={setDepartureDate}
					onReturnDateChange={setReturnDate}
					onSubmit={handleSubmit}
				/>
			)}
		</main>
	);
}
