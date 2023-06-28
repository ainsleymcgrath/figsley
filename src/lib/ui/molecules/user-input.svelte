<script lang="ts">
  import { makeFocusOnMetaKeyHandler } from '$lib/dom';
  import { tick } from 'svelte';
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
    <Underline italic color="black">
      {#if text === ''}
        Edit input
      {:else}
        {text}
      {/if}
    </Underline>
  </button>
{:else if mode === 'write'}
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
    class="w-full bg-inherit border-4 border-black outline-none rounded-lg p-2"
    class:italic={text === ''}
    class:opacity-25={text === ''}
  />
{/if}
