<script lang="ts">
  import Icon from '$lib/ui/atoms/icon.svelte';
  import { fly, scale } from 'svelte/transition';
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

<figure class="w-full" on:mouseenter={mouseenter} on:mouseleave={mouseleave}>
  <h2 id={title} class="flex justify-between font-display mb-1">
    {title}
  </h2>
  <div class="max-w-full overflow-x-scroll">
    <!-- template in pre tag is way over there bc leading whitespace. CSS can't save us -->
    <pre
      class="font-mono text-3xs sm:text-2xs md:text-xs font-black leading-tight w-min">{figletText}
    </pre>
  </div>
</figure>
