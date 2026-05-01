export async function fetchMocks(options = {}) {
  const { refreshKey } = options;
  const searchParams = new URLSearchParams();

  if (refreshKey) {
    searchParams.set("refreshKey", String(refreshKey));
  }

  const url = searchParams.toString()
    ? `/api/fetchMocks?${searchParams.toString()}`
    : "/api/fetchMocks";

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch mock list");
  }

  return response.json();
}
