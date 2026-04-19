import { useQuery } from "@tanstack/react-query";
import fetchPlayers from "../api/players";

/**
 * A custom React Query hook that manages fetching and caching the the complete players list.
 *
 * **Caching and refetch strategy:**
 * - **Query key:** Automatically triggers a refetch if the `playerName` changes.
 * - **Stale time:** Data is considered fresh for 1 minute to prevent spamming the backend if the user navigates away and immidiately back.
 * - **UX handling:** Uses `placeholderData` to retain the previously fetched list on screen while fetching new search results.
 * This prevents the UI from aggressively flashing a loading spinner on every update.
 *
 * @param playerName The search query to filter the database.
 * @returns The standard React Query result object containing `data`, `isLoading`, `isError`, etc.
 */
export function usePlayers(playerName: string) {
  return useQuery({
    queryKey: ["players", playerName], // this makes it so we automatically refetch whenever playerName changes
    queryFn: () => fetchPlayers(playerName),
    staleTime: 1000 * 60, // after 1 min, react query refetches in the background to see if there are any new games
    placeholderData: (previousData) => previousData, // keeps previous data while fetching new data to prevent UI flickering
  });
}
