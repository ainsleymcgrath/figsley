<script lang="ts">
  import type { FigletRecord } from '$lib/stores';
  import SearchBar from '$lib/ui/molecules/search-bar-2.svelte';
  import SelectableSearchResults from '$lib/ui/molecules/selectable-search-results.svelte';

  export let searchTerm = '';
  export let searchDb: Record<string, FigletRecord & { hit: boolean }> = {};

  $: searchDbKeys = Object.keys(searchDb);

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

<SearchBar bind:searchTerm bind:searchDb />
<SelectableSearchResults {searchTerm} bind:searchDb />
<span class="flex justify-end gap-x-2 annotation">
  <button on:click={clearSelection}>Deselect all</button>
  <button on:click={selectRandom}>Random</button>
</span>
