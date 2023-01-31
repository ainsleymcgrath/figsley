<script lang="ts">
	import type { PageData } from './$types';

	import SearchSelect from '$lib/ui/organisms/search-select.svelte';
	import RenderedSelectionBrowser from '$lib/ui/organisms/rendered-selection-browser.svelte';
	import { fontRecordsByName } from '$lib/stores';
	import { onMount } from 'svelte';
	import UserInput from '$lib/ui/molecules/user-input.svelte';

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

<section class="flex justify-center mb-10">
	<SearchSelect />
	<UserInput bind:value />
</section>

<section class="flex justify-center">
	<RenderedSelectionBrowser {value} />
</section>
