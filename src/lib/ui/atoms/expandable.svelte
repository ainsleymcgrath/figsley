<script lang="ts">
  import { slide } from 'svelte/transition';

  export let expanded = false;
</script>

<section class="border-4 border-black outline-none rounded-lg p-2 w-full">
  {#if expanded === false}
    <div transition:slide>
      <slot />
    </div>
  {:else}
    <div transition:slide={{ delay: 100 }} class="border-b-red-500 border-b-4">
      <slot name="expanded" />
    </div>
  {/if}
</section>
