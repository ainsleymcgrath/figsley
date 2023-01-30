<script lang="ts">
	import type { Fonts } from 'figlet';
	import figlet from 'figlet';
	import { fontRecordsSelected } from '$lib/stores';
	import PreviewItem from '$lib/components/preview-item.svelte';

	figlet.defaults({ fontPath: 'node_modules/figlet/fonts' });

	export let value: string = '';
	// export let selection: Fonts[] = [];
	$: selection = $fontRecordsSelected;

	let previews: Partial<Record<Fonts, string>> = {};
	$: previews = selection.reduce((acc, cur) => ({ ...acc, [cur.font]: '' }), {});
	$: {
		selection.forEach((font) => {
			figlet.text(value, font, (err, data) => {
				if (err || !data) {
					return;
				}
				previews[font.font] = data;
			});
		});
	}
</script>

<article class="flex flex-wrap gap-10 p-10">
	{#each Object.entries(previews) as [title, rendered]}
		<PreviewItem {title} {rendered} />
	{/each}
</article>
