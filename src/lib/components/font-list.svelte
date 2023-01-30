<script lang="ts">
	import Fuse from 'fuse.js';
	import SearchResults from '$lib/components/search-results.svelte';
	import { fontRecords } from '$lib/stores';

	let searchTerm: string = '';

	const fuse = new Fuse($fontRecords, { includeMatches: true, keys: ['font'] });
	$: rawSearchResults = fuse.search(searchTerm);
	$: searchResults = !searchTerm ? $fontRecords : rawSearchResults.map((m) => m.item);
	let search: HTMLInputElement;
	const keydown = (e: KeyboardEvent) => {
		if (e.metaKey && e.key === 'k') {
			search.focus();
		}
	};
</script>

<svelte:window on:keydown={keydown} />

<figure class="grid w-96 h-44 bg-yellow-500 gap-4">
	<div>
		<p class="text-xs"><kbd>Cmd/Ctrl + K</kbd></p>
		<input
			bind:this={search}
			class="p-2 bg-yellow-500 border-4 border-black rounded-lg placeholder-black placeholder:italic outline-0 focus:border-red-700"
			type="text"
			placeholder="Search for Figlet fonts"
			bind:value={searchTerm}
		/>
	</div>
	<SearchResults {searchResults} />
</figure>
