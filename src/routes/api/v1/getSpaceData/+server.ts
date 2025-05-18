// src/routes/api/v1/getToken/route.ts
import { getSpaceDataServer } from '$lib/server/getSpaceData';
import { getTokenServer } from '$lib/server/getTokenServer';
import type { JellyfaasApiQuery, StationWithArtifactsHistory } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

/*
  I did this as an API because
  - Didn't want to expose the Jellyfaas secret key in the client code.
  - Cors prevented a call from the frontend
*/

export const GET: RequestHandler = async ({ url }) => {
	// You'd want to check a user is authenticated here in normal use

	const { data: tokenData, error: tokenError } = await getTokenServer();

	if (tokenError) {
		console.error('Error fetching token:', tokenError);
		return new Response(JSON.stringify(tokenError), {
			status: tokenError.status,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const stationParam = url.searchParams.get('spaceStation');
	const artifactParam = url.searchParams.get('artifact');

	const station =
		stationParam === 'all-stations' ? undefined : ((stationParam as SpaceStation) ?? undefined);
	const artifact =
		artifactParam === 'all-artifacts' ? undefined : ((artifactParam as Artifact) ?? undefined);

	const JellyfaasQuery: JellyfaasApiQuery = {
		station,
		artifact,
		historic: true
	};

	const { data: spaceStationData, error: spaceStationError } = await getSpaceDataServer(
		tokenData,
		JellyfaasQuery
	);

	console.log('Space Station Data:', JSON.stringify(spaceStationData));

	if (spaceStationError) {
		console.error('Error fetching space station data:', spaceStationError);
		return new Response(JSON.stringify(spaceStationError), {
			status: spaceStationError.status,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify(transformStationData(spaceStationData)), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};

/*
	Need to JEST test the below
*/

import type { StationWithArtifacts, SpaceStation, Artifact } from '$lib/types';

// Function to just add dates to the artifacts which would make it easier to work with
// Ideally the API would return this data directly
function transformStationData(stations: StationWithArtifacts[]): StationWithArtifactsHistory[] {
	const today = new Date();
	return stations.map((station: StationWithArtifacts) => ({
		name: station.name,
		artifacts: station.artifacts.map((artifact) => {
			const prices = [];
			prices.push({
				date: today.toISOString().split('T')[0],
				price: artifact.price
			});
			// Historical prices
			if (Array.isArray(artifact.history)) {
				for (let i = 0; i < artifact.history.length; i++) {
					const date = new Date(today);
					date.setDate(today.getDate() - (i + 1));
					prices.push({
						date: date.toISOString().split('T')[0],
						price: artifact.history[i]
					});
				}
			}
			return {
				name: artifact.name,
				prices
			};
		})
	}));
}
