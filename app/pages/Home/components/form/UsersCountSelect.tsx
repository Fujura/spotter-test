import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface UsersCountSelectProps {
	value: string;
	onChange: (value: string) => void;
}

export const UsersCountSelect = ({ value, onChange }: UsersCountSelectProps) => {
	return (
		<FormControl fullWidth>
			<InputLabel
				sx={{
					color: "#4A90E2",
					"&.Mui-focused": { color: "#4A90E2" },
				}}
			>
				Users Count
			</InputLabel>
			<Select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				label="Users Count"
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
				{[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
					<MenuItem key={num} value={num.toString()}>
						{num} {num === 1 ? "Passenger" : "Passengers"}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

