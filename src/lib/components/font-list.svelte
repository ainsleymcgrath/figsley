<script lang="ts">
	export let selection: string[] = [];
	export let src: string[] = [];
	let filter: string;
</script>

<figure class="grid w-96 h-36 bg-yellow-500 gap-4">
	<input
		class="bg-yellow-500 border-4 border-black rounded-lg placeholder-black placeholder:italic outline-0"
		type="text"
		placeholder="Search for Figlet fonts"
		bind:value={filter}
	/>
	<select
		bind:value={selection}
		multiple
		class="border-black border-4 rounded-lg bg-yellow-500 outline-0"
	>
		{#each src as font}
			{#if font.startsWith(filter) || !filter}
				<option value={font}> {font}</option>
			{/if}
		{/each}
	</select>
</figure>
