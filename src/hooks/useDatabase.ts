import { useQuery } from "@tanstack/react-query";
import fetchArchivedGames from "../api/database";

export type ArchivedGamesResponse = {
  id: number;
  white_player_name: string;
  white_player_id: number;
  black_player_name: string;
  black_player_id: number;
  result: "1-0" | "0-1" | "1/2-1/2";
  tournament_name: string;
  date_played: string; // TODO: dette er kanskje feil datatype
  pgn: string;
};

export function useDatabase(playerName: string) {
  return useQuery({
    queryKey: ["database", playerName], // this makes it so we automatically refetch whenever playerName changes
    queryFn: () => fetchArchivedGames(playerName),
    staleTime: 1000 * 60, // after 1 min, react query refetches in the background to see if there are any new games
    placeholderData: (previousData) => previousData, // keeps previous data while fetching new data to prevent UI flickering
  });
}
