import { writable, derived } from 'svelte/store';
import { type StationWithArtifactsHistory, type SpaceStation, type Artifact } from '$lib/types';
import { queryData } from '$lib/utils/queryData';
import type { NetworkErrorDetails } from '$lib/utils/networkFetch';

// Defined the state of the dashboard runner logic. This store is going to act like the brain of the dashboard
type DashboardDataState = {
	isLoading: boolean;
	data: StationWithArtifactsHistory[] | null;
	error: NetworkErrorDetails | null;
};

export const filters = writable({
	spaceStation: 'all-stations' as SpaceStation,
	artifact: 'all-artifacts' as Artifact
});

export const dashboardData = derived<typeof filters, DashboardDataState>(
	filters,
	($filters, set) => {
		set({ isLoading: true, data: null, error: null });

		(async () => {
			const { data: queryResult, error: queryError } = await queryData($filters);

			if (queryError) {
				set({ isLoading: false, error: queryError, data: null });
				return;
			}

			// Would maybe remove for production
			console.log('Query Result:', queryResult);

			set({ isLoading: false, data: queryResult, error: null });
		})();
	},
	{ isLoading: true, data: null, error: null }
);

export function setSpaceStation(station: SpaceStation) {
	console.log('Query Result:', station);
	filters.update((f) => ({ ...f, spaceStation: station }));
}

export function setArtifact(artifact: Artifact) {
	console.log('Query Result:', artifact);
	filters.update((f) => ({ ...f, artifact: artifact }));
}

// Convenience function to reset filters
export function resetFilters() {
	filters.set({ spaceStation: 'all-stations', artifact: 'all-artifacts' });
}
