<script lang="ts">
	// import { beforeUpdate } from 'svelte';
	import SearchResultOption from '$lib/components/search-result-option.svelte';
	import type { FigletRecord } from '$lib/stores';

	export let searchResults: FigletRecord[];

	let focusedSearchResultIndex: number = 0;
	const keydown = (e: KeyboardEvent) => {
		if (['Tab', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
			e.preventDefault();
			if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
				focusedSearchResultIndex -= 1;
			} else {
				focusedSearchResultIndex += 1;
			}
		}
	};
</script>

<ol
	on:keydown={keydown}
	class="overflow-scroll p-2 border-black border-4 rounded-lg bg-yellow-500 outline-0"
>
	{#each searchResults as data, i}
		<SearchResultOption focused={focusedSearchResultIndex === i} bind:data />
	{/each}
</ol>
