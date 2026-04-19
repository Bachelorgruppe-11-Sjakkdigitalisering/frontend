import { useQuery } from "@tanstack/react-query";
import fetchEvaluation from "../api/stockfish";

/**
 * A custom React Query hook that manages fetching and caching the stockfish evaluation of a specific chess position.
 *
 * **Caching and refetch strategy:**
 * - **Query key:** Automatically triggers a refetch if the `fen` changes.
 * - **Enabled:** Only runs if a `fen` is provided.
 * - **Stale time:** The data never expires, so the stale time is `Infinity`.
 * - **UX handling:** Uses `placeholderData` to retain the previously fetched list on screen while fetching new search results.
 * This prevents the UI from aggressively flashing a loading spinner on every update.
 *
 * @param fen The standard Forsynth-Edwards Notation string representing the current board state.
 * @returns The standard React Query result object containing `data`, `isLoading`, `isError`, etc.
 */
export function useStockfish(fen: string) {
  return useQuery({
    queryKey: ["stockfish", fen], // this makes it so we automatically refetch whenever fen changes
    queryFn: () => fetchEvaluation(fen),
    enabled: !!fen, // only fetch if there is a fen!
    staleTime: Infinity, // the eval for a specific position never "expires",
    placeholderData: (previousData) => previousData, // keeps previous data while fetching new data to prevent UI flickering
  });
}
