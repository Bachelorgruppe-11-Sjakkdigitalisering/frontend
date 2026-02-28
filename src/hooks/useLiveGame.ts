import { useQuery } from "@tanstack/react-query";
import fetchLiveGameData from "../api/game";

export default function useLiveGame(
  boardId: string | undefined,
  isLive: boolean,
) {
  return useQuery({
    queryKey: ["liveGame", boardId],
    queryFn: () => fetchLiveGameData(boardId),
    enabled: isLive && !!boardId, // only run this hook if it's a live game and we have an id
    refetchInterval: 1000, // auto refetch every second
  });
}
