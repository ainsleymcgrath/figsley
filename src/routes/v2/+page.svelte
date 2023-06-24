<script lang="ts">
  import UserInput_2 from '$lib/ui/molecules/user-input.svelte';
  import SearchBar from '$lib/ui/molecules/search-bar-2.svelte';
  import { formInputShrink } from '$lib/urls';
  import type { FigletRecord } from '$lib/stores.js';
  import SelectableSearchResults from '$lib/ui/molecules/selectable-search-results.svelte';
  export let data;

  let text = '';
  let searchResults: FigletRecord[] = [];
  $: searchResultsNames = searchResults.map((v) => v.font);
  let searchTerm: string = '';
  $: corpus = data.fonts.map((font) => ({
    font,
    selected: false,
    searchMatchIndexes: [],
    slug: font.toLowerCase().replace(' ', '-')
  }));

  $: short = formInputShrink({ text, fonts: searchResultsNames });
</script>

<UserInput_2 bind:value={text} />

<article class="grid h-min">
  <SearchBar bind:searchResults bind:corpus bind:searchTerm />
  <span class="text-xs italic">
    Showing {searchResults.length} of {data.fonts.length} fonts
  </span>
  <SelectableSearchResults bind:searchResults />
  <!-- <span class="flex justify-end gap-x-2 annotation"> -->
  <!--   <button on:click={clearSelection}>Deselect all</button> -->
  <!--   <button on:click={selectRandom}>Random</button> -->
  <!-- </span> -->
</article>

<form method="get" action="?/render">
  <input hidden name="-" value={short} />
  <button type="submit">Render</button>
</form>

{#each Object.values(data.rendered ?? {}) as fig}
  <pre class="font-mono leading-4">{fig}</pre>
{/each}
