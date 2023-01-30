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

{#each Object.entries(previews) as [title, rendered]}
	<figure>
		<pre class="font-mono">
        {rendered}
      </pre>
		<figcaption>{title}</figcaption>
	</figure>
{/each}
