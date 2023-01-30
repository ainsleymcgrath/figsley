<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	// export let data: PageData;
	// let selectedFonts: string[] = [];
	// import { selectedFonts } from '$lib/stores';
</script>

<main class="h-screen w-screen bg-yellow-500 grid grid-cols-2 gap-3">
	<header class="col-span-2 text-center">
		<h1 class="text-9xl font-display font-black">FIGSLEY</h1>
		<p class="font-display font-light">Figlet for the modern web, by Ainsley</p>
	</header>
	<slot />
</main>
