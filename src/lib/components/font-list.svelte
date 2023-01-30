<script lang="ts">
	export let selection: string[] = [];
	export let src: string[] = [];
	let filter: string;
</script>

<figure class="grid">
	<input type="text" placeholder="Search for Figlet fonts" bind:value={filter} />
	<select
		bind:value={selection}
		multiple
		class="border-slate-100 border-2 row-span-1 overflow-scroll"
	>
		{#each src as font}
			{#if font.startsWith(filter) || !filter}
				<option value={font}> {font}</option>
			{/if}
		{/each}
	</select>
</figure>
