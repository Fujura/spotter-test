export function validateIATACode(code: string): boolean {
	return /^[A-Z]{3}$/.test(code.toUpperCase().trim());
}

export function normalizeIATACode(code: string): string {
	return code.toUpperCase().trim();
}

export function validateAndNormalizeIATACode(code: string): {
	valid: boolean;
	code: string;
	error?: string;
} {
	const normalized = normalizeIATACode(code);

	if (!normalized) {
		return { valid: false, code: normalized, error: "IATA code is required" };
	}

	if (normalized.length !== 3) {
		return {
			valid: false,
			code: normalized,
			error: "IATA code must be exactly 3 letters (e.g., NYC, LON, PAR)",
		};
	}

	if (!validateIATACode(normalized)) {
		return {
			valid: false,
			code: normalized,
			error: "IATA code must contain only letters (e.g., NYC, LON, PAR)",
		};
	}

	return { valid: true, code: normalized };
}


