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

  // need artificial hovering b/c of conditional rendered icons
  let hovering = false;
  const mouseenter = () => {
    hovering = true;
  };
  const mouseleave = () => {
    hovering = false;
  };
</script>

<figure
  class="w-min overflow-x-scroll overflow-y-hidden"
  out:scale={{ duration: 100, start: 0.8 }}
  in:scale={{ duration: 150, start: 0.8, delay: 75 }}
  on:mouseenter={mouseenter}
  on:mouseleave={mouseleave}
>
  <h2 id={title} class="flex justify-between font-display mb-1">
    {title}
  </h2>
  <pre
    class="font-mono text-3xs sm:text-2xs md:text-xs font-black leading-tight w-min">{figletText}</pre>
</figure>
