<script lang="ts">
	import type { Fonts } from 'figlet';
	import figlet from 'figlet';
	import { fontRecordsSelectedReversed } from '$lib/stores';
	import type { FigletRecord } from '$lib/stores';
	import FigletCard from '$lib/ui/molecules/figlet-card.svelte';

	figlet.defaults({ fontPath: 'node_modules/figlet/fonts' });

	export let value: string = '';
	$: selection = $fontRecordsSelectedReversed;

	let previews: Partial<Record<Fonts, { font: FigletRecord; txt: string }>> = {};
	$: previews = selection.reduce((acc, cur) => ({ ...acc, [cur.font]: '' }), {});
	$: {
		selection.forEach((font) => {
			figlet.text(value, font, (err, txt) => {
				if (err || !txt || !font) {
					return;
				}
				previews[font.font] = { font, txt };
			});
		});
	}
</script>

<article class="flex flex-wrap gap-10 p-10">
	{#each Object.values(previews) as { font, txt } (font)}
		<!-- not sure when font is undefined? -->
		{#if font}
			<FigletCard {font} {txt} />
		{/if}
	{/each}
</article>
