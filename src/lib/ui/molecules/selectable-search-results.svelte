<script lang="ts">
  import SelectableFontRow from '$lib/ui/atoms/selectble-font-row.svelte';
  import type { FigletRecord } from '$lib/stores';

  let focusedIndex = -1;
  export let searchDb: Record<string, FigletRecord & { hit: boolean }> = {};
  export let searchTerm = '';
  $: corpus = [...Object.values(searchDb)];
  $: selections = corpus.filter((record) => record.selected);
  $: searchResults = corpus.filter((record) => record.hit);

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
  <figure on:keydown={keydown} class="heavy-outline overflow-scroll focus-border-red h-30">
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
  <figcaption>
    {#if selections.length === 0}
      No fonts selected
    {:else}
      Selected {selections.length} font{selections.length === 1 ? '' : 's'}:<br />
      {#each selections as font}
        <a href={`#${font.slug}`} class="mr-6 hover:underline">{font.font}</a>
      {/each}
    {/if}
  </figcaption>
</figure>
