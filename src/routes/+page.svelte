<script lang="ts">
  import UserInput from '$lib/ui/molecules/user-input.svelte';
  import { formInputShrink } from '$lib/urls';
  import type { FigletRecord } from '$lib/stores.js';
  import { onMount } from 'svelte';
  import FigletCard from '$lib/ui/molecules/figlet-card.svelte';
  import Box from '$lib/ui/atoms/box.svelte';
  import FontPicker from '$lib/ui/molecules/font-picker.svelte';

  export let data;
  let text = '';
  let searchTerm: string = '';

  // not declared reactively b/c we write to it
  let searchDb: Record<string, FigletRecord & { hit: boolean }> = {};
  onMount(() => {
    searchDb = data.fonts
      .map((font) => ({
        font,
        selected: false,
        searchMatchIndexes: [],
        slug: font.toLowerCase().replace(' ', '-')
      }))
      .reduce((acc, cur) => {
        return { ...acc, [cur.slug]: { ...cur, hit: false } };
      }, {});
  });

  $: selections = Object.values(searchDb).filter((v) => v.selected);
  $: short = formInputShrink({ text, fonts: selections.map((s) => s.font) });
  $: disabled = !Boolean(text) || !Boolean(selections.length);
</script>

<div class="grid gap-y-6">
  <UserInput bind:value={text} />
  <FontPicker bind:searchTerm bind:searchDb />
  <form method="get" action="?/render" class="grid gap-3 justify-center p-12">
    <input hidden name="-" value={short} />
    <Box redBorder>
      <button
        class="font-display hl-text uppercase text-3xl font-black disabled:opacity-20 disabled:font-white"
        type="submit"
        {disabled}
      >
        Render
      </button>
    </Box>
    <a href="/" class="opacity-60 italic">Clear all</a>
  </form>

  {#each Object.entries(data.rendered ?? {}) as [name, preview]}
    <FigletCard figletText={preview} title={name} />
  {/each}
</div>
