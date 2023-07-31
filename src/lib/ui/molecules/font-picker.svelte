<script lang="ts">
  import type { FigletRecord } from '$lib/stores';
  import { onMount } from 'svelte';
  import Fuse from 'fuse.js';
  import Icon from '../atoms/icon.svelte';
  import DrawUnderlineOnFocus from '$lib/draw-underline-on-focus.svelte';
  import { fly } from 'svelte/transition';
  import Chevron from '$lib/icons/chevron.svelte';

  export let searchTerm = '';
  export let options: FigletRecord[] = [];
  export let selections: FigletRecord[] = [];
  export let searching = false;

  onMount(() => {
    selections = options.filter((o) => o.selected);
  });

  const fuse = new Fuse<FigletRecord>([], { includeMatches: true, keys: ['font'] });
  $: {
    fuse.setCollection(options);
  }
  $: searchResultsRaw = fuse.search(searchTerm);
  $: searchResults = new Set(searchResultsRaw.map((r) => r.item.slug));
  $: visibleOptions = new Set(
    options.filter((o) => searchTerm === '' || searchResults.has(o.slug))
  );

  function deselectAll() {
    selections = [];
  }

  async function selectRandom() {
    deselectAll();
    selections = Array(5)
      .fill(Symbol())
      .map(() => Math.floor(Math.random() * options.length))
      .map((i) => options[i]);
  }

  let groupFocused = false;
  let input: HTMLInputElement;
</script>

<figure class="flex gap-x-1 group">
  <span class="transition-colors duration-150 group-focus-within:text-red-500 flex">
    <Icon name="search" />
  </span>
  <div>
    <div class="bg-amber-400 rounded-md">
      <input
        class="p-2 rounded-md placeholder-black border-none outline-none inline bg-inherit"
        type="text"
        placeholder="Search for Figlet fonts"
        bind:value={searchTerm}
        class:italic={searchTerm === ''}
        class:opacity-25={searchTerm === ''}
        on:focus={() => (searching = true)}
        bind:this={input}
      />
    </div>
    <p class="italic font-bold text-xs max-w-sm text-amber-900">
      <button
        on:click={() => {
          searching = !searching;
        }}
        class="flex gap-x-2 items-center pl-2 py-1"
      >
        <span>
          {#if !selections.length}
            No fonts selected
          {:else}
            Selected ({selections.length})
            <!-- {#each selections as font} -->
            <!--   <a href={`#${font.slug}`} class="mx-6 not-italic hover:underline">{font.font}</a> -->
            <!-- {/each} -->
          {/if}
        </span>
        <span class="inline-block w-3 h-3 transition-transform" class:rotate-90={searching}>
          <Chevron />
        </span>
      </button>
    </p>
    <p
      class="overflow-scroll transition-all ease-in-out duration-300 bg-amber-400 rounded-md"
      class:h-32={searching}
      class:h-0={!searching}
      class:p-0={!searching}
      class:p-2={searching}
    >
      {#each options as option, i (option.slug)}
        <label
          class="flex items-center gap-x-2"
          class:hidden={!visibleOptions.has(option)}
          in:fly={{ delay: (i / 10) * 300, y: '-1rem' }}
        >
          <input
            value={option}
            bind:group={selections}
            type="checkbox"
            class="appearance-none w-4 h-4 border-2 rounded-sm border-gray-700 checked:bg-amber-900"
          />
          {option.font}
        </label>
      {/each}
    </p>
    <p class="flex justify-end gap-x-2 annotation text-xs">
      <button on:click={deselectAll}> Deselect all </button>
      <button on:click={selectRandom}>Select Random</button>
    </p>
  </div>
</figure>
