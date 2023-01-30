<script lang="ts">
	export let selection: string[] = [];
	export let src: string[] = [];
	let filter: string = '';

	let search: HTMLInputElement;
	const keyup = (e: KeyboardEvent) => {
		if (e.key === 'k' && e.metaKey) {
			search.focus();
		}
	};
</script>

<svelte:window on:keydown={keyup} />

<figure class="grid w-96 h-36 bg-yellow-500 gap-4">
	<input
		bind:this={search}
		class="p-2 bg-yellow-500 border-4 border-black rounded-lg placeholder-black placeholder:italic outline-0"
		type="text"
		placeholder="Search for Figlet fonts"
		bind:value={filter}
	/>
	<select
		bind:value={selection}
		multiple
		class="p-2 border-black border-4 rounded-lg bg-yellow-500 outline-0"
	>
		{#each src as font}
			{#if font.toLowerCase().startsWith(filter.toLowerCase()) || !filter}
				<option value={font}> {font}</option>
			{/if}
		{/each}
	</select>
</figure>
