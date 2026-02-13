export default async function fetchEvaluation(fen: string) {
  const response = await fetch("https://chess-api.com/v1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fen }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok"); // TODO: legg til bedre handling av error
  }

  return response.json();
}
