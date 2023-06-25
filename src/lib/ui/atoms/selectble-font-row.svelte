<script lang="ts">
  import type { FigletRecord } from '$lib/stores';

  import { beforeUpdate, createEventDispatcher } from 'svelte';

  export let data: FigletRecord;
  export let focused = false;
  let element: HTMLElement;
  const dispatch = createEventDispatcher();

  const toggleSelection = () => {
    dispatch('select-font');
  };

  const keydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSelection();
    }
  };

  beforeUpdate(() => {
    if (element && focused) {
      element.focus();
    }
  });

  const click = () => {
    toggleSelection();
  };
</script>

<button
  class={`${data.selected && 'bg-red-500'} underline-hover-focus block`}
  tabindex="0"
  bind:this={element}
  on:keydown={keydown}
  on:click={click}
>
  {data.font}
</button>
