export async function fetchPlayerProfile(playerId: string) {
  const response = await fetch(`http://127.0.0.1:8000/api/players/${playerId}`);
  if (!response.ok) {
    throw new Error("Could not fetch player profile.");
  }
  return response.json();
}

export async function fetchPlayerGames(playerId: string) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/players/${playerId}/games`,
  );
  if (!response.ok) {
    throw new Error("Could not fetch player games.");
  }
  return response.json();
}
