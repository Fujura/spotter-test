import { Box, Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import {
	RoundTripSelect,
	UsersCountSelect,
	TicketTypeSelect,
	AirportAutocomplete,
	FlightDatePicker,
	SearchButton,
} from "./form";

export interface FormState {
	roundTrip: string;
	usersCount: string;
	ticketType: string;
	whereFrom: string;
	whereTo: string;
	departureDate: Dayjs | null;
	returnDate: Dayjs | null;
}

interface FlightSearchFormProps {
	formState: FormState;
	onFormStateChange: (state: FormState | ((prev: FormState) => FormState)) => void;
	fromAirports: any[];
	toAirports: any[];
	loadingFrom: boolean;
	loadingTo: boolean;
	loadingFlights: boolean;
	onSubmit: (e: React.FormEvent) => void;
}

export const FlightSearchForm = ({
	formState,
	onFormStateChange,
	fromAirports,
	toAirports,
	loadingFrom,
	loadingTo,
	loadingFlights,
	onSubmit,
}: FlightSearchFormProps) => {
	const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
		onFormStateChange((prev) => ({ ...prev, [field]: value }));
	};
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
								<RoundTripSelect value={formState.roundTrip} onChange={(value) => updateField("roundTrip", value)} />
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
								<UsersCountSelect value={formState.usersCount} onChange={(value) => updateField("usersCount", value)} />
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
								<TicketTypeSelect value={formState.ticketType} onChange={(value) => updateField("ticketType", value)} />
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
								value={formState.whereFrom}
								options={fromAirports}
								loading={loadingFrom}
								onInputChange={(value) => updateField("whereFrom", value)}
								onChange={(value) => updateField("whereFrom", value)}
							/>
							</Box>

							<Box
								sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
							>
							<AirportAutocomplete
								label="Where To"
								value={formState.whereTo}
								options={toAirports}
								loading={loadingTo}
								onInputChange={(value) => updateField("whereTo", value)}
								onChange={(value) => updateField("whereTo", value)}
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
								value={formState.departureDate}
								onChange={(value) => updateField("departureDate", value)}
							/>
							</Box>

							<Box
								sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
							>
							<FlightDatePicker
								label="Return Date"
								value={formState.returnDate}
								onChange={(value) => updateField("returnDate", value)}
								minDate={formState.departureDate}
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

