<script lang="ts">
  import '../app.css';
  import Underline from '$lib/ui/atoms/underline.svelte';
  import { slide, fly } from 'svelte/transition';
  import AnimateInitial from '$lib/animate-initial.svelte';
</script>

<main class="p-3 grid-cols-1 bg-yellow-500 grid">
  <header>
    <AnimateInitial>
      <h1
        transition:fly={{ duration: 700, y: '-40%', delay: 200 }}
        class="text-5xl font-display font-black"
      >
        FIGSLEY
      </h1>
    </AnimateInitial>
    <AnimateInitial>
      <h2 transition:fly={{ delay: 450, y: '100%' }} class="font-display text-xs font-light">
        <Underline color="red">
          <a href="http://www.figlet.org/">Figlet</a>
        </Underline>
        for the
        <Underline color="red">
          <a href="https://kit.svelte.dev/">modern</a>
        </Underline>
        <Underline color="red">
          <a href="https://fly.io">web</a>
        </Underline>
        , by
        <Underline color="red">
          <a href="https://ainsleymcgrath.com/">Ainsley</a>
        </Underline>
        .
      </h2>
    </AnimateInitial>
  </header>
  <slot />
</main>
