<script lang="ts">
	import 'virtual:windi.css';
	import '../app.css';
</script>

<main class="w-full bg-yellow-500 p-14">
	<header class="col-span-2 mb-10">
		<h1 class="text-5xl font-display font-black">FIGSLEY</h1>
		<p class="font-display text-sm font-light">
			<a class="underline" href="http://www.figlet.org/">Figlet</a> for the
			<a class="underline" href="https://kit.svelte.dev/">modern</a>
			<a class="underline" href="https://fly.io">web</a>, by
			<a class="underline" href="https://ainsleymcgrath.com/">Ainsley</a>
		</p>
	</header>
	<slot />
</main>
