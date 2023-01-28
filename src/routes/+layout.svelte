<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main class="h-screen w-screen bg-yellow-500 grid grid-cols-2 gap-3">
	<header class="col-span-2">
		<h1 class="text-2xl text-center">Figsley</h1>
	</header>
	<section class="col-span-1 h-full">
		<article class="h-1/2">
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
