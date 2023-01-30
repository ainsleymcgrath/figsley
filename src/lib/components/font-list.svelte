<script lang="ts">
	// import { fontNames } from '$lib/stores';
	export let selection: string[] = [];
	export let src: string[] = [];
</script>

<section class="col-span-1 grid grid-rows-1">
	<article class="h-96 row-span-1 justify-self-center bg-red-50">
		<ul class="h-5/6 self-center overflow-scroll">
			{#each src as font}
				<li><input bind:group={selection} type="checkbox" value={font} /> {font}</li>
			{/each}
		</ul>
	</article>
</section>
