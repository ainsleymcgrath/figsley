<script lang="ts">
	import KbdHint from '$lib/ui/atoms/kbd-hint.svelte';
	import { makeFocusOnMetaKeyHandler } from '$lib/dom';

	export let value = '';
	let textarea: HTMLTextAreaElement;
	const keydown = makeFocusOnMetaKeyHandler(() => textarea, 'e');
</script>

<svelte:window on:keydown={keydown} />

<figure class="grid h-min">
	<textarea rows="3" bind:this={textarea} bind:value class="heavy-outline w-xs focus-border-red" />
	<KbdHint key="e" />
</figure>
