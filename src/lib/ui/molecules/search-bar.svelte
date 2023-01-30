<script lang="ts">
	import { fontRecords } from '$lib/stores';
	import Fuse from 'fuse.js';

	let search: HTMLInputElement;
	const keydown = (e: KeyboardEvent) => {
		if (e.metaKey && e.key === 'k') {
			search.focus();
		}
	};
	let searchTerm: string = '';
	export let searchResults = $fontRecords;

	const fuse = new Fuse($fontRecords, { includeMatches: true, keys: ['font'] });
	$: {
		fuse.setCollection($fontRecords);
	}
	$: rawSearchResults = fuse.search(searchTerm);
	$: {
		searchResults = !searchTerm ? $fontRecords : rawSearchResults.map((m) => m.item);
	}
</script>

<svelte:window on:keydown={keydown} />

<p>
	<kbd class="text-xs block">Cmd/Ctrl + K</kbd>
	<input
		bind:this={search}
		class="p-2 bg-yellow-500 border-4 border-black rounded-lg placeholder-black placeholder:italic outline-0 focus:border-red-700"
		type="text"
		placeholder="Search for Figlet fonts"
		bind:value={searchTerm}
	/>
</p>
