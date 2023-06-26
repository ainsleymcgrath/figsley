<script lang="ts">
  import type { FigletRecord } from '$lib/stores';
  import Fuse from 'fuse.js';
  import KbdHint from '../atoms/kbd-hint.svelte';
  import { makeFocusOnMetaKeyHandler } from '$lib/dom';
  import Box from '../atoms/box.svelte';

  let search: HTMLInputElement;
  const keydown = makeFocusOnMetaKeyHandler(() => search, 'k');

  export let searchTerm = '';
  export let searchDb: Record<string, FigletRecord & { hit: boolean }> = {};
  $: corpus = Object.values(searchDb);

  const fuse = new Fuse(corpus ?? [], { includeMatches: true, keys: ['font'] });
  $: {
    fuse.setCollection(corpus);
  }
  $: searchResultsRaw = fuse.search(searchTerm);
  $: searchResults = new Set(searchResultsRaw.map((r) => r.item.slug));
  $: {
    for (const slug of Object.keys(searchDb)) {
      searchDb[slug].hit = searchResults.has(slug);
    }
  }
</script>

<svelte:window on:keydown={keydown} />

<Box>
  <input
    bind:this={search}
    class="placeholder-black bg-inherit border-none outline-none"
    type="text"
    placeholder="Search for Figlet fonts"
    bind:value={searchTerm}
    class:italic={searchTerm === ''}
    class:opacity-25={searchTerm === ''}
  />
  <KbdHint key="k" slot="subscript-right" />
  <span slot="superscript-left" class="text-xs italic">
    Showing {searchTerm ? searchResults.size : corpus.length} of {corpus.length} fonts
  </span>
</Box>
