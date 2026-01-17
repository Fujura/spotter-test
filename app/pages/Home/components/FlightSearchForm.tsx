import { Box, Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
	RoundTripSelect,
	UsersCountSelect,
	TicketTypeSelect,
	AirportAutocomplete,
	FlightDatePicker,
	SearchButton,
} from "./form";

interface FlightSearchFormProps {
	roundTrip: string;
	usersCount: string;
	ticketType: string;
	whereFrom: string;
	whereTo: string;
	departureDate: any;
	returnDate: any;
	fromAirports: any[];
	toAirports: any[];
	loadingFrom: boolean;
	loadingTo: boolean;
	loadingFlights: boolean;
	onRoundTripChange: (value: string) => void;
	onUsersCountChange: (value: string) => void;
	onTicketTypeChange: (value: string) => void;
	onWhereFromChange: (value: string) => void;
	onWhereToChange: (value: string) => void;
	onDepartureDateChange: (value: any) => void;
	onReturnDateChange: (value: any) => void;
	onSubmit: (e: React.FormEvent) => void;
}

export const FlightSearchForm = ({
	roundTrip,
	usersCount,
	ticketType,
	whereFrom,
	whereTo,
	departureDate,
	returnDate,
	fromAirports,
	toAirports,
	loadingFrom,
	loadingTo,
	loadingFlights,
	onRoundTripChange,
	onUsersCountChange,
	onTicketTypeChange,
	onWhereFromChange,
	onWhereToChange,
	onDepartureDateChange,
	onReturnDateChange,
	onSubmit,
}: FlightSearchFormProps) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box
				component="form"
				onSubmit={onSubmit}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
					padding: 3,
				}}
			>
				<Paper
					elevation={8}
					sx={{
						padding: 4,
						borderRadius: 4,
						backgroundColor: "rgba(255, 255, 255, 0.95)",
						backdropFilter: "blur(10px)",
						maxWidth: 900,
						width: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 3,
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 3,
							}}
						>
							<Box
								sx={{
									flex: {
										xs: "1 1 100%",
										sm: "1 1 calc(50% - 12px)",
										md: "1 1 calc(33.333% - 16px)",
									},
								}}
							>
								<RoundTripSelect value={roundTrip} onChange={onRoundTripChange} />
							</Box>

							<Box
								sx={{
									flex: {
										xs: "1 1 100%",
										sm: "1 1 calc(50% - 12px)",
										md: "1 1 calc(33.333% - 16px)",
									},
								}}
							>
								<UsersCountSelect value={usersCount} onChange={onUsersCountChange} />
							</Box>

							<Box
								sx={{
									flex: {
										xs: "1 1 100%",
										sm: "1 1 calc(50% - 12px)",
										md: "1 1 calc(33.333% - 16px)",
									},
								}}
							>
								<TicketTypeSelect value={ticketType} onChange={onTicketTypeChange} />
							</Box>
						</Box>

						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 3,
							}}
						>
							<Box
								sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
							>
								<AirportAutocomplete
									label="Where From"
									value={whereFrom}
									options={fromAirports}
									loading={loadingFrom}
									onInputChange={onWhereFromChange}
									onChange={onWhereFromChange}
								/>
							</Box>

							<Box
								sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
							>
								<AirportAutocomplete
									label="Where To"
									value={whereTo}
									options={toAirports}
									loading={loadingTo}
									onInputChange={onWhereToChange}
									onChange={onWhereToChange}
								/>
							</Box>
						</Box>

						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 3,
							}}
						>
							<Box
								sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
							>
								<FlightDatePicker
									label="Departure Date"
									value={departureDate}
									onChange={onDepartureDateChange}
								/>
							</Box>

							<Box
								sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
							>
								<FlightDatePicker
									label="Return Date"
									value={returnDate}
									onChange={onReturnDateChange}
									minDate={departureDate}
								/>
							</Box>
						</Box>

						<Box>
							<SearchButton loading={loadingFlights} />
						</Box>
					</Box>
				</Paper>
			</Box>
		</LocalizationProvider>
	);
};

