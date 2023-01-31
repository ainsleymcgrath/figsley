<script lang="ts">
	import { fontRecordsByName } from '$lib/stores';
	import type { Fonts } from 'figlet';
	import Icon from '$lib/ui/atoms/icon.svelte';
	export let title: Fonts;
	export let rendered: string;
	const copy = () => {
		navigator.clipboard.writeText(rendered);
	};
	const deselct = () => {
		$fontRecordsByName[title]!.selected = false;
	};
	let showButtons = false;
	const mouseenter = () => {
		showButtons = true;
	};
	const mouseleave = () => {
		showButtons = false;
	};
</script>

<figure class="h-min" on:mouseenter={mouseenter} on:mouseleave={mouseleave}>
	<figcaption class="flex justify-between font-display p-1">
		{title}
	</figcaption>
	<div class="border-4 border-black rounded-lg">
		<pre class="font-mono leading-4 m-5">{rendered}</pre>
	</div>
	<div class="w-full flex justify-end px-1">
		{#if showButtons}
			<button on:click={copy} class="icon-sm">
				<Icon name="copy" />
			</button>
			<button on:click={deselct} class="icon-sm">
				<Icon name="close" />
			</button>
		{/if}
	</div>
</figure>
