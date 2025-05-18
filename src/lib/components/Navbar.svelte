<script lang="ts">
	import { NavBrand, Navbar } from 'flowbite-svelte';

	import Icon from '@iconify/svelte';
	import Filters from './Filters.svelte';
</script>

<Navbar class="mx-10 sm:mx-0">
	<NavBrand href="/" class="mx-10">
		<div class="flex flex-row items-center gap-x-4">
			<Icon icon="mdi:space-station" width="24" height="24" style="color: #008cfb" />
			<span
				class="ml-px self-center text-xl font-semibold whitespace-nowrap sm:text-2xl dark:text-white"
			>
				SpacEx*
			</span>

			<span class="text-sm font-normal text-gray-500 dark:text-gray-400"
				>The legally distinct space trading tool</span
			>
		</div>
	</NavBrand>
	<div class="hidden lg:block lg:ps-3">
		<Filters />
	</div>
</Navbar>
