<script lang="ts">
  import type { FigletRecord } from '$lib/stores';
  import SearchBar from '$lib/ui/molecules/search-bar-2.svelte';
  import SelectableSearchResults from '$lib/ui/molecules/selectable-search-results.svelte';
  import Box from '../atoms/box.svelte';
  import Underline from '../atoms/underline.svelte';

  export let searchTerm = '';
  export let searchDb: Record<string, FigletRecord & { hit: boolean }> = {};
  let searching = false;

  $: searchDbKeys = Object.keys(searchDb);
  $: corpus = [...Object.values(searchDb)];
  $: selections = corpus.filter((record) => record.selected);

  function clearSelection() {
    for (const slug of searchDbKeys) {
      searchDb[slug].selected = false;
    }
  }

  function selectRandom() {
    const randomFont = () => searchDbKeys[Math.floor(Math.random() * searchDbKeys.length)];
    const nRandomFonts = () => Array(5).fill(Symbol()).map(randomFont);
    clearSelection();
    for (const slug of nRandomFonts()) {
      searchDb[slug].selected = true;
    }
  }
</script>

<Box noBorder>
  {#if searching}
    <button
      on:click={() => {
        searching = false;
      }}
    >
      <Underline italic>Done</Underline>
    </button>
  {/if}
  <figure class="grid gap-6">
    {#if !searching}
      <button
        class="text-left"
        on:click={() => {
          searching = true;
        }}
      >
        <Underline italic>Choose fonts</Underline>
      </button>
    {:else}
      <SearchBar bind:searchTerm bind:searchDb />
      <SelectableSearchResults {searchTerm} bind:searchDb />
    {/if}
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
  {#if selections.length > 0}
    <span class="flex justify-end gap-x-2 annotation">
      <button on:click={clearSelection}>Deselect all</button>
      <button on:click={selectRandom}>Random</button>
    </span>
  {/if}
</Box>
