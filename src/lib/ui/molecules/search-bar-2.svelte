<script lang="ts">
  import type { FigletRecord } from '$lib/stores';
  import Fuse from 'fuse.js';
  import KbdHint from '../atoms/kbd-hint.svelte';
  import { makeFocusOnMetaKeyHandler } from '$lib/dom';

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

<p class="grid">
  <input
    bind:this={search}
    class="heavy-outline placeholder-black focus-border-red"
    type="text"
    placeholder="Search for Figlet fonts"
    bind:value={searchTerm}
  />
  <KbdHint key="k" />
</p>
