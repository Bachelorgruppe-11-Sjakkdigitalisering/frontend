import { useQuery } from "@tanstack/react-query";
import { fetchAllLiveGames } from "../api/game";

/**
 * A custom React Query hook that manages fetching and caching all currently live games.
 *
 * **Caching and refetch strategy:**
 * - **Polling:** Automatically polls the backend every 10 seconds to keep the game states live.
 * - **UX handling:** Uses `placeholderData` to retain the previously fetched list on screen while fetching new search results.
 * This prevents the UI from aggressively flashing a loading spinner on every 10 second update.
 *
 * @returns The standard React Query result object containing `data`, `isLoading`, `isError`, etc.
 */
export default function useAllLiveGames() {
  return useQuery({
    queryKey: ["allLiveGames"],
    queryFn: () => fetchAllLiveGames(),
    refetchInterval: 1000 * 10,
    placeholderData: (previousData) => previousData,
  });
}
