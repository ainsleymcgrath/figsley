<script lang="ts">
	import KbdHint from '$lib/ui/atoms/kbd-hint.svelte';
	import { makeFocusOnMetaKeyHandler } from '$lib/dom';

	export let value = '';
	let textarea: HTMLTextAreaElement;
	const keydown = makeFocusOnMetaKeyHandler(() => textarea, 'e');
</script>

<svelte:window on:keydown={keydown} />

<figure class="grid h-min">
	<textarea
		placeholder="Type something to see selected fonts Figlet-ified"
		rows="3"
		bind:this={textarea}
		bind:value
		class="heavy-outline focus-border-red placeholder-black"
	/>
	<KbdHint key="e" />
</figure>
