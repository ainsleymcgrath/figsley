<script lang="ts">
  import UserInput_2 from '$lib/ui/molecules/user-input.svelte';
  import SearchBar from '$lib/ui/molecules/search-bar-2.svelte';
  import { formInputShrink } from '$lib/urls';
  import type { FigletRecord } from '$lib/stores.js';
  import SelectableSearchResults from '$lib/ui/molecules/selectable-search-results.svelte';
  import { onMount } from 'svelte';
  import FigletCard from '$lib/ui/molecules/figlet-card.svelte';
  import Box from '$lib/ui/atoms/box.svelte';

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

  $: searchDbKeys = Object.keys(searchDb);
  $: searchResults = Object.values(searchDb).filter((f) => f.hit);
  $: selections = Object.values(searchDb).filter((v) => v.selected);
  $: short = formInputShrink({ text, fonts: selections.map((s) => s.font) });
  $: disabled = !Boolean(text) || !Boolean(selections.length);

  function clearSelection() {
    for (const slug of searchDbKeys) {
      searchDb[slug].selected = false;
    }
  }

  function selectRandom() {
    const randomFont = () => searchDbKeys[Math.floor(Math.random() * data.fonts.length)];
    const nRandomFonts = () => Array(5).fill(Symbol()).map(randomFont);
    clearSelection();
    for (const slug of nRandomFonts()) {
      searchDb[slug].selected = true;
    }
  }
</script>

<div class="grid gap-y-6">
  <UserInput_2 bind:value={text} />
  <SearchBar bind:searchTerm bind:searchDb />
  <SelectableSearchResults {searchTerm} bind:searchDb />
  <span class="flex justify-end gap-x-2 annotation">
    <button on:click={clearSelection}>Deselect all</button>
    <button on:click={selectRandom}>Random</button>
  </span>

  <form method="get" action="?/render" class="grid gap-3 justify-center p-12">
    <input hidden name="-" value={short} />
    <Box redBorder>
      <button
        class="font-display hl-text uppercase text-3xl font-black disabled:opacity-20 disabled:font-white"
        type="submit"
        {disabled}
      >
        Render
      </button>
    </Box>
    <a href="/" class="opacity-60 italic">Clear all</a>
  </form>

  {#each Object.entries(data.rendered ?? {}) as [name, preview]}
    <FigletCard figletText={preview} title={name} />
  {/each}
</div>
