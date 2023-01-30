<script lang="ts">
	import type { PageData } from './$types';

	import FontList from '$lib/components/font-list.svelte';
	import TextPreview from '$lib/components/text-preview.svelte';
	import { fontRecordsByName } from '$lib/stores';
	import { onMount } from 'svelte';

	export let data: PageData;
	const randomFont = () => data.fonts[Math.floor(Math.random() * data.fonts.length)];
	const nRandomFonts = () => Array(5).fill(Symbol()).map(randomFont);

	onMount(() => {
		if (data.fonts.length === Object.keys($fontRecordsByName).length) return;
		const initalRandom = nRandomFonts();
		for (const font of data.fonts) {
			$fontRecordsByName[font] = {
				font,
				selected: initalRandom.includes(font),
				searchMatchIndexes: []
			};
		}
	});

	let value = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[Math.floor(Math.random() * 26)];

	const clearSelection = () => {
		for (const font of data.fonts) {
			$fontRecordsByName[font].selected = false;
		}
	};
	const selectRandom = () => {
		clearSelection();
		for (const font of nRandomFonts()) {
			$fontRecordsByName[font].selected = true;
		}
	};
</script>

<section class="flex justify-center gap-x-36 mb-10">
	<div>
		<FontList />
		<div class="flex justify-end gap-6">
			<button class="text-xs" on:click={clearSelection}>Deselect all</button>
			<button class="text-xs" on:click={selectRandom}>Random</button>
		</div>
	</div>
	<textarea
		rows="3"
		bind:value
		class="p-2 col-span-1 bg-yellow-500 border-4 border-black rounded-lg placeholder-black placeholder:italic outline-0"
	/>
</section>

<section class="flex justify-center">
	<TextPreview bind:value />
</section>
