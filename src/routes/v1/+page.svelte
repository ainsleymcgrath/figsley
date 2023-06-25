<script lang="ts">
  import SearchSelect from '$lib/ui/organisms/search-select.svelte';
  import RenderedSelectionBrowser from '$lib/ui/organisms/rendered-selection-browser.svelte';
  import SelectionSummary from '$lib/ui/molecules/selection-summary.svelte';
  import { fontRecordsByName } from '$lib/stores';
  import { onMount } from 'svelte';
  import UserInput from '$lib/ui/molecules/user-input.svelte';

  export let data;
  const randomFont = () => data.fonts[Math.floor(Math.random() * data.fonts.length)];
  const nRandomFonts = () => Array(5).fill(Symbol()).map(randomFont);

  onMount(() => {
    if (data.fonts.length === Object.keys($fontRecordsByName).length) return;
    // const initalRandom = nRandomFonts();
    for (const font of data.fonts) {
      $fontRecordsByName[font] = {
        font,
        selected: false,
        searchMatchIndexes: [],
        slug: font.toLowerCase().replace(' ', '-')
      };
    }
  });

  let value = '';
</script>

-> {import.meta.url}
<article class="grid md:grid-cols-3 grid-cols-1">
  <section class="grid grid-cols-1 h-min">
    <figure class="grid">
      <UserInput bind:value />
    </figure>
    <figure class="grid">
      <SearchSelect />
      <figcaption>
        <SelectionSummary />
      </figcaption>
    </figure>
  </section>
  <section class="col-span-2 flex col-span-2 overflow-scroll">
    <RenderedSelectionBrowser {value} />
  </section>
</article>
