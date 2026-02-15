import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("/api");
  const data = await response.json();
  let count = data.count;
  console.log("@src/routes -> Loaded data:", data);
  return { count };
};
