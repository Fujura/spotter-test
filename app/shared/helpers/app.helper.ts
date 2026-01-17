export const getApiUrl = () => {
	if (process.env.AMADEUS_API_URL) return process.env.AMADEUS_API_URL || "";
	else {
		throw Error("You should provide AMADEUS_API_URL in .env file");
	}
};

export const getApiKey = () => {
	if (process.env.AMADEUS_API_KEY) return process.env.AMADEUS_API_KEY || "";
	else {
		throw Error("You should provide AMADEUS_API_KEY in .env file");
	}
};

export const getApiSecret = () => {
	if (process.env.AMADEUS_API_SECRET)
		return process.env.AMADEUS_API_SECRET || "";
	else {
		throw Error("You should provide AMADEUS_API_SECRET in .env file");
	}
};
