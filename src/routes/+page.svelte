<script lang="ts">
  import { onMount } from 'svelte'; // Add this import

  let count = $state(0); // Initialize with a number, not a function 

  async function getTotalClicks(): Promise<number> {
    const response = await fetch('/api/count'); 
    const data = await response.json(); 
    return data.total_clicks;
  }

  async function incrementClicks(count: number): Promise<void> {
    await fetch('/api/increment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count })
    });
  } 

  async function decrementClicks(count: number): Promise<void> {
    await fetch('/api/decrement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count })
    });
  } 

  async function resetClick(): Promise<void> {
    await fetch('/api/resetCount', {
      method: 'POST',
    });
  } 


  // This is the fix: It only runs in the browser
  onMount(async () => {
    count = await getTotalClicks();
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

<!-- This is HTML - what people see -->
<h1>Button Counter</h1>

<p>You clicked {count} times!</p>

<button onclick={increment}>
  +1
</button>

<button onclick={decrement}>
  -1
</button>

<button onclick={reset}>
  Reset
</button>

<!-- This is CSS - makes it look nice -->
<style>
  h1 {
    color: blue;
    font-family: Arial;
  }
  
  button {
    background: green;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background: darkgreen;
  }
</style>