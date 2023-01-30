<script lang="ts">
	import type { Fonts } from 'figlet';
	import figlet from 'figlet';
	import { fontRecordsSelected } from '$lib/stores';

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
		<!-- will need copy to clipboard, remove from selection, triple-click -->
		<figure>
			<figcaption class="font-display">{title}</figcaption>
			<div class="border-4 border-black rounded-lg">
				<pre class="font-mono leading-4 m-5">{rendered}</pre>
			</div>
		</figure>
	{/each}
</article>
