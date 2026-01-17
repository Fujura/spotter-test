import { getApiKey, getApiSecret, getApiUrl } from "@/shared/helpers";
import fetch from "node-fetch";

interface AuthResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
}

interface TokenCache {
	token: string;
	expiresAt: number;
}

let tokenCache: TokenCache | null = null;

export async function getToken(): Promise<string> {
	if (tokenCache && tokenCache.expiresAt > Date.now()) {
		return tokenCache.token;
	}

	try {
		const response = await fetch(`${getApiUrl()}/v1/security/oauth2/token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "client_credentials",
				client_id: getApiKey(),
				client_secret: getApiSecret(),
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Auth failed: ${response.status} ${errorText}`);
		}

		const data = (await response.json()) as AuthResponse;

		tokenCache = {
			token: data.access_token,
			expiresAt: Date.now() + (data.expires_in - 60) * 1000,
		};

		return data.access_token;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to get Amadeus token: ${error.message}`);
		}
		throw new Error("Failed to get Amadeus token: Unknown error");
	}
}

export function clearTokenCache(): void {
	tokenCache = null;
}
