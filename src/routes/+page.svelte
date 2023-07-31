<script lang="ts">
  import UserInput from '$lib/ui/molecules/user-input.svelte';
  import type { FigletRecord } from '$lib/stores';
  import FigletCard from '$lib/ui/molecules/figlet-card.svelte';
  import { fly } from 'svelte/transition';
  import { beforeUpdate, onMount } from 'svelte';
  import AnimateInitial from '$lib/animate-initial.svelte';
  import FontPicker from '$lib/ui/molecules/font-picker.svelte';

  export let data;
  let text = 'F';
  let options: FigletRecord[] = [];
  let selections: FigletRecord[] = [];
  let previews: { [slug: string]: string } = {};

  onMount(async () => {
    options = data.fonts.map(
      (font) =>
        ({
          font,
          selected: false,
          searchMatchIndexes: [],
          slug: font.toLowerCase().replace(' ', '-'),
          hit: false,
          preview: '',
        }) satisfies FigletRecord
    );
    selections = options.slice(0, 10);
  });

  beforeUpdate(async () => {
    if (text === '') return;
    const params = new URLSearchParams([
      ['text', text],
      ...selections.map((s) => ['fonts', s.font]),
    ]);
    const request = new Request(encodeURI(`/api/render/?${params.toString()}`));
    const data = await fetch(request);
    previews = await data.json();
  });
</script>

<figure class="my-10 grid gap-y-5 w-full items-center">
  <UserInput bind:text />
  <FontPicker bind:options bind:selections />
</figure>
<figure class="flex flex-wrap gap-12">
  {#each selections as record, i}
    <div
      out:fly={{ duration: 200, y: '-3rem', delay: (i / 3) * 100 }}
      in:fly={{ delay: (i / 3) * 100, duration: 400, y: '3rem' }}
    >
      <FigletCard figletText={previews[record.font]} title={record.font} />
    </div>
  {/each}
</figure>
