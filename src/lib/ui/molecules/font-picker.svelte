<script lang="ts">
  import { fontStore } from '$lib/stores';
  import Box from '../atoms/box.svelte';
  import Underline from '../atoms/underline.svelte';

  export let searchTerm = '';
  $: fontStore.search(searchTerm);
  $: selectSrc = $fontStore.searchHitCount ? $fontStore.searchHits : $fontStore.corpus;

  let searching = true;

  function selectRandom() {
    // const searchDbKeys = Object.keys($fontStore);
    // const randomFont = () => searchDbKeys[Math.floor(Math.random() * searchDbKeys.length)];
    // const nRandomFonts = () => Array(5).fill(Symbol()).map(randomFont);
    fontStore.clearSelection();
    // for (const font of nRandomFonts()) {
    //   fontStore.updateRecord({ ...$fontStore[font], selected: true });
    // }
  }
</script>

{#if searching}
  <Box noBorder>
    <button
      on:click={() => {
        searching = false;
      }}
    >
      <Underline italic>Done</Underline>
    </button>
  </Box>
{/if}
<figure class="grid gap-6">
  {#if !searching}
    <Box noBorder>
      <button
        class="text-left"
        on:click={() => {
          searching = true;
        }}
      >
        <Underline italic>Choose fonts</Underline>
      </button>
    </Box>
  {:else}
    <Box>
      <input
        class="placeholder-black bg-inherit border-none outline-none"
        type="text"
        placeholder="Search for Figlet fonts"
        bind:value={searchTerm}
        class:italic={searchTerm === ''}
        class:opacity-25={searchTerm === ''}
      />
      <span slot="superscript-left" class="text-xs italic">
        Showing {searchTerm ? $fontStore.searchHitCount : $fontStore.corpus.length} of {$fontStore.recordCount}
        fonts
      </span>
    </Box>
    <Box>
      <p class="overflow-scroll h-30">
        {#each selectSrc as record (record.slug)}
          <label class="block">
            <input
              bind:checked={record.selected}
              on:change={() => {
                console.log(record.selected);
                fontStore.updateRecord(record);
              }}
              type="checkbox"
            />
            {record.font}
          </label>
        {/each}
      </p>
    </Box>
  {/if}
  <figcaption>
    {#if $fontStore.selections.length === 0}
      No fonts selected
    {:else}
      Selected {$fontStore.selections.length} font{$fontStore.selections.length === 1
        ? ''
        : 's'}:<br />
      {#each $fontStore.selections as font}
        <a href={`#${font.slug}`} class="mr-6 hover:underline">{font.font}</a>
      {/each}
    {/if}
    <p class="flex justify-end gap-x-2 annotation">
      <button on:click={fontStore.clearSelection} disabled={$fontStore.selections.length === 0}>
        Deselect all
      </button>
      <button on:click={selectRandom}>Select Random</button>
    </p>
  </figcaption>
</figure>
