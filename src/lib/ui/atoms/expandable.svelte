<script lang="ts">
  import { spring } from 'svelte/motion';
  export let expanded = false;

  const height = spring(200);
  const width = spring(200);
  $: {
    $height = expanded ? 200 : 100;
    $width = expanded ? 200 : 100;
  }
</script>

<section
  class="border-4 border-black outline-none rounded-lg p-2 w-full"
  style="height: {$height}px; width: {$width}px;"
>
  {#if expanded === false}
    <slot />
  {:else}
    <slot name="expanded" />
  {/if}
</section>
