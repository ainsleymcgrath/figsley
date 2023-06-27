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
</script>

<div class="grid gap-y-6 w-full sm:w-lg">
  <UserInput bind:text />
  <FontPicker {text} bind:searchTerm />
  {#each Object.values($fontStoreMeta.selections) as record}
    {#if record.preview !== ''}
      <FigletCard figletText={record.preview} title={record.font} />
    {/if}
  {/each}
</div>
