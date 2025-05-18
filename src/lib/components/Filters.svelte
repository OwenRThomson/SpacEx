<script lang="ts">
	import type { Artifact, SpaceStation } from '$lib/types';
	import { filters, setSpaceStation, setArtifact } from '$lib/stores/dashboardState';

	export let spaceStations: SpaceStation[] = [
		'Alpha Centauri',
		'Beta Hydri',
		'Gamma Draconis',
		'Delta Pavonis',
		'Epsilon Indi'
	];
	export let artifacts: Artifact[] = [
		'Gold',
		'Silver',
		'Food Rations',
		'Water',
		'Medicine',
		'Steel',
		'Platinum',
		'Computer Chips',
		'Fuel Cells',
		'Alien Artifacts',
		'Spice',
		'Rare Gems'
	];

	import { Select } from 'flowbite-svelte';
</script>

<div class="flex flex-row items-center gap-4">
	<div class="filter-section">
		<Select
			id="station-filter"
			class="w-60"
			placeholder="Space Station"
			bind:value={$filters.spaceStation}
			size="lg"
			clearable
			clearableOnClick={() => {
				$filters.spaceStation = 'all-stations';
				setSpaceStation($filters.spaceStation);
			}}
			onselect={() => setSpaceStation($filters.spaceStation)}
		>
			<option selected value={'all-stations'}>All Stations</option>
			{#each spaceStations as station}
				<option value={station}>{station}</option>
			{/each}
		</Select>
	</div>

	<div class="filter-section">
		<Select
			id="artifact-filter"
			class="w-60"
			placeholder="Artifact"
			bind:value={$filters.artifact}
			size="lg"
			onselect={() => {
				setArtifact($filters.artifact);
			}}
			clearable
			clearableOnClick={() => {
				$filters.artifact = 'all-artifacts';
				setArtifact($filters.artifact);
			}}
		>
			<option selected value={'all-artifacts'}>All Artifacts</option>
			{#each artifacts as artifact}
				<option value={artifact}>{artifact}</option>
			{/each}
		</Select>
	</div>
</div>
