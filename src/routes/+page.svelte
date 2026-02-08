<script lang="ts">
    import { onMount } from 'svelte';

    let count = 0;
    let loading = true;

    const fetchCount = async () => {
        try {
            const response = await fetch('/api');
            const data = await response.json();
            count = data.count;
        } catch (error) {
            console.error('Error fetching count:', error);
        } finally {
            loading = false;
        }
    };

    const increment = async () => {
        try {
            await fetch('/api', { method: 'POST' });
            await fetchCount();
        } catch (error) {
            console.error('Error incrementing count:', error);
        }
    };

    onMount(() => {
        fetchCount();
    });
</script>

<main>
    <h1>Button Counter</h1>
    {#if loading}
        <p>Loading...</p>
    {:else}
        <p>Total Clicks: {count}</p>
        <button on:click={increment}>Click Me :D</button>
    {/if}
</main>
