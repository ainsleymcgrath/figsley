<script lang="ts">
	import type { Fonts } from 'figlet';
	import figlet from 'figlet';

	figlet.defaults({ fontPath: 'node_modules/figlet/fonts' });

	export let value: string = '';
	export let selection: Fonts[] = [];

	let previews: Partial<Record<Fonts, string>> = {};
	$: previews = selection.reduce((acc, cur) => ({ ...acc, [cur]: '' }), {});
	$: {
		selection.forEach((font) => {
			figlet.text(value, font, (err, data) => {
				if (err || !data) {
					console.log(err);
					return;
				}
				previews[font] = data;
			});
		});
	}
</script>

<article class="flex flex-wrap gap-10 p-10">
	{#each Object.entries(previews) as [title, rendered]}
		<figure>
			<figcaption class="font-display">{title}</figcaption>
			<div class="border-4 border-black rounded-lg">
				<pre class="font-mono leading-4 m-5">{rendered}</pre>
			</div>
		</figure>
	{/each}
</article>
