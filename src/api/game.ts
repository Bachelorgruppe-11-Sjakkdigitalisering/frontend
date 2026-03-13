/**
 * Fetches the data from a specific live game from the backend.
 *
 * @param boardId The UUID of the board to fetch data from.
 * @returns A promise returning the data of a live game.
 * @throws {Error} Throws an error if the backend returns a non-2xx status code.
 */
export default async function fetchLiveGameData(boardId: string | undefined) {
  // TODO: specify return type
  const response = await fetch(`http://127.0.0.1:8000/api/game/${boardId}`);

  if (!response.ok) {
    throw new Error(`Could not fetch game: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches a list of all current live games from the backend.
 *
 * @returns A promise resolving to an array of live games.
 * @throws {Error} Throws an error if the backend returns a non-2xx status code.
 */
export async function fetchAllLiveGames() {
  // TODO: specify return type
  const response = await fetch(`http://127.0.0.1:8000/api/games`);

  if (!response.ok) {
    throw new Error(`Could not fetch live games: ${response.statusText}`);
  }

  return response.json();
}
