import { useQuery } from "@tanstack/react-query";
import fetchArchivedGames from "../api/database";

// TODO: dokumenter denne typen og flytt til egen /types folder
export type ArchivedGamesResponse = {
  id: number;
  white_player_name: string;
  white_player_id: number;
  black_player_name: string;
  black_player_id: number;
  result: "1-0" | "0-1" | "1/2-1/2";
  tournament_name: string;
  date_played: string;
  pgn: string;
};

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
