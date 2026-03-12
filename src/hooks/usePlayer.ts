import { useQuery } from "@tanstack/react-query";
import { fetchPlayerGames, fetchPlayerProfile } from "../api/playerProfile";

/**
 * A custom React Query hook that manages fetching and caching a player profile.
 *
 * **Caching and refetch strategy:**
 * - **Query key:** Automatically trigger a refetch if `playerId` changes.
 * - **Enabled:** Only runs if a `playerId` is provided.
 *
 * @param playerId The UUID of the player to fetch details from.
 * @returns The standard React Query result object containing `data`, `isLoading`, `isError`, etc.
 */
export function usePlayerProfile(playerId: string | undefined) {
  return useQuery({
    queryKey: ["playerProfile", playerId],
    queryFn: () => fetchPlayerProfile(playerId!),
    enabled: !!playerId, // only run if we actually have an id
  });
}

/**
 * A custom React Query hook that manages fetching and caching a player's games.
 *
 * **Caching and refetch strategy:**
 * - **Query key:** Automatically triggers a refetch if `playerId` changes.
 * - **Enabled:** Only runs if a `playerId` is provided.
 *
 * @param playerId The UUID of the player to fetch the games from.
 * @returns The standard React Query result object containing `data`, `isLoading`, `isError`, etc.
 */
export function usePlayerGames(playerId: string | undefined) {
  return useQuery({
    queryKey: ["playerGames", playerId],
    queryFn: () => fetchPlayerGames(playerId!),
    enabled: !!playerId,
  });
}
