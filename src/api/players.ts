export default async function fetchPlayers(playerName: string) {
  const queryParam = playerName
    ? `?search=${encodeURIComponent(playerName)}`
    : "";

  const response = await fetch(
    `http://127.0.0.1:8000/api/players${queryParam}`,
  );

  if (!response.ok) {
    throw new Error("Could not players."); // TODO: bedre håndtering her
  }

  return response.json();
}
