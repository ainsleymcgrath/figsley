<script lang="ts">
	import { fontRecordsByName } from '$lib/stores';
	import type { Fonts } from 'figlet';
	export let title: Fonts;
	export let rendered: string;
	const copy = () => {
		navigator.clipboard.writeText(rendered);
	};
	const deselct = () => {
		$fontRecordsByName[title]!.selected = false;
	};
</script>

<figure>
	<figcaption class="flex justify-between font-display p-1">
		{title}
		<button on:click={deselct} class="font-sans font-extralight text-xs opacity-50">X</button>
	</figcaption>
	<div class="border-4 border-black rounded-lg">
		<pre class="font-mono leading-4 m-5">{rendered}</pre>
	</div>
	<div class="w-full flex justify-end">
		<button on:click={copy} class="text-xs underline">Copy to clipboard</button>
	</div>
</figure>
