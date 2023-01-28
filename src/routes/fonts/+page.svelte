<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Hi</h1>
{#if data.fonts}
	<ul>
		{#each data.fonts as font}
			<li>{font}</li>
		{/each}
	</ul>
{/if}
