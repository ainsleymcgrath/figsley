<script lang="ts">
  import SelectableFontRow from '$lib/ui/atoms/selectble-font-row.svelte';
  import type { FigletRecord } from '$lib/stores';

  export let searchResults: FigletRecord[];
  let focusedIndex = -1;
  $: searchResultsCount = searchResults.length;

  const keydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      if (focusedIndex === 0) return;
      e.preventDefault();
      focusedIndex -= 1;
    }
    if (e.key === 'ArrowDown') {
      if (focusedIndex === searchResults.length - 1) return;
      e.preventDefault();
      focusedIndex += 1;
    }
  };
</script>

<figure>
  <ol on:keydown={keydown} class="heavy-outline overflow-scroll focus-border-red h-30">
    {#each searchResults as data, i (data.font)}
      <SelectableFontRow bind:data focused={i === focusedIndex} />
    {/each}
  </ol>
  <figcaption>
    {#if searchResultsCount === 0}
      No fonts selected
    {:else}
      Selected {searchResults.length} font{searchResultsCount === 1 ? '' : 's'}:<br />
      {#each searchResults as font}
        <a href={`#${font.slug}`} class="mr-6 hover:underline">{font.font}</a>
      {/each}
    {/if}
  </figcaption>
</figure>
