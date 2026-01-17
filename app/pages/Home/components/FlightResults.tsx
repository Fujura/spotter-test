import { useState, useMemo, useEffect } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import type { FlightOffer } from "@/api/amadeus/flights";
import dayjs from "dayjs";
import { PriceGraph } from "./PriceGraph";
import { FlightFiltersComponent, type FlightFilters } from "./FlightFilters";
import { filterFlights } from "./utils/flightFilters";

interface FlightResultsProps {
	flights: FlightOffer[];
	onNewSearch?: () => void;
}

export const FlightResults = ({ flights, onNewSearch }: FlightResultsProps) => {
	const allPrices = flights.length > 0 ? flights.map((f) => parseFloat(f.price.total)) : [0, 10000];
	const minPriceRange = flights.length > 0 ? Math.min(...allPrices) : 0;
	const maxPriceRange = flights.length > 0 ? Math.max(...allPrices) : 10000;

	const [filters, setFilters] = useState<FlightFilters>(() => ({
		maxStops: 3,
		minPrice: minPriceRange,
		maxPrice: maxPriceRange,
		airlines: [],
	}));

	// Update price range when flights change
	useEffect(() => {
		if (flights.length > 0) {
			setFilters((prev) => ({
				...prev,
				minPrice: Math.min(prev.minPrice, minPriceRange),
				maxPrice: Math.max(prev.maxPrice, maxPriceRange),
			}));
		}
	}, [flights.length, minPriceRange, maxPriceRange]);

	const filteredFlights = useMemo(
		() => filterFlights(flights, filters),
		[flights, filters]
	);
	if (flights.length === 0) {
		return (
			<Paper
				sx={{
					padding: 3,
					marginTop: 3,
					backgroundColor: "rgba(255, 255, 255, 0.95)",
					backdropFilter: "blur(10px)",
					borderRadius: 4,
					textAlign: "center",
				}}
			>
				<Typography variant="h6" color="text.secondary">
					No flights found
				</Typography>
			</Paper>
		);
	}

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 3,
					padding: 2,
					backgroundColor: "rgba(255, 255, 255, 0.95)",
					backdropFilter: "blur(10px)",
					borderRadius: 2,
					boxShadow: 2,
					flexWrap: "wrap",
					gap: 2,
				}}
			>
				<Typography
					variant="h4"
					sx={{
						color: "#4A90E2",
						fontWeight: 600,
						textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
						fontSize: { xs: "1.5rem", md: "2rem" },
					}}
				>
					Found {filteredFlights.length} of {flights.length}{" "}
					{filteredFlights.length === 1 ? "Flight" : "Flights"}
				</Typography>
				{onNewSearch && (
					<Button
						variant="contained"
						onClick={onNewSearch}
						sx={{
							backgroundColor: "#4A90E2",
							color: "#FFFFFF",
							fontWeight: 600,
							textTransform: "none",
							paddingX: 3,
							paddingY: 1,
							boxShadow: 2,
							"&:hover": {
								backgroundColor: "#3A7BCF",
								boxShadow: 4,
							},
						}}
					>
						New Search
					</Button>
				)}
			</Box>

			<FlightFiltersComponent
				flights={flights}
				filters={filters}
				onFiltersChange={setFilters}
			/>

			<PriceGraph flights={filteredFlights} />

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
					},
					gap: 3,
				}}
			>
				{filteredFlights.length === 0 ? (
					<Paper
						sx={{
							padding: 3,
							gridColumn: "1 / -1",
							backgroundColor: "rgba(255, 255, 255, 0.95)",
							backdropFilter: "blur(10px)",
							borderRadius: 4,
							textAlign: "center",
						}}
					>
						<Typography variant="h6" color="text.secondary">
							No flights match your filters
						</Typography>
					</Paper>
				) : (
					filteredFlights.map((flight, index) => (
					<Paper
						key={flight.id || index}
						elevation={4}
						sx={{
							padding: 3,
							backgroundColor: "rgba(255, 255, 255, 0.95)",
							backdropFilter: "blur(10px)",
							borderRadius: 4,
							border: "1px solid rgba(74, 144, 226, 0.2)",
							transition: "transform 0.2s, box-shadow 0.2s",
							"&:hover": {
								transform: "translateY(-4px)",
								boxShadow: 6,
							},
						}}
					>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							flexWrap: "wrap",
							gap: 2,
						}}
					>
						<Box sx={{ flex: 1, minWidth: "200px" }}>
							{flight.itineraries.map((itinerary, idx) => (
								<Box key={idx} sx={{ marginBottom: idx < flight.itineraries.length - 1 ? 2 : 0 }}>
									<Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>
										{idx === 0 ? "Outbound" : "Return"}
									</Typography>
									{itinerary.segments.map((segment, segIdx) => (
										<Box key={segIdx} sx={{ marginTop: 1 }}>
											<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
												<Box>
													<Typography variant="h6" sx={{ fontWeight: 600, color: "#4A90E2" }}>
														{dayjs(segment.departure.at).format("HH:mm")}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{segment.departure.iataCode}
													</Typography>
												</Box>
												<Box sx={{ flex: 1, textAlign: "center" }}>
													<Typography variant="caption" color="text.secondary">
														{itinerary.duration}
													</Typography>
													<Box
														sx={{
															width: "100%",
															height: "2px",
															backgroundColor: "#B8D4F0",
															marginTop: 0.5,
															position: "relative",
														}}
													>
														<Box
															sx={{
																position: "absolute",
																right: 0,
																top: "-6px",
																width: "0",
																height: "0",
																borderLeft: "8px solid #4A90E2",
																borderTop: "4px solid transparent",
																borderBottom: "4px solid transparent",
															}}
														/>
													</Box>
												</Box>
												<Box sx={{ textAlign: "right" }}>
													<Typography variant="h6" sx={{ fontWeight: 600, color: "#4A90E2" }}>
														{dayjs(segment.arrival.at).format("HH:mm")}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{segment.arrival.iataCode}
													</Typography>
												</Box>
											</Box>
											{segIdx < itinerary.segments.length - 1 && (
												<Typography variant="caption" color="text.secondary" sx={{ marginTop: 1, display: "block" }}>
													Layover at {segment.arrival.iataCode}
												</Typography>
											)}
										</Box>
									))}
								</Box>
							))}
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end",
								minWidth: "120px",
							}}
						>
							<Typography variant="h4" sx={{ fontWeight: 700, color: "#FFB84D" }}>
								{flight.price.currency} {flight.price.total}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								per person
							</Typography>
						</Box>
					</Box>
				</Paper>
					))
				)}
			</Box>
		</Box>
	);
};

