<script lang="ts">
	import SearchResults from '$lib/ui/molecules/selectable-search-results.svelte';
	import SearchBar from '$lib/ui/molecules/search-bar.svelte';
	import SelectionSummary from '$lib/ui/molecules/selection-summary.svelte';
	import { fontRecords, fontRecordsByName } from '$lib/stores';
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
</script>

<article class="grid h-min">
	<SearchBar bind:searchResults />
	<span class="text-xs italic">
		Showing {searchResults.length} of {$page.data.fonts.length} fonts
	</span>
	<SearchResults {searchResults} />
	<span class="flex justify-end gap-x-2 annotation">
		<button on:click={clearSelection}>Deselect all</button>
		<button on:click={selectRandom}>Random</button>
	</span>
</article>
