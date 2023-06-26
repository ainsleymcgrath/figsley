<script lang="ts">
  import 'virtual:windi.css';
  import '../app.css';
  import Underline from '$lib/ui/atoms/underline.svelte';
</script>

<main class="w-full bg-yellow-500 p-3">
  <header class="mb-10">
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
  <section class="w-full flex justify-center">
    <slot />
  </section>
</main>
