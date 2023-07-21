<script lang="ts">
  import type { Action } from 'svelte/action';
  import { spring } from 'svelte/motion';
  export let expanded = false;

  const height = spring(200);
  const width = spring(200);
  $: {
    $height = expanded ? 200 : 100;
    $width = expanded ? 200 : 100;
  }

  const expandContract: Action<HTMLElement, boolean> = (
    element: HTMLElement,
    expanded: boolean
  ) => {
    const initialHeight = element.offsetHeight;
    element.style.height = 'auto';
    element.style.overflow = 'hidden';
    return {
      update(expanded: boolean) {
        let animation = element.animate(
          [
            {
              height: initialHeight + 'px',
              overflow: 'hidden',
            },
            {
              height: 0,
              overflow: 'hidden',
            },
          ],
          { duration: 300, fill: 'both', easing: 'ease-in' }
        );
        animation.pause();
        if (!expanded) {
          animation.play();
        } else {
          animation.reverse();
        }
      },
      // destroy() {
      //   return 1;
      // },
    };
  };
</script>

<section
  class="border-4 border-black outline-none rounded-lg p-2 w-full"
  use:expandContract={expanded}
>
  {#if expanded === false}
    <slot />
  {:else}
    <slot name="expanded" />
  {/if}
</section>
