<script lang="ts">
  import SelectableFontRow from '$lib/ui/atoms/selectble-font-row.svelte';
  import type { FigletRecord } from '$lib/stores';
  import Box from '../atoms/box.svelte';

  let focusedIndex = -1;
  export let searchDb: Record<string, FigletRecord & { hit: boolean }> = {};
  export let searchTerm = '';
</script>

<Box highlightOnFocus>
  <figure class="overflow-scroll h-30">
    {#each Object.values(searchDb) as result, i (result.font)}
      {#if result.hit || searchTerm === ''}
        <SelectableFontRow
          on:select-font={() => {
            searchDb[result.slug].selected = !searchDb[result.slug].selected;
          }}
          bind:data={result}
          focused={i === focusedIndex}
        />
      {/if}
    {/each}
  </figure>
</Box>
