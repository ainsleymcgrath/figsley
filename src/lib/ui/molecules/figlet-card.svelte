<script lang="ts">
	import { fontRecordsByName } from '$lib/stores';
	import type { FigletRecord } from '$lib/stores';
	import Icon from '$lib/ui/atoms/icon.svelte';
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

<article class="h-min hover-border-red" on:mouseenter={mouseenter} on:mouseleave={mouseleave}>
	<h2 id={font.slug} class={`${hovering ? 'hl-text' : ''} flex justify-between font-display p-1`}>
		{font.font}
	</h2>
	<div class={hovering ? 'heavy-outline-red' : 'heavy-outline'}>
		<pre class="font-mono leading-4 m-5">{txt}</pre>
	</div>
	<div class={`w-full flex justify-end px-1 h-6 ${hovering ? 'hl-text' : ''}`}>
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
