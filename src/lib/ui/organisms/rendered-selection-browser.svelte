<script lang="ts">
	import type { Fonts, Options } from 'figlet';
	import figlet from 'figlet';
	import { flip } from 'svelte/animate';
	import { fontRecordsSelected } from '$lib/stores';
	import FigletCard from '$lib/ui/molecules/figlet-card.svelte';
	import type { PreviewMap } from '$lib/ui/molecules/figlet-card.svelte';

	figlet.defaults({ fontPath: 'node_modules/figlet/fonts' });

	export let value: string = '';
	let previewMap: PreviewMap = {};

	// $: previews = selection.redulce((acc, cur) => ({ ...acc, [cur.font]: '' }), {});
	$: {
		$fontRecordsSelected.forEach((font) => {
			figlet.text(value, font.font, (err, txt) => {
				if (err || txt === undefined) {
					return;
				}
				const renderedFigletText = txt === '' ? 'Press cmd/ctrl + e and type something' : txt;
				previewMap[font.slug] = renderedFigletText;
			});
		});
	}
</script>

<ul class="flex flex-wrap gap-10 px-10">
	{#each $fontRecordsSelected
		.map((f) => ({ ...f, key: Math.random().toString(36).slice(2, 7) }))
		.reverse() as record (record.slug)}
		<li animate:flip={{ duration: (d) => Math.sqrt(d) * 15 }}>
			<FigletCard {record} bind:previewMap />
		</li>
	{/each}
</ul>
