<script lang="ts">
	import '../app.css';
</script>

<main class="h-screen w-screen bg-yellow-500 grid grid-cols-2 gap-3">
	<header class="col-span-2 text-center m-7 h-min">
		<h1 class="text-5xl font-display font-black">FIGSLEY</h1>
		<p class="font-display text-sm font-light">Figlet for the modern web, by Ainsley</p>
	</header>
	<slot />
</main>
