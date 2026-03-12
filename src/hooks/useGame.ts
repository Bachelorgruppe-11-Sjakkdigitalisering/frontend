import { useQuery } from "@tanstack/react-query";
import { fetchArchivedGameDetails } from "../api/database";

/**
 * A custom React Query hook that manages fetching and caching a specific archived game based on the unique `gameId`.
 *
 * **Caching and refetch strategy:**
 * - **Query key:** Automatically refetches in background whenever the `gameId` changes.
 * - **Enabled:** We only run this hook if it is an archived game to display, and if we have a game id.
 * - **Stale time:** Since its an archived game, it never changes, so we cache for `Infinity`.
 *
 * @param gameId The UUID of the game to fetch.
 * @param isLive A boolean to tell if we are going to dispay a live game or not.
 * @returns The standard React Query result object containing `data`, `isLoading`, `isError`, etc.
 */
export default function useGame(gameId: string | undefined, isLive: boolean) {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: () => fetchArchivedGameDetails(gameId),
    enabled: !isLive && !!gameId,
    staleTime: Infinity,
  });
}
