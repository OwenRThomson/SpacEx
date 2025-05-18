import { type NetworkResult, fetchWithErrorHandling } from '../utils/networkFetch';
import { JELLYFAAS_SECREY_KEY } from '$env/static/private';
import type { JellyfaasToken } from '$lib/types';

export async function getTokenServer(): Promise<NetworkResult<JellyfaasToken>> {
	return fetchWithErrorHandling('https://api.jellyfaas.com/auth-service/v1/validate', {
		method: 'GET',
		headers: {
			'x-jf-apikey': JELLYFAAS_SECREY_KEY
		}
	});
}
