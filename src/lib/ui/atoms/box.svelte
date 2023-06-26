<script>
  export let highlightBorderOnHover = false;
  export let highlightTextOnHover = false;
  export let highlightOnFocus = true;
  export let noBorder = false;
  export let redBorder = false;
</script>

<figure class="grid group" class:hover:text-red-500={highlightTextOnHover}>
  <figcaption class="w-full grid grid-cols-2">
    {#if $$slots['superscript-left']}
      <div class="col-start-1 col-span-1">
        <slot name="superscript-left" />
      </div>
    {/if}
    {#if $$slots['superscript-right']}
      <div class="col-start-2 col-span-1 justify-self-end">
        <slot name="superscript-right" />
      </div>
    {/if}
  </figcaption>
  <div
    class="bg-yellow-500 p-2"
    class:border-4={!noBorder}
    class:border-black={!noBorder}
    class:rounded-lg={!noBorder}
    class:group-hover:border-red-500={highlightBorderOnHover}
    class:border-red-500={redBorder}
    class:focus-within:border-red-500={highlightOnFocus}
  >
    <slot />
  </div>
  <figcaption class="w-full grid grid-cols-2">
    {#if $$slots['subscript-left']}
      <div class="col-span-1">
        <slot name="subscript-left" />
      </div>
    {/if}
    {#if $$slots['subscript-right']}
      <div class="col-start-2 justify-self-end">
        <slot name="subscript-right" />
      </div>
    {/if}
  </figcaption>
</figure>
