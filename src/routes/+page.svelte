<script lang="ts">
  import UserInput from '$lib/ui/molecules/user-input.svelte';
  import { fontStore } from '$lib/stores';
  import FigletCard from '$lib/ui/molecules/figlet-card.svelte';
  import Box from '$lib/ui/atoms/box.svelte';
  import FontPicker from '$lib/ui/molecules/font-picker.svelte';

  export let data;
  let text = '';
  let searchTerm: string = '';
  $: fontStore.seed(data.fonts);
  $: selections = $fontStore.selections;
  $: disabled = !Boolean(text) || !Boolean(selections.length);
  let rendered: Record<string, string>;
</script>

<div class="grid gap-y-6 w-full sm:w-lg">
  <UserInput bind:value={text} />
  <FontPicker bind:searchTerm />
  <figure>
    <Box redBorder>
      <button
        class="font-display hl-text uppercase text-3xl font-black disabled:opacity-20 disabled:font-white"
        on:click={async () => {
          const params = new URLSearchParams([
            ['text', text],
            ...selections.map((s) => ['fonts', s.font])
          ]);
          const req = new Request(encodeURI(`/api/render/?${params.toString()}`));
          const data = await fetch(req);
          rendered = await data.json();
        }}
        {disabled}
      >
        Render
      </button>
    </Box>
    <a href="/" class="opacity-60 italic">Clear all</a>
  </figure>

  {#each Object.entries(rendered ?? []) as [name, preview]}
    <FigletCard figletText={preview} title={name} />
  {/each}
</div>
