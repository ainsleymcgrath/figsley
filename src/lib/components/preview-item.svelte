<script lang="ts">
	export let title: string;
	export let rendered: string;
	const click = () => {
		navigator.clipboard.writeText(rendered);
	};
</script>

<figure>
	<figcaption class="font-display">{title}</figcaption>
	<div class="border-4 border-black rounded-lg">
		<pre class="font-mono leading-4 m-5">{rendered}</pre>
	</div>
	<button on:click={click} class="text-xs underline">Copy to clipboard</button>
</figure>
