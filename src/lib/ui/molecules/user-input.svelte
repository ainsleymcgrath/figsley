<script lang="ts">
  import { makeFocusOnMetaKeyHandler } from '$lib/dom';
  import { tick } from 'svelte';
  import Box from '../atoms/box.svelte';
  import KbdHint from '../atoms/kbd-hint.svelte';
  import Underline from '../atoms/underline.svelte';
  import { fontRender, fontStoreMeta } from '$lib/stores';

  export let text = '';
  let textarea: HTMLTextAreaElement;
  const keydown = makeFocusOnMetaKeyHandler(() => textarea, 'e');
  let mode: 'read' | 'write' = 'read';
</script>

<svelte:window on:keydown={keydown} />

{#if mode === 'read'}
  <button
    class="text-left"
    class:font-bold={text !== ''}
    on:click={async () => {
      mode = 'write';
      await tick();
      textarea.focus();
    }}
  >
    <Box noBorder>
      <Underline italic color="black">
        {#if text === ''}
          Edit input
        {:else}
          {text}
        {/if}
      </Underline>
    </Box>
  </button>
{:else if mode === 'write'}
  <Box>
    <textarea
      on:blur={async () => {
        mode = 'read';
        if (text === '' || !$fontStoreMeta.hasAnySelections) return;
        await $fontRender(text);
      }}
      placeholder="Enter text here"
      rows="3"
      bind:this={textarea}
      bind:value={text}
      class="placeholder-black w-full bg-inherit border-none outline-none"
      class:italic={text === ''}
      class:opacity-25={text === ''}
    />
    <KbdHint slot="subscript-right" key="e" />
  </Box>
{/if}
