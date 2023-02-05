<script context="module" lang="ts">
	export interface PreviewMap {
		[slug: string]: string;
	}
</script>

<script lang="ts">
	import type { FigletRecord } from '$lib/stores';
	import Icon from '$lib/ui/atoms/icon.svelte';
	import { scale } from 'svelte/transition';

	export let record: FigletRecord;
	export let previewMap: PreviewMap;
	const copy = () => {
		navigator.clipboard.writeText(previewMap[record.slug]);
	};
	const deselct = () => {
		delete previewMap[record.slug];
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
	<h2
		id={record.slug}
		class={`${hovering ? 'hl-text' : ''} flex justify-between font-display mb-1`}
	>
		{record.font}
	</h2>
	<div class={`heavy-outline${(hovering && '-red') || ''} p-5`}>
		<pre class="font-mono leading-4">{previewMap[record.slug]}</pre>
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
