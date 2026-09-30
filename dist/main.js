const count = document.getElementById("count");
const btn = document.getElementById("btn");
// Load current count from server
async function loadCount() {
  const res = await fetch("/api/count");
  const data = await res.json();
  count.textContent = data.value.toString();
}
// Increment count on button click
btn.addEventListener("click", async () => {
  const res = await fetch("/api/increment", { method: "POST" });
  const data = await res.json();
  count.textContent = data.value.toString();
});
loadCount();
export {};
//# sourceMappingURL=main.js.map
