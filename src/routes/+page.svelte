<script lang="ts">
	import type { PageData } from './$types';
	import type { Fonts } from 'figlet';

	import FontList from '$lib/components/font-list.svelte';
	import TextPreview from '$lib/components/text-preview.svelte';

	export let data: PageData;
	const randomFont = () => data.fonts[Math.floor(Math.random() * data.fonts.length)];
	const nRandomFonts = Array(5).fill(Symbol()).map(randomFont);
	let selection: Fonts[] = nRandomFonts;
	let value = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[Math.floor(Math.random() * 26)];

	const clearSelection = () => {
		selection = [];
	};
	const selectRandom = () => {
		selection = [randomFont()];
	};
</script>

<section class="flex justify-center gap-x-36 mb-10">
	<div>
		<FontList src={data.fonts} bind:selection />
		<div class="flex justify-end gap-6">
			<button class="text-xs" on:click={clearSelection}>Deselect all</button>
			<button class="text-xs" on:click={selectRandom}>Random</button>
		</div>
	</div>
	<textarea
		rows="3"
		bind:value
		class="col-span-1 bg-yellow-500 border-4 border-black rounded-lg placeholder-black placeholder:italic outline-0"
	/>
</section>

<section class="flex justify-center">
	<TextPreview bind:selection bind:value />
</section>
