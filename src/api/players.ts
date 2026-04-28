import type { Player } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

/**
 * Fetches a list of all players from the backend, optionally filtered by a player's name.
 *
 * @param playerName The name to search for. If left blank, fetches all players in the database. Special characters are safely URI-encoded.
 * @returns A promise resolving to an array of players.
 * @throws {Error} Throws an error if the backend returns a non-2xx status code.
 */
export default async function fetchPlayers(
  playerName: string,
): Promise<Player[]> {
  const queryParam = playerName
    ? `?search=${encodeURIComponent(playerName)}`
    : "";

  const response = await fetch(`${API_BASE_URL}/api/players${queryParam}`);

  if (!response.ok) {
    throw new Error(`Could not fetch players: ${response.statusText}`);
  }

  return response.json();
}
