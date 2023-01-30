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

<section class="col-span-1 row-span-2 flex justify-center">
	<FontList src={data.fonts} bind:selection />
</section>

<section class="col-span-1  row-span-2 flex justify-center">
	<textarea rows="3" bind:value class="col-span-1" />
</section>

<section class="col-span-2 flex justify-center">
	<TextPreview bind:selection bind:value />
</section>
