<script>
  export let artificiallyFocused = false;
</script>

<div class="relative">
  <div
    class="absolute border-b-4 border-b-red-500 h-full group-focus-within:w-full focus:w-full focus-within:w-full transition-[width] duration-200 translate-y-1/4"
    class:w-0={!artificiallyFocused}
    class:w-full={artificiallyFocused}
  />
  <slot />
</div>
