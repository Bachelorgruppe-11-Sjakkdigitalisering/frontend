import { useQuery } from "@tanstack/react-query";
import fetchPlayers from "../api/players";

export type PlayerResponse = {
  id: number;
  name: string;
};

export function usePlayers(playerName: string) {
  return useQuery({
    queryKey: ["players", playerName], // this makes it so we automatically refetch whenever playerName changes
    queryFn: () => fetchPlayers(playerName),
    staleTime: 1000 * 60, // after 1 min, react query refetches in the background to see if there are any new games
    placeholderData: (previousData) => previousData, // keeps previous data while fetching new data to prevent UI flickering
  });
}
