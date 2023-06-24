<script lang="ts">
  import { formInputShrink } from '$lib/urls';
  import type { Fonts } from 'figlet';
  export let data;

  let text = '';
  let fonts: Fonts[] = [];
  $: short = formInputShrink({ text, fonts });
</script>

<input name="text" bind:value={text} />
<select multiple name="font-choices" bind:value={fonts}>
  {#each data.fonts as font}
    <option value={font}>{font}</option>
  {/each}
</select>

<form method="get" action="?/render">
  <input hidden name="-" value={short} />
  <button type="submit">Render</button>
</form>

{#each Object.values(data.rendered ?? {}) as fig}
  <pre class="font-mono leading-4">{fig}</pre>
{/each}
