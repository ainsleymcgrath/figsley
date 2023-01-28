<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article>
	<h2>Figlet Fonts</h2>
	{#if data.fonts}
		<ul>
			{#each data.fonts as font}
				<li>{font}</li>
			{/each}
		</ul>
	{/if}
</article>
