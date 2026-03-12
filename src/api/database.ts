import type { ArchivedGamesResponse } from "../hooks/useDatabase";

/**
 * Fetches a list of archived chess games from the backend, optionally filtered by a player's name.
 *
 * @param playerName The name to search for. If left blank, fetches all games. Special characters are safely URI-encoded.
 * @returns A promise resolving to an array of archived game records.
 * @throws {Error} Throws an error if the backend returns a non-2xx status code.
 */
export default async function fetchArchivedGames(
  playerName: string,
): Promise<ArchivedGamesResponse[]> {
  const queryParam = playerName
    ? `?player=${encodeURIComponent(playerName)}`
    : "";

  const response = await fetch(
    `http://127.0.0.1:8000/api/archive/search${queryParam}`,
  );

  if (!response.ok) {
    throw new Error(`Could not fetch archived games: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Retrieves the full details of a specific archived game by its UUID.
 *
 * @param gameId The unique identifier of the game. Can be undefined if for example read directly from a URL param that isn't present.
 * @returns A promise resolving to a single game record.
 * @throws {Error} Throws if the `gameId` is invalid, missing, or the netowrk request fails.
 */
export async function fetchArchivedGameDetails(gameId: string | undefined) {
  // TODO: specify return type
  const response = await fetch(`http://127.0.0.1:8000/api/archive/${gameId}`);

  if (!response.ok) {
    throw new Error(`Could not fetch game details: ${response.statusText}`);
  }

  return response.json();
}
