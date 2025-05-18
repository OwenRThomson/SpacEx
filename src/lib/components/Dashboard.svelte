<script lang="ts">
	import { Chart } from 'flowbite-svelte';

	import { dashboardData } from '$lib/stores/dashboardState';

	import type { ApexOptions } from 'apexcharts';
	import { getBaseChartOptions } from '$lib/utils/getBaseChart';
	let artifactOptions: ApexOptions | null = null;
	let stationOptions: ApexOptions | null = null;

	import { type StationWithArtifactsHistory } from '$lib/types';

	// Only build when charts are ready
	$: if (!$dashboardData.isLoading && !$dashboardData.error) {
		/*
    - Functions which transform the data into a chartable state
    - Would ideally want to unit test these probably
    */

		function buildStationAverageSeries(inputData: StationWithArtifactsHistory[]) {
			const dates = inputData[0]?.artifacts[0]?.prices.map((p) => p.date) ?? [];
			const series = inputData.map((station) => {
				// For each date, average artifact prices for the station
				// If only one station is selected in the filter, this will just show data for that station
				const data = dates.map((date, idx) => {
					const prices = station.artifacts.map((artifact) => artifact.prices[idx]?.price ?? 0);
					const avg = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
					return avg;
				});
				return {
					name: station.name,
					data
				};
			});
			return { series, dates };
		}

		function buildArtifactAverageSeries(inputData: StationWithArtifactsHistory[]) {
			const artifactNames = inputData[0]?.artifacts.map((a) => a.name) ?? [];
			const dates = inputData[0]?.artifacts[0]?.prices.map((p) => p.date) ?? [];
			const series = artifactNames.map((artifactName) => {
				const data = dates.map((date, idx) => {
					// For each station get the artifact's price at this date
					// This gives us the average price of the artifact across all stations
					const prices = inputData.map((station) => {
						const artifact = station.artifacts.find((a) => a.name === artifactName);
						return artifact?.prices[idx]?.price ?? 0;
					});
					const avg = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
					return avg;
				});
				return {
					name: artifactName,
					data
				};
			});
			return { series, dates };
		}

		const { series: artifactSeries, dates: artifactDates } = buildArtifactAverageSeries(
			$dashboardData.data ?? []
		);
		const { series: stationSeries, dates: stationDates } = buildStationAverageSeries(
			$dashboardData.data ?? []
		);

		artifactOptions = getBaseChartOptions(artifactSeries, artifactDates);
		stationOptions = getBaseChartOptions(stationSeries, stationDates);
	}

	import ChartCard from './ChartCard.svelte';
</script>

<div class="flex w-full flex-col items-center justify-center p-16">
	<div class="mb-8 grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
		{#if !$dashboardData.isLoading && !$dashboardData.error && stationOptions}
			<ChartCard label="Stations" icon="mdi:space-station">
				<Chart class="w-full" slot="chart" options={stationOptions} />
			</ChartCard>
		{/if}

		{#if !$dashboardData.isLoading && !$dashboardData.error && artifactOptions}
			<ChartCard label="Artifacts" icon="mdi:tools">
				<Chart class="w-full" slot="chart" options={artifactOptions} />
			</ChartCard>
		{/if}
	</div>
</div>
