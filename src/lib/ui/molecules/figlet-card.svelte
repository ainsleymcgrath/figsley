<script lang="ts">
  import type { FigletRecord } from '$lib/stores';
  import Icon from '$lib/ui/atoms/icon.svelte';
  import { scale } from 'svelte/transition';

  export let figletText: string = '';
  // export let record: FigletRecord;

  const copy = () => {
    navigator.clipboard.writeText(figletText);
  };
  const deselct = () => {
    // delete previewMap[record.slug];
  };

  let hovering = false;
  const mouseenter = () => {
    hovering = true;
  };
  const mouseleave = () => {
    hovering = false;
  };
</script>

<article
  class="h-min hover-border-red max-w-md"
  on:mouseenter={mouseenter}
  on:mouseleave={mouseleave}
  out:scale={{ duration: 100, start: 0.8 }}
  in:scale={{ duration: 150, start: 0.8, delay: 75 }}
>
  <div class={`${hovering ? 'heavy-outline-red' : 'heavy-outline'} p-5 overflow-scroll`}>
    <pre class="font-mono leading-4">{figletText}</pre>
  </div>
  <div class={`w-full flex justify-end ${hovering ? 'hl-text' : ''} h-5`}>
    {#if hovering}
      <button on:click={copy} class="icon-sm">
        <Icon name="copy" />
      </button>
      <button on:click={deselct} class="icon-sm">
        <Icon name="close" />
      </button>
    {/if}
  </div>
</article>
