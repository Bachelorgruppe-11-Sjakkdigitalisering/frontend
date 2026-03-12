import { useQuery } from "@tanstack/react-query";
import fetchLiveGameData from "../api/game";

/**
 * A custom React Query hook that manages fetching and caching live chess games based on a `boardId`.
 *
 * **Caching and refetch strategy:**
 * - **Query key:** Automatically triggers a refetch whenever `boardId` changes.
 * - **Enabled:** Only runs if we have a `boardId` and if the `isLive` boolean is true.
 * - **Polling:** Automatically refetch every second.
 *
 * @param boardId The UUID of the board/game to fetch.
 * @param isLive A boolean to tell if the game to fetch is live or not. Must be true for this hook to trigger.
 * @returns The standard React Query result object containing `data`, `isLoading`, `isError`, etc.
 */
export default function useLiveGame(
  boardId: string | undefined,
  isLive: boolean,
) {
  return useQuery({
    queryKey: ["liveGame", boardId],
    queryFn: () => fetchLiveGameData(boardId),
    enabled: isLive && !!boardId,
    refetchInterval: 1000,
  });
}
