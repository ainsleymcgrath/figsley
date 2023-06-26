<script lang="ts">
  export let color: 'red' | 'black' = 'black';
</script>

<span
  class="border-b-2 border-b-red-500"
  class:border-b-red-500={color === 'red'}
  class:border-b-black={color === 'black'}
>
  <slot />
</span>
