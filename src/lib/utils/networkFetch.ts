/*

	This is a helper function i often copy/paste around to handle network requests and errors without using throws to make the handling more explicit.

*/

// Define types for network responses
export type NetworkSuccess<T> = {
	data: T;
	error: null;
	status: number;
	headers?: Headers;
};

export type NetworkErrorDetails = {
	status: number;
	statusText: string;
	message: string;
	details?: unknown;
};

export type NetworkError = {
	data: null;
	error: NetworkErrorDetails;
};

export type NetworkResult<T> = NetworkSuccess<T> | NetworkError;

// Specialized function for handling fetch requests
export async function fetchWithErrorHandling<T>(
	url: string,
	options?: RequestInit
): Promise<NetworkResult<T>> {
	try {
		const response = await fetch(url, options);

		// Handle successful responses
		if (response.ok) {
			const data = await response.json();
			return {
				data: data as T,
				error: null,
				status: response.status,
				headers: response.headers
			};
		}

		// Handle error responses
		let errorDetails: unknown;

		try {
			errorDetails = await response.json();
		} catch {
			errorDetails = { message: response.statusText };
		}

		return {
			data: null,
			error: {
				status: response.status,
				statusText: response.statusText,
				message: `Request failed with status ${response.status}: ${response.statusText}`,
				details: errorDetails
			}
		};
	} catch (error: unknown) {
		// Handle network errors or other exceptions
		return {
			data: null,
			error: {
				status: 0,
				statusText: 'Network Error',
				message: error instanceof Error ? error.message : 'Unknown network error',
				details: error
			}
		};
	}
}
