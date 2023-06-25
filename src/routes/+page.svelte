<script lang="ts">
  import UserInput_2 from '$lib/ui/molecules/user-input.svelte';
  import SearchBar from '$lib/ui/molecules/search-bar-2.svelte';
  import { formInputShrink } from '$lib/urls';
  import type { FigletRecord } from '$lib/stores.js';
  import SelectableSearchResults from '$lib/ui/molecules/selectable-search-results.svelte';
  import { onMount } from 'svelte';
  import FigletCard from '$lib/ui/molecules/figlet-card.svelte';
  import { goto } from '$app/navigation';
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

  const clearSelection = () => {
    for (const slug of searchDbKeys) {
      searchDb[slug].selected = false;
    }
  };

  const selectRandom = () => {
    const randomFont = () => searchDbKeys[Math.floor(Math.random() * data.fonts.length)];
    const nRandomFonts = () => Array(5).fill(Symbol()).map(randomFont);
    clearSelection();
    for (const slug of nRandomFonts()) {
      searchDb[slug].selected = true;
    }
  };

  $: searchResults = Object.values(searchDb).filter((f) => f.hit);
  $: selections = Object.values(searchDb).filter((v) => v.selected);
  $: short = formInputShrink({ text, fonts: selections.map((s) => s.font) });
  $: disabled = !Boolean(text) || !Boolean(selections.length);
</script>

<div class="grid md:grid-cols-5">
  <section class="md:col-span-2 sm:col-span-5">
    <UserInput_2 bind:value={text} />
    <article class="grid h-min">
      <SearchBar bind:searchTerm bind:searchDb />
      <span class="text-xs italic">
        Showing {searchResults.length} of {data.fonts.length} fonts
      </span>
      <SelectableSearchResults {searchTerm} bind:searchDb />
      <span class="flex justify-end gap-x-2 annotation">
        <button on:click={clearSelection}>Deselect all</button>
        <button on:click={selectRandom}>Random</button>
      </span>
    </article>

    <form method="get" action="?/render" class="grid gap-3 justify-center p-12">
      <input hidden name="-" value={short} />
      <button
        class="heavy-outline-red font-display hl-text uppercase text-3xl font-black disabled:opacity-20 disabled:font-white"
        type="submit"
        {disabled}
      >
        Render
      </button>
      <button on:click={() => goto('/')} class="opacity-60 italic">Clear all</button>
    </form>
  </section>

  <ol class="flex flex-wrap gap-10 px-10 md:col-span-3 sm:col-span-5">
    {#each Object.entries(data.rendered ?? {}) as [name, preview]}
      <li>
        <FigletCard figletText={preview} title={name} />
      </li>
    {/each}
  </ol>
</div>
