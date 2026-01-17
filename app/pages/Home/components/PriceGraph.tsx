import { Box, Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import type { FlightOffer } from "@/api/amadeus/flights";

interface PriceGraphProps {
	flights: FlightOffer[];
}

export const PriceGraph = ({ flights }: PriceGraphProps) => {
	if (flights.length === 0) {
		return null;
	}

	const priceData = flights.map((flight, index) => ({
		index,
		price: parseFloat(flight.price.total),
		label: `Flight ${index + 1}`,
	}));

	const prices = priceData.map((d) => d.price);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);

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
			<Typography
				variant="h5"
				sx={{
					color: "#4A90E2",
					fontWeight: 600,
					marginBottom: 2,
				}}
			>
				Price Trends
			</Typography>
			<Box
				sx={{
					width: "100%",
					height: { xs: "300px", md: "400px" },
				}}
			>
				<LineChart
					xAxis={[
						{
							data: priceData.map((_, i) => i),
							label: "Flight",
							scaleType: "point",
						},
					]}
					yAxis={[
						{
							label: "Price (USD)",
							min: Math.max(0, minPrice - 50),
							max: maxPrice + 50,
						},
					]}
					series={[
						{
							data: prices,
							label: "Price",
							color: "#4A90E2",
							curve: "natural",
						},
					]}
					width={undefined}
					height={undefined}
					sx={{
						width: "100%",
						height: "100%",
					}}
				/>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					marginTop: 2,
					flexWrap: "wrap",
					gap: 1,
				}}
			>
				<Typography variant="body2" color="text.secondary">
					Min: ${minPrice.toFixed(2)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Max: ${maxPrice.toFixed(2)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Avg: ${(prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)}
				</Typography>
			</Box>
		</Paper>
	);
};

