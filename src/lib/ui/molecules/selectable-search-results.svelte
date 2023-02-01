<script lang="ts">
	import SelectableFontRow from '$lib/ui/atoms/selectble-font-row.svelte';
	import type { FigletRecord } from '$lib/stores';

	export let searchResults: FigletRecord[];
</script>

<ol class="heavy-outline overflow-scroll focus-border-red h-30">
	{#each searchResults as data (data.font)}
		<SelectableFontRow bind:data />
	{/each}
</ol>
