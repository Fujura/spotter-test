import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

interface FlightDatePickerProps {
	label: string;
	value: Dayjs | null;
	onChange: (value: Dayjs | null) => void;
	minDate?: Dayjs | null;
}

export const FlightDatePicker = ({
	label,
	value,
	onChange,
	minDate,
}: FlightDatePickerProps) => {
	return (
		<DatePicker
			label={label}
			value={value}
			onChange={onChange}
			minDate={minDate || undefined}
			slotProps={{
				textField: {
					fullWidth: true,
					sx: {
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
					},
				},
			}}
		/>
	);
};

