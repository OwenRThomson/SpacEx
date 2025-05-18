import { type NetworkResult, fetchWithErrorHandling } from '../utils/networkFetch';
import type { JellyfaasToken, JellyfaasApiQuery, StationWithArtifacts } from '$lib/types';

export async function getSpaceDataServer(
	accessToken: JellyfaasToken,
	query?: JellyfaasApiQuery
): Promise<NetworkResult<StationWithArtifacts[]>> {
	const url = new URL('https://api.jellyfaas.com/spacestation-cvm2ffq9io6g00dj7vpg-1-s');

	if (query) {
		Object.entries(query).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				url.searchParams.append(key, String(value));
			}
		});
	}

	console.log('URL:', url.toString());
	return fetchWithErrorHandling(url.toString(), {
		method: 'GET',
		headers: {
			jfwt: accessToken.token
		}
	});
}
