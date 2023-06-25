<script lang="ts">
  import UserInput_2 from '$lib/ui/molecules/user-input.svelte';
  import SearchBar from '$lib/ui/molecules/search-bar-2.svelte';
  import { formInputShrink } from '$lib/urls';
  import type { FigletRecord } from '$lib/stores.js';
  import SelectableSearchResults from '$lib/ui/molecules/selectable-search-results.svelte';
  import { onMount } from 'svelte';
  export let data;

  let text = '';

  let searchTerm: string = '';

  // not declared reactively b/c we write to it
  let searchDb: Record<string, FigletRecord & { hit: boolean }> = {};
  onMount(() => {
    searchDb = data.fonts
      .map((font) => ({
        font,
        selected: false,
        searchMatchIndexes: [],
        slug: font.toLowerCase().replace(' ', '-')
      }))
      .reduce((acc, cur) => {
        return { ...acc, [cur.slug]: { ...cur, hit: false } };
      }, {});
  });

  $: searchResults = Object.values(searchDb).filter((f) => f.hit);
  $: selections = Object.values(searchDb).filter((v) => v.selected);
  $: short = formInputShrink({ text, fonts: selections.map(s => s.font) });
</script>

<UserInput_2 bind:value={text} />

<article class="grid h-min">
  <!-- only mutates the hit attr -->
  <SearchBar bind:searchTerm bind:searchDb />
  <span class="text-xs italic">
    Showing {searchResults.length} of {data.fonts.length} fonts
  </span>
  <SelectableSearchResults {searchTerm} bind:searchDb />
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
