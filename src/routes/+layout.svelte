<script lang="ts">
  import 'virtual:windi.css';
  import '../app.css';
  import Underline from '$lib/ui/atoms/underline.svelte';
</script>

<main class="p-3 grid-cols-1 bg-yellow-500 grid">
  <header>
    <h1 class="text-5xl font-display font-black">FIGSLEY</h1>
    <p class="font-display text-xs font-light">
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
    </p>
  </header>
  <slot />
</main>
