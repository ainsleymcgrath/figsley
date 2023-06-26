<script lang="ts">
  import Icon from '$lib/ui/atoms/icon.svelte';
  import { scale } from 'svelte/transition';
  import Box from '../atoms/box.svelte';

  export let figletText = '';
  // export let record: FigletRecord;
  export let title = '';

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

<figure
  out:scale={{ duration: 100, start: 0.8 }}
  in:scale={{ duration: 150, start: 0.8, delay: 75 }}
  on:mouseenter={mouseenter}
  on:mouseleave={mouseleave}
>
  <Box highlightBorderOnHover highlightTextOnHover>
    <h2 slot="superscript-left" id={title} class="flex justify-between font-display mb-1">
      {title}
    </h2>
    <div class="p-5 overflow-scroll max-w-xs">
      <pre class="font-mono text-xs font-bold">{figletText}</pre>
    </div>
    <div slot="subscript-right" class="w-full flex justify-end h-5">
      {#if hovering}
        <button on:click={copy} class="icon-sm">
          <Icon name="copy" />
        </button>
        <button on:click={deselct} class="icon-sm">
          <Icon name="close" />
        </button>
      {/if}
    </div>
  </Box>
</figure>
