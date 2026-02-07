<script>
  // This is JavaScript - it handles the logic
  let count = 0;  // Start with 0
  
  // This function runs when you click the button
  function increment() {
    count = count + 1;  // Add 1 to count
  }
</script>

<!-- This is HTML - what people see -->
<h1>Button Counter</h1>

<p>You clicked {count} times!</p>

<button on:click={increment}>
  Click me!
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