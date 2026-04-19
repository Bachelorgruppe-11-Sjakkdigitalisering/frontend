import { useQuery } from "@tanstack/react-query";
import fetchArchivedGames from "../api/database";

/**
 * A custom React Query hook that manages fetching and caching the archived games list.
 *
 * **Caching and refetch strategy:**
 * - **Query key:** React Query will automatically trigger a background refetch whenever the `playerName` changes.
 * - **Stale time:** Data is considered fresh for 1 minute to prevent spamming the backend if the user navigates away and immidiately back.
 * - **UX handling:** Uses `placeholderData` to retain the previously fetched list on screen while fetching new search results.
 * This prevents the UI from aggressively flashing a loading spinner on every update.
 *
 * @param playerName The search query to filter the database.
 * @returns The standard React Query result object containing `data`, `isLoading`, `isError`, etc.
 */
export function useDatabase(playerName: string) {
  return useQuery({
    queryKey: ["database", playerName],
    queryFn: () => fetchArchivedGames(playerName),
    staleTime: 1000 * 60,
    placeholderData: (previousData) => previousData,
  });
}
