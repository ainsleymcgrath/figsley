<script lang="ts">
	import { fontRecords } from '$lib/stores';
	import Fuse from 'fuse.js';
	import KbdHint from '../atoms/kbd-hint.svelte';
	import { makeFocusOnMetaKeyHandler } from '$lib/dom';

	let search: HTMLInputElement;
	const keydown = makeFocusOnMetaKeyHandler(() => search, 'k');
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

<p class="grid">
	<input
		bind:this={search}
		class="heavy-outline placeholder-black focus-border-red"
		type="text"
		placeholder="Search for Figlet fonts"
		bind:value={searchTerm}
	/>
	<KbdHint key="k" />
</p>
