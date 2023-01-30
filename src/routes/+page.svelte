<script lang="ts">
	import type { PageData } from './$types';
	import FontList from '$lib/atoms/font-list.svelte';
	import type { Fonts } from 'figlet';
	import figlet from 'figlet';
	figlet.defaults({ fontPath: 'node_modules/figlet/fonts' });

	export let data: PageData;
	let selection: Fonts[] = [];
	let previews: Partial<Record<Fonts, string>>;
	$: previews = selection.reduce((acc, cur) => ({ ...acc, [cur]: '' }), {});
	let value = '';
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

<FontList src={data.fonts} bind:selection />
<section class="col-span-1">
	<textarea bind:value />
	{#each Object.entries(previews) as [title, rendered]}
		<figure>
			<pre class="font-mono">
        {rendered}
      </pre>
			<figcaption>{title}</figcaption>
		</figure>
	{/each}
</section>
