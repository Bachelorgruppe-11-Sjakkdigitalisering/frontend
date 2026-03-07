export default async function fetchLiveGameData(boardId: string | undefined) {
  const response = await fetch(`http://127.0.0.1:8000/api/game/${boardId}`);

  if (!response.ok) {
    throw new Error("Could not fetch game.");
  }

  return response.json();
}

export async function fetchAllLiveGames() {
  const response = await fetch(`http://127.0.0.1:8000/api/games`);

  if (!response.ok) {
    throw new Error("Could not fetch live games.");
  }

  return response.json();
}
