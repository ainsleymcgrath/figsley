<script lang="ts">
  import { fontStore, fontStoreMeta, fontRender, type FigletRecord } from '$lib/stores';
  import { tick } from 'svelte';
  import Fuse from 'fuse.js';
  import Icon from '../atoms/icon.svelte';
  import DrawUnderlineOnFocus from '$lib/draw-underline-on-focus.svelte';
  import { fly } from 'svelte/transition';

  export let searchTerm = '';
  export let text = '';
  let searching = false;

  export let options: FigletRecord[] = [];
  $: indicesBySlug = Object.fromEntries(options.map((o, i) => [o.slug, i]));
  $: optionsById = options.reduce(
    (acc, cur) => ({ ...acc, [cur.slug]: cur }),
    {} as { [id: string]: FigletRecord }
  );

  const fuse = new Fuse<FigletRecord>([], { includeMatches: true, keys: ['font'] });
  $: {
    fuse.setCollection(options);
  }
  $: searchResultsRaw = fuse.search(searchTerm);
  $: searchResults = new Set(searchResultsRaw.map((r) => r.item.slug));
  $: visibleOptions = new Set(
    options.filter((o) => searchTerm === '' || searchResults.has(o.slug))
  );
  $: selections = options.filter((o) => o.selected);
  // $: selectionsCount = selections.length;

  function deselectAll() {
    options = options.map((o) => ({ ...o, selected: false }));
    for (const option of options) {
      option.selected = false;
    }
  }

  async function selectRandom() {
    deselectAll();
    const nRandomFontIndices = Array(5)
      .fill(Symbol())
      .map(() => Math.floor(Math.random() * options.length));
    for (const index of nRandomFontIndices) {
      options[index].selected = true;
    }
    await requestRender();
  }

  async function requestRender() {
    await tick();
    await $fontRender(text);
  }

  let groupFocused = false;
  let input: HTMLInputElement;
</script>

<figure class="flex gap-x-2 w-96 group">
  <span class="transition-colors duration-150 group-focus-within:text-red-500 flex">
    <Icon name="search" />
  </span>
  <div class="w-full">
    <DrawUnderlineOnFocus artificiallyFocused={groupFocused}>
      <input
        class="placeholder-black bg-inherit border-none outline-none inline w-full"
        type="text"
        placeholder="Search for Figlet fonts"
        bind:value={searchTerm}
        class:italic={searchTerm === ''}
        class:opacity-25={searchTerm === ''}
        on:focus={() => (searching = true)}
        bind:this={input}
      />
    </DrawUnderlineOnFocus>
    <p class="italic text-xs max-w-sm mt-3">
      {#if !selections.length}
        No fonts selected
      {:else}
        Selected ({selections.length})
        {#each selections as font}
          <a href={`#${font.slug}`} class="mx-6 not-italic hover:underline">{font.font}</a>
        {/each}
      {/if}
    </p>
    <button on:click={() => (searching = false)}><Icon name="close" /></button>
    <p
      class="overflow-scroll transition-all ease-in-out duration-300"
      class:h-32={searching}
      class:h-0={!searching}
    >
      {#each options as option, i (option.slug)}
        {#if visibleOptions.has(option)}
          <label class="block" in:fly={{ delay: (i / 10) * 300, y: '-1rem' }}>
            <input
              on:click={() => (groupFocused = true)}
              value={option.selected}
              type="checkbox"
              on:change={requestRender}
            />
            {option.font}
          </label>
        {/if}
      {/each}
    </p>
    <p class="flex justify-end gap-x-2 annotation text-xs">
      <button on:click={deselectAll}> Deselect all </button>
      <button on:click={selectRandom}>Select Random</button>
    </p>
  </div>
</figure>
