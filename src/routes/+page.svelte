<script lang="ts">
  import { onMount } from 'svelte'; 

  let count = $state(0);

  async function getTotalClicks(): Promise<number> {
    const response = await fetch('/api'); 
    const data = await response.json(); 
    return data.total_clicks;
  }

  async function incrementClicks(count: number, mode:string = "increase"): Promise<void> {
    await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count, mode })
    });
  } 

  async function decrementClicks(count: number, mode:string = "decrease"): Promise<void> {
    await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count, mode })
    });
  } 

  async function resetClick(mode:string = "reset"): Promise<void> {
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