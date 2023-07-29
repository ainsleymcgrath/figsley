<script lang="ts">
  import UserInput from '$lib/ui/molecules/user-input.svelte';
  import { fontRender, fontStore, fontStoreMeta, type FigletRecord } from '$lib/stores';
  import FigletCard from '$lib/ui/molecules/figlet-card.svelte';
  import FontPicker from '$lib/ui/molecules/font-picker.svelte';
  import { fly, scale } from 'svelte/transition';
  import { beforeUpdate, onMount } from 'svelte';
  import AnimateInitial from '$lib/animate-initial.svelte';
  import FontPicker_2 from '$lib/ui/molecules/font-picker-2.svelte';

  export let data;
  let text = 'F';
  let options: FigletRecord[] = [];
  $: selections = options.filter((o) => o.selected);
  $: fontStore.seed(data.fonts);

  beforeUpdate(() => {
    options = $fontStoreMeta.corpus;
  });

  // render every font on initial load
  let previews: { [slug: string]: string } = {};
  onMount(async () => {
    for (const option of options.slice(0, 50)) {
      option.selected = true;
    }
    // await $fontRender(text);
  });

  beforeUpdate(async () => {
    if (text === '') return;
    const params = new URLSearchParams([
      ['text', text],
      ...selections.map((s) => ['fonts', s.font]),
    ]);
    const data = await fetch(new Request(encodeURI(`/api/render/?${params.toString()}`)));
    previews = await data.json();
  });
</script>

<figure class="my-10">
  <UserInput bind:text />
</figure>
<FontPicker_2 bind:options {text} />
<figure class="flex flex-wrap gap-12">
  {#each selections as record, i}
    <div
      out:fly={{ duration: 200, y: '-3rem' }}
      in:fly={{ delay: (i / 3) * 100, duration: 400, y: '3rem' }}
    >
      <FigletCard figletText={previews[record.font]} title={record.font} />
    </div>
  {/each}
</figure>
