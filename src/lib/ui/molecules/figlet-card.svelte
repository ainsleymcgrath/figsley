<script lang="ts">
	import { fontRecordsByName } from '$lib/stores';
	import type { FigletRecord } from '$lib/stores';
	import Icon from '$lib/ui/atoms/icon.svelte';
	import { scale } from 'svelte/transition';

	export let font: FigletRecord;
	export let txt: string;
	const copy = () => {
		navigator.clipboard.writeText(txt);
	};
	const deselct = () => {
		$fontRecordsByName[font.font]!.selected = false;
	};
	let hovering = false;
	const mouseenter = () => {
		hovering = true;
	};
	const mouseleave = () => {
		hovering = false;
	};
</script>

<article
	class="h-min hover-border-red"
	on:mouseenter={mouseenter}
	on:mouseleave={mouseleave}
	out:scale={{ duration: 100, start: 0.8 }}
	in:scale={{ duration: 150, start: 0.8, delay: 75 }}
>
	<h2 id={font.slug} class={`${hovering ? 'hl-text' : ''} flex justify-between font-display mb-1`}>
		{font.font}
	</h2>
	<div class={`heavy-outline${(hovering && '-red') || ''} p-5`}>
		<pre class="font-mono leading-4">{txt}</pre>
	</div>
	<div class={`w-full flex justify-end ${hovering ? 'hl-text' : ''}`}>
		{#if hovering}
			<button on:click={copy} class="icon-sm">
				<Icon name="copy" />
			</button>
			<button on:click={deselct} class="icon-sm">
				<Icon name="close" />
			</button>
		{/if}
	</div>
</article>
