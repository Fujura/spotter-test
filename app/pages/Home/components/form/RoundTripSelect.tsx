import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface RoundTripSelectProps {
	value: string;
	onChange: (value: string) => void;
}

export const RoundTripSelect = ({ value, onChange }: RoundTripSelectProps) => {
	return (
		<FormControl fullWidth>
			<InputLabel
				sx={{
					color: "#4A90E2",
					"&.Mui-focused": { color: "#4A90E2" },
				}}
			>
				Round Trip
			</InputLabel>
			<Select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				label="Round Trip"
				sx={{
					backgroundColor: "rgba(255, 255, 255, 0.9)",
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: "#B8D4F0",
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "#4A90E2",
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "#4A90E2",
					},
				}}
			>
				<MenuItem value="round">Round Trip</MenuItem>
				<MenuItem value="one-way">One Way</MenuItem>
			</Select>
		</FormControl>
	);
};

