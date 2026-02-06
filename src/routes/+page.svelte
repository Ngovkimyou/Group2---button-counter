<script lang="ts">
  import { onMount } from 'svelte';

  let count = 0;
  let loading = false;

  async function loadCount() {
    const r = await fetch('/api/count');
    const data = await r.json();
    count = data.count;
  }

  async function increment() {
    loading = true;
    try {
      const r = await fetch('/api/increment', { method: 'POST' });
      const data = await r.json();
      count = data.count;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadCount();
  });
</script>

<main class="container">
  <h1>Button Counter</h1>
  <hr />
  <p>{count}</p>
  <button on:click={increment}>Click</button>
</main>
