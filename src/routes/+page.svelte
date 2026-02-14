<script lang="ts">
    import { onMount } from 'svelte';
    import { shortcuts } from "$lib/shortcuts";

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
            const res = await fetch('/api', { method: 'POST' });
            const data = await res.json();
            if (data.count !== undefined) count = data.count;
            else await fetchCount();
        } catch (error) {
            console.error('Error incrementing count:', error);
        }
    };

    const decrease = async () => {
        try {
            const res = await fetch('/api', { method: 'PATCH' });
            const data = await res.json();
            if (data.count !== undefined) count = data.count;
            else await fetchCount();
        } catch (error) {
            console.error('Error decreasing count:', error);
        }
    };

    const reset = async () => {
        try {
            const res = await fetch('/api', { method: 'PUT' });
            const data = await res.json();
            if (data.count !== undefined) count = data.count;
            else await fetchCount();
        } catch (error) {
            console.error('Error resetting count:', error);
        }
    };

    onMount(() => {
        fetchCount();
    });
</script>

<main 
  use:shortcuts={{
    inc: increment,
    dec: decrease,
    reset,
    getCount: () => count,
    isLoading: () => loading
  }}
  class="p-12 text-center">
    <h1 class="text-3xl font-bold mb-6">Button Counter</h1>
    
    {#if loading}
        <p class="text-xl text-gray-500">Loading...</p>
    {:else}
        <p class="text-xl font-semibold mb-8">
            Total Clicks: 
            <span class="text-[#5f4fd6]">{count}</span>
        </p>
        
        <div class="flex justify-center gap-4">
            <!-- Increase -->
            <button 
                on:click={increment}
                class="bg-[#6c5ce7] px-6 py-3 text-xs font-bold text-white rounded shadow-[0_5px_0_0_#a29bfe] active:translate-y-[5px] active:shadow-none"
            >
                +1
            </button>

            <!-- Decrease -->
            <button 
                on:click={decrease}
                disabled={count === 0}
                class="bg-red-500 px-6 py-3 text-xs font-bold text-white rounded shadow-[0_5px_0_0_#ff7675] active:translate-y-[5px] active:shadow-none disabled:opacity-50"
            >
                -1
            </button>

            <!-- Reset -->
            <button 
                on:click={reset}
                class="bg-gray-600 px-6 py-3 text-xs font-bold text-white rounded shadow-[0_5px_0_0_#b2bec3] active:translate-y-[5px] active:shadow-none"
            >
                Reset
            </button>
        </div>
    {/if}
</main>
