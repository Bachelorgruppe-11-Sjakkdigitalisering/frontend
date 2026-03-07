import { useQuery } from "@tanstack/react-query";
import { fetchAllLiveGames } from "../api/game";

export type AllLiveGamesResponse = {
  board_id: number;
  white_player_name: string;
  black_player_name: string;
  pgn: string;
  fen: string;
  white_time: string;
  black_time: string;
  is_active: boolean;
};

export default function useAllLiveGames() {
  return useQuery({
    queryKey: ["allLiveGames"],
    queryFn: () => fetchAllLiveGames(),
    staleTime: 1000 * 60,
    placeholderData: (previousData) => previousData,
  });
}
