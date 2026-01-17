import { Box, Paper, Typography, Slider, FormControl, Select, MenuItem, Chip } from "@mui/material";
import type { FlightOffer } from "@/api/amadeus/flights";

export interface FlightFilters {
	maxStops: number;
	minPrice: number;
	maxPrice: number;
	airlines: string[];
}

interface FlightFiltersProps {
	flights: FlightOffer[];
	filters: FlightFilters;
	onFiltersChange: (filters: FlightFilters) => void;
}

export const FlightFiltersComponent = ({
	flights,
	filters,
	onFiltersChange,
}: FlightFiltersProps) => {
	// Get unique airlines from flights
	const allAirlines = Array.from(
		new Set(
			flights.flatMap((flight) =>
				flight.itineraries.flatMap((itinerary) =>
					itinerary.segments.map((segment) => segment.carrierCode)
				)
			)
		)
	).sort();

	// Calculate price range from flights
	const allPrices = flights.length > 0 ? flights.map((f) => parseFloat(f.price.total)) : [0, 10000];
	const minPriceRange = flights.length > 0 ? Math.min(...allPrices) : 0;
	const maxPriceRange = flights.length > 0 ? Math.max(...allPrices) : 10000;

	const handleMaxStopsChange = (value: number) => {
		onFiltersChange({ ...filters, maxStops: value });
	};

	const handlePriceChange = (_: Event, newValue: number | number[]) => {
		const [min, max] = newValue as number[];
		onFiltersChange({ ...filters, minPrice: min, maxPrice: max });
	};

	const handleAirlineToggle = (airline: string) => {
		const newAirlines = filters.airlines.includes(airline)
			? filters.airlines.filter((a) => a !== airline)
			: [...filters.airlines, airline];
		onFiltersChange({ ...filters, airlines: newAirlines });
	};

	const handleClearFilters = () => {
		onFiltersChange({
			maxStops: 3,
			minPrice: minPriceRange,
			maxPrice: maxPriceRange,
			airlines: [],
		});
	};

	return (
		<Paper
			elevation={4}
			sx={{
				padding: 3,
				backgroundColor: "rgba(255, 255, 255, 0.95)",
				backdropFilter: "blur(10px)",
				borderRadius: 4,
				marginBottom: 3,
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 2,
				}}
			>
				<Typography
					variant="h5"
					sx={{
						color: "#4A90E2",
						fontWeight: 600,
					}}
				>
					Filters
				</Typography>
				<Chip
					label="Clear All"
					onClick={handleClearFilters}
					sx={{
						backgroundColor: "#4A90E2",
						color: "white",
						"&:hover": {
							backgroundColor: "#3A7BCF",
						},
					}}
				/>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					gap: 3,
				}}
			>
				<Box sx={{ flex: 1 }}>
					<Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
						Max Stops
					</Typography>
					<FormControl fullWidth>
						<Select
							value={filters.maxStops}
							onChange={(e) => handleMaxStopsChange(Number(e.target.value))}
							sx={{
								backgroundColor: "rgba(255, 255, 255, 0.9)",
							}}
						>
							<MenuItem value={0}>Non-stop</MenuItem>
							<MenuItem value={1}>1 stop</MenuItem>
							<MenuItem value={2}>2 stops</MenuItem>
							<MenuItem value={3}>3+ stops</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Box sx={{ flex: 1 }}>
					<Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
						Price Range: ${filters.minPrice.toFixed(0)} - ${filters.maxPrice.toFixed(0)}
					</Typography>
					<Slider
						value={[filters.minPrice, filters.maxPrice]}
						onChange={handlePriceChange}
						min={minPriceRange}
						max={maxPriceRange}
						valueLabelDisplay="auto"
						valueLabelFormat={(value) => `$${value.toFixed(0)}`}
						sx={{
							color: "#4A90E2",
						}}
					/>
				</Box>
			</Box>

			{allAirlines.length > 0 && (
				<Box sx={{ marginTop: 3 }}>
					<Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
						Airlines
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							gap: 1,
						}}
					>
						{allAirlines.map((airline) => (
							<Chip
								key={airline}
								label={airline}
								onClick={() => handleAirlineToggle(airline)}
								sx={{
									backgroundColor: filters.airlines.includes(airline)
										? "#4A90E2"
										: "rgba(74, 144, 226, 0.1)",
									color: filters.airlines.includes(airline) ? "white" : "#4A90E2",
									"&:hover": {
										backgroundColor: filters.airlines.includes(airline)
											? "#3A7BCF"
											: "rgba(74, 144, 226, 0.2)",
									},
								}}
							/>
						))}
					</Box>
				</Box>
			)}
		</Paper>
	);
};

