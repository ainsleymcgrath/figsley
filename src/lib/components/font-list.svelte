<script lang="ts">
	import SearchResults from '$lib/components/search-results.svelte';
	import SearchBar from '$lib/ui/molecules/search-bar.svelte';
	import { fontRecords } from '$lib/stores';

	let searchResults = $fontRecords;
</script>

<figure class="grid w-96 h-44 bg-yellow-500 gap-4">
	<SearchBar bind:searchResults />
	<SearchResults {searchResults} />
</figure>
