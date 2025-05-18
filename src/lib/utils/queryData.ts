import { type NetworkResult, fetchWithErrorHandling } from './networkFetch';
import type { DashboardQuery, StationWithArtifactsHistory } from '$lib/types';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
export async function queryData(
	query: DashboardQuery
): Promise<NetworkResult<StationWithArtifactsHistory[]>> {
	const params = new URLSearchParams(query as Record<string, string>).toString();
	const url = `${baseUrl}/api/v1/getSpaceData?${params}`;
	return fetchWithErrorHandling(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
