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

<main class="p-12 text-center">
    <h1 class="text-3xl font-bold mb-6">Button Counter</h1>
    
    {#if loading}
        <p class="text-xl text-gray-500">Loading...</p>
    {:else}
        <p class="text-xl font-semibold mb-8">Total Clicks: <span class="text-[#5f4fd6]">{count}</span></p>
        
        <button 
            on:click={increment}
            class="bg-[#6c5ce7] px-6 py-3 text-xs font-bold text-white rounded cursor-pointer transition-all ease-in-out duration-100 shadow-[0_5px_0_0_#a29bfe] active:translate-y-[5px] active:shadow-none"
        >
        Click Me
        </button>
    {/if}
</main>
