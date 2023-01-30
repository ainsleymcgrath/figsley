<script lang="ts">
	import type { PageData } from './$types';

	import SearchSelect from '$lib/ui/organisms/search-select.svelte';
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
</script>

<section class="flex content-center justify-center gap-x-36 mb-10">
	<SearchSelect />
	<textarea
		rows="3"
		bind:value
		class="p-2 col-span-1 bg-yellow-500 border-4 border-black rounded-lg outline-0 h-auto w-72 self-center"
	/>
</section>

<section class="flex justify-center">
	<TextPreview bind:value />
</section>
