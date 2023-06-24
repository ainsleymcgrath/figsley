<script lang="ts">
  export let data;
</script>

<form method="get" action="?/render">
  <input name="text" />
  <select multiple name="font-choices">
    {#each data.fonts as font}
      <option value={font}>{font}</option>
    {/each}
  </select>
  <button type="submit">Render</button>
</form>

{#each Object.values(data.rendered ?? {}) as fig}
  <pre class="font-mono leading-4">{fig}</pre>
{/each}
