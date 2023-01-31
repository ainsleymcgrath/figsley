<script lang="ts">
	import SearchResults from '$lib/ui/molecules/selectable-search-results.svelte';
	import SearchBar from '$lib/ui/molecules/search-bar.svelte';
	import { fontRecords, fontRecordsSelected, fontRecordsByName } from '$lib/stores';
	import { page } from '$app/stores';

	$: data = $page.data;
	let searchResults = $fontRecords;

	const randomFont = () => data.fonts[Math.floor(Math.random() * data.fonts.length)];
	const nRandomFonts = () => Array(5).fill(Symbol()).map(randomFont);

	const clearSelection = () => {
		for (const font of data.fonts) {
			$fontRecordsByName[font]!.selected = false;
		}
	};

	const selectRandom = () => {
		clearSelection();
		for (const font of nRandomFonts()) {
			$fontRecordsByName[font]!.selected = true;
		}
	};

	$: commaList = $fontRecordsSelected.map((s) => s.font).join(', ');
</script>

<figure class="w-md">
	<div class="grid w-min max-w-sm h-min bg-yellow-500 gap-y-4">
		<SearchBar bind:searchResults />
		<p class="grid gap-y-1">
			<span class="text-xs italic">
				Showing {searchResults.length} of {$page.data.fonts.length} fonts
			</span>
			<SearchResults {searchResults} />
			<span class="flex justify-end gap-x-2 annotation">
				<button on:click={clearSelection}>Deselect all</button>
				<button on:click={selectRandom}>Random</button>
			</span>
		</p>
	</div>
	<figcaption class="px-2 py-6 italic">
		{#if commaList}
			Selected {commaList}
		{:else}
			No fonts selected
		{/if}
	</figcaption>
</figure>
