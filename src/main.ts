const count = document.getElementById("count") as HTMLParagraphElement;
const btn = document.getElementById("btn") as HTMLButtonElement;

// Load current count from server
async function loadCount() {
  const res = await fetch("/api/count");
  const data: { value: number } = await res.json();
  count.textContent = data.value.toString();
}

// Increment count on button click
btn.addEventListener("click", async () => {
  const res = await fetch("/api/increment", { method: "POST" });
  const data: { value: number } = await res.json();
  count.textContent = data.value.toString();
});

loadCount();
