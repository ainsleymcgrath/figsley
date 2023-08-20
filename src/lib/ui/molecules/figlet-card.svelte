<script lang="ts">
  import Icon from '$lib/ui/atoms/icon.svelte';
  import { fly, scale } from 'svelte/transition';
  import Box from '../atoms/box.svelte';
  import { beforeUpdate, createEventDispatcher } from 'svelte';
  import type { FigletRecord } from '$lib/stores';

  export let text = '';
  export let record: FigletRecord;

  const copy = () => {
    navigator.clipboard.writeText(text);
  };
  const dispatch = createEventDispatcher();
  const deselct = () => {
    dispatch('deselect', record);
  };

  let rendered = '';

  async function requestRender() {
    if (text === '') return;
    const params = new URLSearchParams([['text', text]]);
    const request = new Request(encodeURI(`/api/render/${record.font}/?${params.toString()}`));
    const data = await fetch(request);
    rendered = await data.text();
  }
  beforeUpdate(requestRender);

  // need artificial hovering b/c of conditional rendered icons
  let hovering = false;
  const mouseenter = () => {
    hovering = true;
  };
  const mouseleave = () => {
    hovering = false;
  };
</script>

<figure class="w-full" on:mouseenter={mouseenter} on:mouseleave={mouseleave}>
  <h2 id={record.slug} class="flex justify-between font-display mb-1">
    {record.font}
  </h2>
  <div class="max-w-full overflow-x-scroll">
    <!-- template in pre tag is way over there bc leading whitespace. CSS can't save us -->
    <pre class="font-mono text-3xs sm:text-2xs md:text-xs font-black leading-tight w-min">{rendered}
    </pre>
  </div>
  <div class="w-full flex justify-end h-5">
    {#if hovering}
      <button on:click={copy} class="icon-sm">
        <Icon name="copy" />
      </button>
      <button on:click={deselct} class="icon-sm">
        <Icon name="close" />
      </button>
    {/if}
  </div>
</figure>
