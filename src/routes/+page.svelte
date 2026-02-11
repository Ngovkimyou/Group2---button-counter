<script lang="ts">
    import { onMount } from 'svelte';

    let count = $state(0);
    let loading = $state(true);

    const fetchCount = async () => {
        try {
            const response = await fetch('/api', { method: 'GET' });
            const data = await response.json();
            count = data.count;
        } catch (error) {
            console.error('Error fetching count:', error);
        } finally {
            loading = false;
        }
    };

    const incrementClicks = async(count: number, mode:string = "increase"): Promise<void> => {
        await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ count, mode })
        });
    } 

    const decrementClicks = async(count: number, mode:string = "decrease"): Promise<void> => {
        await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ count, mode })
        });
    } 

    const resetClick = async(mode:string = "reset"): Promise<void> => {
        await fetch('/api', {
        method: 'POST',
                headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mode })
        });
    } 


    // This is the fix: It only runs in the browser
    onMount(async () => {
    await fetchCount();
    });

    async function increment() {
    count = count + 1; 
    await incrementClicks(1); 
    }

    async function decrement() {
    if(count > 0 ) {
        count = count - 1; 
        await decrementClicks(1);
    }
    else {
        alert("Count cannot be negative!");
    } 
    }

    async function reset() {
    count = 0;
    await resetClick();

    }

    // Moved inside the script properly
    $inspect(count); 
</script>

<main class="p-12 text-center">
    <h1 class="text-3xl font-bold mb-6">Button Counter</h1>
    
    {#if loading}
        <p class="text-xl text-gray-500">Loading...</p>
    {:else}
        <p class="text-xl font-semibold mb-8">Total Clicks: <span class="text-[#5f4fd6]">{count}</span></p>
        
        <button 
            onclick={increment}
            class="bg-[#6c5ce7] px-6 py-3 text-xs font-bold text-white rounded cursor-pointer transition-all ease-in-out duration-100 shadow-[0_5px_0_0_#a29bfe] active:translate-y-[5px] active:shadow-none"
        >
        +1
        </button>
                <button 
            onclick={decrement}
            class="bg-[#6c5ce7] px-6 py-3 text-xs font-bold text-white rounded cursor-pointer transition-all ease-in-out duration-100 shadow-[0_5px_0_0_#a29bfe] active:translate-y-[5px] active:shadow-none"
        >
        -1
        </button>
                <button 
            onclick={reset}
            class="bg-[#6c5ce7] px-6 py-3 text-xs font-bold text-white rounded cursor-pointer transition-all ease-in-out duration-100 shadow-[0_5px_0_0_#a29bfe] active:translate-y-[5px] active:shadow-none"
        >
        Reset
        </button>
    {/if}
</main>


