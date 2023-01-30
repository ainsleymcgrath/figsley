<script lang="ts">
	// import { beforeUpdate } from 'svelte';
	import SelectableFontRow from '$lib/ui/atoms/selectble-font-row.svelte';
	import type { FigletRecord } from '$lib/stores';

	export let searchResults: FigletRecord[];
</script>

<!-- on:keydown={keydown} -->
<ol
	class="overflow-scroll p-2 border-black border-4 rounded-lg bg-yellow-500 outline-0 focus:border-red-700"
>
	{#each searchResults as data}
		<SelectableFontRow bind:data />
	{/each}
</ol>
