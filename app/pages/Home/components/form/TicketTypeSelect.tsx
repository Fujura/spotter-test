import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface TicketTypeSelectProps {
	value: string;
	onChange: (value: string) => void;
}

export const TicketTypeSelect = ({ value, onChange }: TicketTypeSelectProps) => {
	return (
		<FormControl fullWidth>
			<InputLabel
				sx={{
					color: "#4A90E2",
					"&.Mui-focused": { color: "#4A90E2" },
				}}
			>
				Ticket Type
			</InputLabel>
			<Select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				label="Ticket Type"
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
				<MenuItem value="economy">Economy</MenuItem>
				<MenuItem value="business">Business</MenuItem>
				<MenuItem value="first">First Class</MenuItem>
			</Select>
		</FormControl>
	);
};

