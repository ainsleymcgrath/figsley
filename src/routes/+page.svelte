<script lang="ts">
  import UserInput from '$lib/ui/molecules/user-input.svelte';
  import { fontRender, fontStore, fontStoreMeta } from '$lib/stores';
  import FigletCard from '$lib/ui/molecules/figlet-card.svelte';
  import FontPicker from '$lib/ui/molecules/font-picker.svelte';
  import { onMount } from 'svelte';

  export let data;
  let text = 'FIGSLEYYYYYYYY';
  let searchTerm: string = '';
  $: fontStore.seed(data.fonts);

  // render every font on initial load
  onMount(async () => {
    for (const key of $fontStoreMeta.keys.slice(0, 50)) {
      $fontStore[key].selected = true;
    }
    await $fontRender(text);
  });
</script>

<figure class="my-10">
  <UserInput bind:text />
</figure>
<FontPicker {text} bind:searchTerm />
<figure class="flex flex-wrap gap-12">
  {#each Object.values($fontStoreMeta.selections) as record}
    <FigletCard figletText={record.preview} title={record.font} />
  {/each}
</figure>
