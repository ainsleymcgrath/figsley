<script lang="ts">
	export let value = '';
	let textarea: HTMLTextAreaElement;
	const keydown = (e: KeyboardEvent) => {
		if (e.metaKey && e.key === 'e') {
			textarea.focus();
		}
	};
</script>

<svelte:window on:keydown={keydown} />

<figure class="grid h-min">
	<textarea rows="3" bind:this={textarea} bind:value class="heavy-outline w-xs focus-border-red" />
	<kbd class="justify-self-end annotation">cmd/ctrl + e</kbd>
</figure>
