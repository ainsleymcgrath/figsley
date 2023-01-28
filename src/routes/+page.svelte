<script lang="ts">
	import type { ActionData } from './$types';

	let input = '';
	let error = '';

	export let form: ActionData;
</script>

<h1>Figsley</h1>
<form method="POST" action="?/renderUserInput">
	<textarea name="userInput" bind:value={input} />
	<input type="text" name="haa" />
	<pre>{form?.rendered}</pre>
	{#if error}
		<p>{error}</p>
	{/if}
	<button type="submit">ok</button>
</form>
