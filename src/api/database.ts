export default async function fetchArchivedGames(playerName: string) {
  // safely encode the search string so it handles space and special characters
  // also check if playerName is empty or not
  const queryParam = playerName
    ? `?player=${encodeURIComponent(playerName)}`
    : "";

  const response = await fetch(
    `http://127.0.0.1:8000/api/archive/search${queryParam}`,
  );

  if (!response.ok) {
    throw new Error("Could not fetch archived games."); // TODO: bedre håndtering her
  }

  return response.json();
}

export async function fetchArchivedGameDetails(gameId: string | undefined) {
  const response = await fetch(`http://127.0.0.1:8000/api/archive/${gameId}`);

  if (!response.ok) {
    throw new Error("Could not fetch game.");
  }

  return response.json();
}
