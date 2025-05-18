<script>
	import { dashboardData } from '$lib/stores/dashboardState';
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';

	import { Card } from 'flowbite-svelte';

	let searchTerm = $state('');

	// Flat dashboard data into items with station artifact, date, price, and change
	// Again, ideal for unit testing
	let itemsWithChange = $derived(
		($dashboardData.data ?? [])
			.flatMap((station) =>
				station.artifacts.flatMap((artifact) =>
					artifact.prices
						.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
						.map((p, i, arr) => ({
							station: station.name,
							artifact: artifact.name,
							date: p.date,
							price: p.price,
							change: i > 0 ? p.price - arr[i - 1].price : null
						}))
				)
			)
			.sort((a, b) => {
				if (a.station !== b.station) return a.station.localeCompare(b.station);
				if (a.artifact !== b.artifact) return a.artifact.localeCompare(b.artifact);
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			})
	);

	// This store is used to filter the items based on the search term taken from the flowbite docs
	let filteredItems = $derived(
		itemsWithChange.filter(
			(item) =>
				!searchTerm ||
				item.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.artifact.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);
</script>

<Card size="xl" class="w-full">
	{#if !$dashboardData.isLoading && !$dashboardData.error}
		<TableSearch
			placeholder="Search by station or artifact"
			divClass="h-100 overflow-y-auto"
			hoverable
			bind:inputValue={searchTerm}
		>
			<TableHead>
				<TableHeadCell>Station</TableHeadCell>
				<TableHeadCell>Artifact</TableHeadCell>
				<TableHeadCell>Date</TableHeadCell>
				<TableHeadCell>Price</TableHeadCell>
				<TableHeadCell>Change</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each filteredItems as item}
					<TableBodyRow>
						<TableBodyCell>{item.station}</TableBodyCell>
						<TableBodyCell>{item.artifact}</TableBodyCell>
						<TableBodyCell>{item.date}</TableBodyCell>
						<TableBodyCell>${item.price}</TableBodyCell>
						<TableBodyCell>
							{#if item.change !== null}
								<span
									class={item.change > 0 ? 'text-green-400' : item.change < 0 ? 'text-red-400' : ''}
								>
									{item.change > 0 ? '+' : ''}{item.change}
								</span>
							{/if}
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</TableSearch>
	{/if}
</Card>
