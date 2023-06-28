<script lang="ts">
  import UserInput from '$lib/ui/molecules/user-input.svelte';
  import { fontRender, fontStore, fontStoreMeta } from '$lib/stores';
  import FigletCard from '$lib/ui/molecules/figlet-card.svelte';
  import FontPicker from '$lib/ui/molecules/font-picker.svelte';
  import { onMount } from 'svelte';

  export let data;
  let text = 'FIGSLEY';
  let searchTerm: string = '';
  $: fontStore.seed(data.fonts);
  onMount(async () => {
    for (const key of $fontStoreMeta.keys) {
      $fontStore[key].selected = true;
    }
    await $fontRender(text);
  });
</script>

<!-- <div class="grid gap-y-6 w-full sm:w-lg" /> -->
<!-- <section> -->
<!--   <UserInput bind:text /> -->
<!-- <FontPicker {text} bind:searchTerm /> -->
<figure class="flex flex-wrap gap-12">
  {#each Object.values($fontStoreMeta.selections) as record}
    <FigletCard figletText={record.preview} title={record.font} />
  {/each}
</figure>
<!-- </section> -->
