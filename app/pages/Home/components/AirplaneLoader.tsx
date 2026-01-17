import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export const AirplaneLoader = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const duration = 3000;
		const interval = 20;
		const increment = (100 / duration) * interval;

		const timer = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(timer);
					return 100;
				}
				return Math.min(prev + increment, 100);
			});
		}, interval);

		return () => clearInterval(timer);
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: 4,
				gap: 2,
				minHeight: "300px",
				width:"100%"
			}}
		>
			<Box
				sx={{
					position: "relative",
					width: "100%",
					maxWidth: "800px",
					height: "10px",
					backgroundColor: "rgba(74, 144, 226, 0.2)",
					borderRadius: "5px",
					overflow: "visible",
					marginTop: "80px",
				}}
			>
				<Box
					sx={{
						position: "absolute",
						height: "100%",
						width: `${progress}%`,
						backgroundColor: "#4A90E2",
						borderRadius: "5px",
						transition: "width 0.1s linear",
					}}
				/>
				<Box
					sx={{
						position: "absolute",
						width: "80px",
						height: "80px",
						top: "-35px",
						left: `calc(${progress}% - 40px)`,
						transition: "left 0.1s linear",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<img
						src="/icons/airplane_icon.svg"
						alt="airplane icon"
						fetchPriority="high"
						loading="eager"
						style={{
							width: "80px",
							height: "80px",
							display: "block",
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};

