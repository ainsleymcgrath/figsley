<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section>
	<header>
		<h1>Figsley</h1>
	</header>
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
	<slot />
</section>
