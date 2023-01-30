<script lang="ts">
	import Fuse from 'fuse.js';
	export let selection: string[] = [];
	export let src: string[] = [];
	let searchTerm: string = '';

	const fuse = new Fuse(src);
	$: selectable = !searchTerm ? src : fuse.search(searchTerm).map((m) => m.item);
	let search: HTMLInputElement;
	const keyup = (e: KeyboardEvent) => {
		if (e.key === 'k' && e.metaKey) {
			search.focus();
		}
	};
</script>

<svelte:window on:keydown={keyup} />

<figure class="grid w-96 h-44 bg-yellow-500 gap-4">
	<div>
		<p class="text-xs"><kbd>Cmd/Ctrl + K</kbd></p>
		<input
			bind:this={search}
			class="p-2 bg-yellow-500 border-4 border-black rounded-lg placeholder-black placeholder:italic outline-0"
			type="text"
			placeholder="Search for Figlet fonts"
			bind:value={searchTerm}
		/>
	</div>
	<select
		bind:value={selection}
		multiple
		class="p-2 border-black border-4 rounded-lg bg-yellow-500 outline-0"
	>
		{#each selectable as font}
			<option value={font}> {font}</option>
		{/each}
	</select>
</figure>
