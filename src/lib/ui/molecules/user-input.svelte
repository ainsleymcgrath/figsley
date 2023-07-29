<script lang="ts">
  import { makeFocusOnMetaKeyHandler } from '$lib/dom';
  import KbdHint from '../atoms/kbd-hint.svelte';
  import { fontRender, fontStoreMeta } from '$lib/stores';
  import Icon from '../atoms/icon.svelte';
  import DrawUnderlineOnFocus from '$lib/draw-underline-on-focus.svelte';

  export let text: string = '';
  $: rows = text.split('').filter((s) => s === '\n')?.length + 1;
  let textarea: HTMLTextAreaElement;
  const keydown = makeFocusOnMetaKeyHandler(() => textarea, 'e');
  export let expanded: boolean = false;
</script>

<svelte:window on:keydown={keydown} />

<figure class="flex gap-x-1 max-w-lg group transition-all duration-150">
  <span class="transition-colors duration-150 group-focus-within:text-red-500">
    <Icon name="edit" />
  </span>
  <DrawUnderlineOnFocus>
    <textarea
      on:blur={async () => {
        expanded = false;
        if (text === '' || !$fontStoreMeta.hasAnySelections) return;
        await $fontRender(text);
      }}
      placeholder="Enter text here"
      {rows}
      bind:this={textarea}
      bind:value={text}
      class="w-full bg-inherit outline-none relative"
      class:italic={text === ''}
      class:opacity-25={text === ''}
    />
  </DrawUnderlineOnFocus>
</figure>
