<script lang="ts">
	import type { PageData } from './$types';

	import SearchSelect from '$lib/ui/organisms/search-select.svelte';
	import RenderedSelectionBrowser from '$lib/ui/organisms/rendered-selection-browser.svelte';
	import SelectionSummary from '$lib/ui/molecules/selection-summary.svelte';
	import { fontRecordsByName } from '$lib/stores';
	import { onMount } from 'svelte';
	import UserInput from '$lib/ui/molecules/user-input.svelte';

	export let data: PageData;
	const randomFont = () => data.fonts[Math.floor(Math.random() * data.fonts.length)];
	const nRandomFonts = () => Array(5).fill(Symbol()).map(randomFont);

	onMount(() => {
		if (data.fonts.length === Object.keys($fontRecordsByName).length) return;
		// const initalRandom = nRandomFonts();
		for (const font of data.fonts) {
			$fontRecordsByName[font] = {
				font,
				selected: false,
				searchMatchIndexes: [],
				slug: font.toLowerCase().replace(' ', '-')
			};
		}
	});

	let value = '';
</script>

<section class="w-full flex justify-center">
	<article class="grid grid-cols-1 gap-y-5 w-min-2xl p-10">
		<UserInput bind:value />
		<figure class="h-min">
			<SearchSelect />
			<figcaption class="px-2 py-6 italic">
				<SelectionSummary />
			</figcaption>
		</figure>
	</article>
</section>
<section class="flex justify-center">
	<RenderedSelectionBrowser {value} />
</section>
