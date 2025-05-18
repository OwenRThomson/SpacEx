<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

	export let label: string;
	export let icon: string;
</script>

<Card size="lg" class="flex w-full flex-col items-center justify-center">
	<div class="flex w-full flex-col items-center justify-center">
		<div
			class="mb-4 flex w-full justify-between border-b border-gray-200 p-4 pb-4 dark:border-gray-700"
		>
			<div class="flex items-center">
				<div
					class="me-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700"
				>
					<Icon {icon} width="24" height="24" style="color: #008cfb" />
				</div>
				<div>
					<h5 class="pb-1 text-2xl leading-none font-bold text-gray-900 dark:text-white">
						{label}
					</h5>
					<p class="text-sm font-normal text-gray-500 dark:text-gray-400">Over the last 10 days</p>
				</div>
			</div>
		</div>
		<slot name="chart" />
	</div>
</Card>
