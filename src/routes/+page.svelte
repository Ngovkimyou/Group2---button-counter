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
    <!-- Moyheang only need to replace the script part above -->
<main　class="h-screen bg-gray-800 p-12">
    <div class="w-[50%] mx-auto bg-[#C0C0C0] p-2 border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#808080] border-r-[#808080] shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
        <div class="flex justify-between items-center bg-[#000080] px-3 py-1 mb-2">
            <div class="flex items-center space-x-2">
                <span class="font-bold text-lg">🔴</span>
                <h1 class="text-white text-sm font-bold">Button Counter</h1>
            </div>
            <div class="flex space-x-1">
                <button class="w-5 h-5 bg-[#C0C0C0] flex items-center justify-center text-[#000000] text-xs font-bold border border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] cursor-pointer hover:bg-[#e0e0e0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">_</button>
                <button class="w-5 h-5 bg-[#C0C0C0] flex items-center justify-center text-[#000000] text-xs font-bold border border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] cursor-pointer hover:bg-[#e0e0e0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">□</button>
                <button class="w-5 h-5 bg-[#C0C0C0] flex items-center justify-center text-[#000000] text-xs font-bold border border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] cursor-pointer hover:bg-[#e0e0e0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]">×</button>
            </div>
        </div>
        
        <div class="p-6 bg-[#C0C0C0]">
            {#if loading}
                <div class="flex items-start space-x-4 mb-6">
                    <div class="w-12 h-12 shrink-0 bg-[#C0C0C0] flex items-center justify-center border-2 border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff]">
                        <span class="text-[#ff0000] text-3xl font-bold">!</span>
                    </div>
                    <div>
                        <p class="text-lg font-bold mb-2">System Busy</p>
                        <p class="text-gray-700">Application is loading...</p>
                    </div>
                </div>
            {:else}
                <div class="flex justify-between gap-4">
                    <div>
                        <p class="text-base font-bold mb-6">Application Status</p>
                        <div class="flex items-center">
                            <p class="text-sm font-bold text-gray-800">Total Clicks:</p>
                            <span class="inline-block w-10 text-center font-mono font-bold text-sm text-[#000080] bg-[#C0C0C0] ml-2 px-2 py-2 border border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff]">
                                {count}
                            </span>
                        </div>
                    </div>                    
                    
                    <div class="flex flex-col space-y-4">
                        <button 
                            on:click={increment}
                            class="relative bg-[#C0C0C0] px-6 py-2 text-sm font-bold text-black border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] cursor-pointer hover:bg-[#e0e0e0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
                        >
                            Increment (+)
                        </button>

                        <button 
                            on:click={decrement}
                            class="relative bg-[#C0C0C0] px-6 py-2 text-sm font-bold text-black border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] cursor-pointer hover:bg-[#e0e0e0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
                        >
                            Decrement (-)
                        </button>

                        <button 
                            on:click={reset}
                            class="relative bg-[#C0C0C0] px-6 py-2 text-sm font-bold text-black border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] cursor-pointer hover:bg-[#e0e0e0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
                        >
                            Reset (0)
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</main>
