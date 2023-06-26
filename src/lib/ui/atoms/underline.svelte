<script lang="ts">
  export let color: 'red' | 'black' = 'black';
  export let italic = false;
  export let small = false;
</script>

<span
  class="border-b-2 border-b-red-500"
  class:border-b-red-500={color === 'red'}
  class:border-b-black={color === 'black'}
  class:italic
  class:text-xs={small}
>
  <slot />
</span>
