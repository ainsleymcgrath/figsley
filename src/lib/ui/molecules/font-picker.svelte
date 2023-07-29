<script lang="ts">
  import { fontStore, fontStoreMeta, fontRender } from '$lib/stores';
  import { tick } from 'svelte';
  import Box from '../atoms/box.svelte';
  import Underline from '../atoms/underline.svelte';
  import Expandable from '../atoms/expandable.svelte';

  export let searchTerm = '';
  export let text = '';
  $: fontStore.search(searchTerm);

  let searching = false;

  function deselectAll() {
    for (const selection of $fontStoreMeta.selections) {
      $fontStore[selection.slug].selected = false;
    }
  }

  async function selectRandom() {
    deselectAll();
    const randomFontKey = () =>
      $fontStoreMeta.keys[Math.floor(Math.random() * $fontStoreMeta.recordCount)];
    const nRandomFonts = Array(5).fill(Symbol()).map(randomFontKey);
    for (const font of nRandomFonts) {
      $fontStore[font].selected = true;
    }
    await requestRender();
  }

  async function requestRender() {
    await tick();
    await $fontRender(text);
  }
</script>

{#if searching}
  <Box noBorder>
    <button
      on:click={async () => {
        searching = false;
        requestRender();
      }}
    >
      <Underline italic>Done</Underline>
    </button>
  </Box>
{/if}

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
  <div>
    <Box noBorder>
      <input
        class="placeholder-black bg-inherit border-none outline-none"
        type="text"
        placeholder="Search for Figlet fonts"
        bind:value={searchTerm}
        class:italic={searchTerm === ''}
        class:opacity-25={searchTerm === ''}
      />
      <span slot="superscript-left" class="text-xs italic">
        Showing {searchTerm ? $fontStoreMeta.searchHitCount : $fontStoreMeta.corpus.length} of {$fontStoreMeta.recordCount}
        fonts
      </span>
    </Box>
    <p class="overflow-scroll h-20">
      {#each $fontStoreMeta.keys as key (key)}
        {#if searchTerm === '' || $fontStore[key].hit}
          <label class="block">
            <input
              bind:checked={$fontStore[key].selected}
              type="checkbox"
              on:change={requestRender}
            />
            {$fontStore[key].font}
          </label>
        {/if}
      {/each}
    </p>
  </div>
{/if}
{#if !$fontStoreMeta.hasAnySelections}
  No fonts selected
{:else}
  <!-- Selected {$fontStoreMeta.selectionCount} font{$fontStoreMeta.selectionCount === 1 -->
  <!--   ? '' -->
  <!--   : 's'}:<br /> -->
  <!-- {#each $fontStoreMeta.selections as font} -->
  <!--   <a href={`#${font.slug}`} class="mr-6 hover:underline">{font.font}</a> -->
  <!-- {/each} -->
{/if}
<p class="flex justify-end gap-x-2 annotation">
  <button on:click={deselectAll} disabled={!$fontStoreMeta.hasAnySelections}> Deselect all </button>
  <button on:click={selectRandom}>Select Random</button>
</p>
