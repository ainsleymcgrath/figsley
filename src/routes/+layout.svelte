<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main class="h-screen w-screen bg-yellow-500 grid grid-cols-2 gap-3">
	<header class="col-span-2 h-10 text-center">
		<h1 class="text-9xl font-display font-black">FIGSLEY</h1>
		<p class="font-display font-light">Figlet for the modern web, by Ainsley</p>
	</header>
	<section class="col-span-1 grid">
		<article class="w-4/5 justify-self-center">
			<h2 class="text-center">Figlet Fonts</h2>
			{#if data.fonts}
				<ul class="overflow-scroll h-28 self-center bg-red-50">
					{#each data.fonts as font}
						<li>{font}</li>
					{/each}
				</ul>
			{/if}
		</article>
	</section>
	<section class="col-span-1 h-full">
		<slot />
	</section>
</main>
