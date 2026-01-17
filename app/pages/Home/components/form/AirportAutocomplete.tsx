import { Box, Autocomplete, TextField } from "@mui/material";

interface AirportOption {
	iataCode: string;
	name: string;
	detailedName: string;
	cityName: string;
	countryName: string;
}

interface AirportAutocompleteProps {
	label: string;
	value: string;
	options: AirportOption[];
	loading: boolean;
	onInputChange: (value: string) => void;
	onChange: (value: string) => void;
}

export const AirportAutocomplete = ({
	label,
	value,
	options,
	loading,
	onInputChange,
	onChange,
}: AirportAutocompleteProps) => {
	return (
		<Autocomplete
			freeSolo
			loading={loading}
			options={options}
			getOptionLabel={(option) =>
				typeof option === "string"
					? option
					: `${option.iataCode} - ${option.detailedName}`
			}
			inputValue={value}
			onInputChange={(_, newValue, reason) => {
				if (reason === "input") {
					onInputChange(newValue);
				}
			}}
			onChange={(_, newValue) => {
				if (typeof newValue === "string") {
					const code = newValue.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
					onChange(code);
				} else if (newValue) {
					onChange(newValue.iataCode);
				} else {
					onChange("");
				}
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					placeholder="Type airport code or name..."
					helperText="Search by code (NYC) or city name (New York)"
					sx={{
						backgroundColor: "rgba(255, 255, 255, 0.9)",
						"& .MuiOutlinedInput-root": {
							"& fieldset": {
								borderColor: "#B8D4F0",
							},
							"&:hover fieldset": {
								borderColor: "#4A90E2",
							},
							"&.Mui-focused fieldset": {
								borderColor: "#4A90E2",
							},
						},
						"& .MuiInputLabel-root": {
							color: "#4A90E2",
						},
						"& .MuiInputLabel-root.Mui-focused": {
							color: "#4A90E2",
						},
					}}
				/>
			)}
			renderOption={(props, option) => (
				<Box
					component="li"
					{...props}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<Box sx={{ fontWeight: 600, color: "#4A90E2" }}>
						{option.iataCode}
					</Box>
					<Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
						{option.detailedName}
					</Box>
				</Box>
			)}
		/>
	);
};

