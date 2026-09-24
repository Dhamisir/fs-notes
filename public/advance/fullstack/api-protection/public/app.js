const form = document.querySelector("#search-form");
const queryInput = document.querySelector("#query");
const repeatButton = document.querySelector("#repeat");
const statusText = document.querySelector("#status");
const responseCode = document.querySelector("#response-code");
const completedText = document.querySelector("#completed");
const processedText = document.querySelector("#processed");
const results = document.querySelector("#results");

async function search() {
  const response = await fetch(`/api/products/search?q=${encodeURIComponent(queryInput.value)}`);
  responseCode.textContent = response.status;
  const data = await response.json();
  if (typeof data.processedSearches === "number") processedText.textContent = data.processedSearches;
  if (Array.isArray(data.results)) {
    results.innerHTML = data.results.map((product) => `<article><strong>${product.name}</strong><span>${product.category} · $${product.price}</span></article>`).join("");
  }
  return response.status;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusText.textContent = "Searching…";
  try {
    await search();
    statusText.textContent = "Search complete";
  } catch {
    statusText.textContent = "Request failed";
  }
});

repeatButton.addEventListener("click", async () => {
  repeatButton.disabled = true;
  statusText.textContent = "Sending repeated requests…";
  let completed = 0;
  try {
    const requests = Array.from({ length: 30 }, async () => {
      const status = await search();
      completed += 1;
      completedText.textContent = completed;
      return status;
    });
    const statuses = await Promise.all(requests);
    statusText.textContent = `Finished: ${statuses.length} responses received`;
  } catch {
    statusText.textContent = "Some requests failed";
  } finally {
    repeatButton.disabled = false;
  }
});
