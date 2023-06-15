<script lang="ts">
	import type { ActionData } from './$types';

	export let data;
	export let form: ActionData;
</script>

<form method="post" action="?/render">
	<input name="text" />
	<select multiple name="font-choices">
		{#each data.fonts as font}
			<option value={font}>{font}</option>
		{/each}
	</select>
	<button type="submit">Render</button>
</form>

<pre>
  <code>{JSON.stringify(form?.rendered, null, 2)}</code>
</pre>
