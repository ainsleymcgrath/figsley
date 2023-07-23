<script lang="ts">
  import { makeFocusOnMetaKeyHandler } from '$lib/dom';
  import KbdHint from '../atoms/kbd-hint.svelte';
  import { fontRender, fontStoreMeta } from '$lib/stores';
  import Icon from '../atoms/icon.svelte';
  import { spring } from 'svelte/motion';

  export let text: string = '';
  $: rows = text.split('').filter((s) => s === '\n')?.length + 1;
  let textarea: HTMLTextAreaElement;
  const keydown = makeFocusOnMetaKeyHandler(() => textarea, 'e');
  export let expanded: boolean = false;
  let width = spring(0);
</script>

<svelte:window on:keydown={keydown} />

<figure class="flex gap-x-1 max-w-lg group transition-all duration-150">
  <span class="transition-colors duration-150 group-focus-within:text-red-500">
    <Icon name="edit" />
  </span>
  <div class="relative">
    <div
      class="absolute border-b-2 border-b-red-500 w-0 h-full group-focus-within:w-full transition-[width] duration-200"
    />
    <textarea
      on:blur={async () => {
        expanded = false;
        if (text === '' || !$fontStoreMeta.hasAnySelections) return;
        await $fontRender(text);
      }}
      on:focus={() => ($width = 100)}
      placeholder="Enter text here"
      {rows}
      bind:this={textarea}
      bind:value={text}
      class="w-full bg-inherit outline-none relative"
      class:italic={text === ''}
      class:opacity-25={text === ''}
    />
  </div>
</figure>
