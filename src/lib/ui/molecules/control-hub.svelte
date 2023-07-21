<script lang="ts">
  import Expandable from '../atoms/expandable.svelte';

  export let text = '';
  let expanded = false;
  function setExpanded(to: boolean) {
    return () => {
      console.log('whyyyyy');
      expanded = to;
    };
  }
</script>

<Expandable {expanded}>
  <button on:click={setExpanded(true)}>
    <p>Hello</p>
  </button>
  <button slot="expanded" on:click={setExpanded(false)}>
    <h1>HIYA</h1>
  </button>
</Expandable>
