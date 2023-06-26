<script lang="ts">
  import { makeFocusOnMetaKeyHandler } from '$lib/dom';
  import { tick } from 'svelte';
  import Box from '../atoms/box.svelte';
  import KbdHint from '../atoms/kbd-hint.svelte';
  import Underline from '../atoms/underline.svelte';

  export let value = '';
  let textarea: HTMLTextAreaElement;
  const keydown = makeFocusOnMetaKeyHandler(() => textarea, 'e');

  let mode: 'read' | 'write' = 'read';
  // on click, become current form
  //    and also maybe focus
  // on blur || cmd + enter, return to viewonly
</script>

<svelte:window on:keydown={keydown} />

{#if mode === 'read'}
  <button
    class="italic text-left"
    class:font-bold={value !== ''}
    on:click={async () => {
      mode = 'write';
      await tick();
      textarea.focus();
    }}
  >
    <Box noBorder>
      <Underline color="black">
        {#if value === ''}
          Click to edit input
        {:else}
          {value}
        {/if}</Underline
      >
    </Box>
  </button>
{:else if mode === 'write'}
  <Box>
    <textarea
      on:blur={() => {
        mode = 'read';
      }}
      placeholder="Enter text here"
      rows="3"
      bind:this={textarea}
      bind:value
      class="placeholder-black w-full bg-inherit border-none outline-none"
      class:italic={value === ''}
      class:opacity-25={value === ''}
    />
    <KbdHint slot="subscript-right" key="e" />
  </Box>
{/if}
