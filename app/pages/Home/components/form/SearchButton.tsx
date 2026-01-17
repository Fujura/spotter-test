import { Button } from "@mui/material";

interface SearchButtonProps {
	loading: boolean;
}

export const SearchButton = ({ loading }: SearchButtonProps) => {
	return (
		<Button
			type="submit"
			fullWidth
			variant="contained"
			size="large"
			disabled={loading}
			sx={{
				backgroundColor: "#FFB84D",
				color: "#FFFFFF",
				padding: "12px",
				fontSize: "16px",
				fontWeight: 600,
				textTransform: "none",
				borderRadius: 2,
				"&:hover": {
					backgroundColor: "#FFA726",
				},
				"&:disabled": {
					backgroundColor: "#FFB84D",
					opacity: 0.6,
				},
			}}
		>
			{loading ? "Searching..." : "Search Tickets"}
		</Button>
	);
};

