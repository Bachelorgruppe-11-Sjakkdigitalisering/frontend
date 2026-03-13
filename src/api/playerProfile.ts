/**
 * Fetches all player data of a specific player by the `playerId` from the backend.
 *
 * @param playerId The UUID of the player to fetch data of.
 * @returns A promise returning all available player data.
 * @throws {Error} Throws an error if the backend returns a non-2xx status code.
 */
export async function fetchPlayerProfile(playerId: string) {
  // TODO: specify return type
  const response = await fetch(`http://127.0.0.1:8000/api/players/${playerId}`);

  if (!response.ok) {
    throw new Error(`Could not fetch player profile: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches a list of all games played by a specific player determined by the `playerId`.
 *
 * @param playerId The UUID of the player to fetch games from.
 * @returns A promise resolving to an array of archived games played by a specific player.
 * @throws {Error} Throws an error if the backend returns a non-2xx status code.
 */
export async function fetchPlayerGames(playerId: string) {
  // TODO: specify return type
  const response = await fetch(
    `http://127.0.0.1:8000/api/players/${playerId}/games`,
  );

  if (!response.ok) {
    throw new Error(`Could not fetch player games: ${response.statusText}`);
  }

  return response.json();
}
