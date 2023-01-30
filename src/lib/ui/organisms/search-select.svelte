<script lang="ts">
	import SearchResults from '$lib/ui/molecules/selectable-search-results.svelte';
	import SearchBar from '$lib/ui/molecules/search-bar.svelte';
	import { fontRecords } from '$lib/stores';
	import { fontRecordsByName } from '$lib/stores';
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

<figure class="grid w-96 h-44 bg-yellow-500 gap-4">
	<SearchBar bind:searchResults />
	<SearchResults {searchResults} />
	<p class="flex justify-end gap-6">
		<button class="text-xs" on:click={clearSelection}>Deselect all</button>
		<button class="text-xs" on:click={selectRandom}>Random</button>
	</p>
</figure>
