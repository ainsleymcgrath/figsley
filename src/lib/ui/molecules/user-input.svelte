<script lang="ts">
  import { makeFocusOnMetaKeyHandler } from '$lib/dom';
  import Box from '../atoms/box.svelte';
  import KbdHint from '../atoms/kbd-hint.svelte';

  export let value = '';
  let textarea: HTMLTextAreaElement;
  const keydown = makeFocusOnMetaKeyHandler(() => textarea, 'e');
</script>

<svelte:window on:keydown={keydown} />

<Box>
  <textarea
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
