<script lang="ts">
  import { fontRecordsSelected } from '$lib/stores';
  $: count = $fontRecordsSelected.length;
</script>

<p>
  {#if count === 0}
    No fonts selected
  {:else}
    Selected {$fontRecordsSelected.length} font{count === 1 ? '' : 's'}:<br />
    {#each $fontRecordsSelected as font}
      <a href={`#${font.slug}`} class="mr-6 hover:underline">{font.font}</a>
    {/each}
  {/if}
</p>
