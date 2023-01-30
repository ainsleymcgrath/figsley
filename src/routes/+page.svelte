<script lang="ts">
	import type { PageData } from './$types';
	import type { Fonts } from 'figlet';

	import FontList from '$lib/components/font-list.svelte';
	import TextPreview from '$lib/components/text-preview.svelte';

	export let data: PageData;
	const randomFont = data.fonts[Math.floor(Math.random() * data.fonts.length)];
	let selection: Fonts[] = [randomFont];
	let value = 'Figlet Rules';
</script>

<section class="flex justify-center gap-x-36 mb-10">
	<FontList src={data.fonts} bind:selection />
	<textarea
		rows="3"
		bind:value
		class="col-span-1 bg-yellow-500 border-4 border-black rounded-lg placeholder-black placeholder:italic outline-0"
	/>
</section>

<section class="flex justify-center">
	<TextPreview bind:selection bind:value />
</section>
