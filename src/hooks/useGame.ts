import { useQuery } from "@tanstack/react-query";
import { fetchArchivedGameDetails } from "../api/database";

export default function useGame(gameId: string | undefined, isLive: boolean) {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: () => fetchArchivedGameDetails(gameId),
    enabled: !isLive && !!gameId, // only run hook if game is not live and we have a game id
    staleTime: Infinity, // archived games don't change so we can cache for a long time
  });
}
