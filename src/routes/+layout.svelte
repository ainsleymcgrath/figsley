<script lang="ts">
  import 'virtual:windi.css';
  import '../app.css';
</script>

<main class="w-full bg-yellow-500 p-3">
  <header class="mb-10">
    <h1 class="text-5xl font-display font-black">FIGSLEY</h1>
    <p class="font-display text-xs font-light">
      <a class="border-b-red-500 border-b-2" href="http://www.figlet.org/">Figlet</a> for the
      <a class="border-b-red-500 border-b-2" href="https://kit.svelte.dev/">modern</a>
      <a class="border-b-red-500 border-b-2" href="https://fly.io">web</a>, by
      <a class="border-b-red-500 border-b-2" href="https://ainsleymcgrath.com/">Ainsley</a>
    </p>
  </header>
  <slot />
</main>
