<script lang="ts">
  import { makeFocusOnMetaKeyHandler } from '$lib/dom';
  import { tick } from 'svelte';
  import KbdHint from '../atoms/kbd-hint.svelte';
  import Underline from '../atoms/underline.svelte';
  import { fontRender, fontStoreMeta } from '$lib/stores';
  import Icon from '../atoms/icon.svelte';
  import Expandable from '../atoms/expandable.svelte';

  export let text = '';
  $: displayText = text === '' ? 'Edit input' : text;
  let textarea: HTMLTextAreaElement;
  const keydown = makeFocusOnMetaKeyHandler(() => textarea, 'e');
  let mode: 'read' | 'write' = 'read';
  let expanded = false;
</script>

<svelte:window on:keydown={keydown} />

<div class="w-xl flex gap-x-1">
  <Icon name="edit" />
  <Expandable {expanded}>
    <button
      class="text-left inline"
      class:font-bold={text !== ''}
      on:click={async () => {
        expanded = true;
        await tick();
        if (textarea) textarea.focus();
      }}
    >
      <Underline italic color="black">
        {displayText}
      </Underline>
    </button>
    <textarea
      slot="expanded"
      on:blur={async () => {
        expanded = false;
        if (text === '' || !$fontStoreMeta.hasAnySelections) return;
        await $fontRender(text);
      }}
      placeholder="Enter text here"
      rows="3"
      bind:this={textarea}
      bind:value={text}
      class="w-full bg-inherit outline-none rounded-lg p-2"
      class:italic={text === ''}
      class:opacity-25={text === ''}
    />
  </Expandable>
</div>
