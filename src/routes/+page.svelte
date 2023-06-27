<script lang="ts">
  import UserInput from '$lib/ui/molecules/user-input.svelte';
  import { fontStore, fontStoreMeta, fontRender } from '$lib/stores';
  import FigletCard from '$lib/ui/molecules/figlet-card.svelte';
  import Box from '$lib/ui/atoms/box.svelte';
  import FontPicker from '$lib/ui/molecules/font-picker.svelte';
  import { beforeUpdate } from 'svelte';

  export let data;
  let text = 'hi';
  let searchTerm: string = '';
  $: fontStore.seed(data.fonts);
  $: selections = $fontStoreMeta.selections;
  $: disabled = !Boolean(text) || !Boolean(selections.length);

  // beforeUpdate(async () => {
  //   if ($fontStoreMeta.hasAnySelections && text !== '') {
  //     await $fontRender(text);
  //   }
  // });
</script>

<div class="grid gap-y-6 w-full sm:w-lg">
  <UserInput bind:text />
  <FontPicker {text} bind:searchTerm />
  <figure>
    <!-- <Box redBorder> -->
    <!--   <button -->
    <!--     class="font-display hl-text uppercase text-3xl font-black disabled:opacity-20 disabled:font-white" -->
    <!--     on:click={() => $fontRender(text)} -->
    <!--     {disabled} -->
    <!--   > -->
    <!--     Render -->
    <!--   </button> -->
    <!-- </Box> -->
    <a href="/" class="opacity-60 italic">Clear all</a>
  </figure>

  {#each Object.values($fontStoreMeta.selections) as record}
    {#if record.preview !== ''}
      <FigletCard figletText={record.preview} title={record.font} />
    {/if}
  {/each}
</div>
