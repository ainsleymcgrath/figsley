<script lang="ts">
	import type { Fonts } from 'figlet';
	import figlet from 'figlet';
	import { flip } from 'svelte/animate';
	import { fontRecordsSelected } from '$lib/stores';
	import type { FigletRecord } from '$lib/stores';
	import FigletCard from '$lib/ui/molecules/figlet-card.svelte';

	figlet.defaults({ fontPath: 'node_modules/figlet/fonts' });

	export let value: string = '';
	$: selection = $fontRecordsSelected.reverse();

	let previews: Partial<Record<Fonts, { font: FigletRecord; txt: string }>> = {};
	$: previews = selection.reduce((acc, cur) => ({ ...acc, [cur.font]: '' }), {});
	$: {
		selection.forEach((font) => {
			figlet.text(value, font, (err, txt) => {
				if (err || txt === undefined) {
					return;
				}
				previews[font.font] = {
					font,
					txt: txt === '' ? 'Press cmd/ctrl + e and type something' : txt
				};
			});
		});
	}
</script>

<article class="flex flex-wrap gap-10 p-10">
	{#each Object.entries(previews) as [fontName, detail] (fontName)}
		<div animate:flip={{ duration: (d) => Math.sqrt(d) * 15 }}>
			{#if detail}
				<FigletCard font={detail.font} txt={detail.txt} />
			{/if}
		</div>
	{/each}
</article>
